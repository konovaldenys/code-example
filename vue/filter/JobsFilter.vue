<template>
  <div v-bar class="filter-wrapper">
    <form @submit.prevent="applyFilters">
      <div @click="createJob">Create job</div>
      <SearchBlock
        :textSearch="textSearch"
        @changeSerchText="changeSerchText"
      ></SearchBlock>
      <div class="filter-body">
        <PlatformsBlock
          @addPlatform="addPlatform"
          @changePlatforms="changePlatforms"
          @removePlatform="removePlatform"
          @removeAllPlatforms="removeAllPlatforms"
          :platforms="platforms"
          :selectedPlatforms="selectedPlatforms"
        ></PlatformsBlock>
        <CategoriesBlock
          @addCategory="addCategory"
          @changeCategories="changeCategories"
          @removeCategory="removeCategory"
          @removeAllCategories="removeAllCategories"
          :categories="categories"
          :selectedCategories="selectedCategories"
        ></CategoriesBlock>
        <BudgetBlock
          @changeMinBudget="changeMinBudget"
          @changeMaxBudget="changeMaxBudget"
          @clearBudgets="clearBudgets"
          :maxBudget="maxBudget"
          :minBudget="minBudget"
        ></BudgetBlock>
        <ProjectTypeBlock
          :projectType="projectType"
          :selectedprojectType="selectedprojectType"
          @addOption="addProjectType"
          @removeOption="removeProjectType"
        ></ProjectTypeBlock>
        <ClearFilterBlock
          :active="showClearAllButton"
          @onClick="clearFilter"
        ></ClearFilterBlock>
      </div>
      <button
        :class="{ disabled: !filterWasChanged }"
        class="filter-apply-button"
      >
        Apply filters
      </button>
    </form>
  </div>
</template>

<script>
/* import Vuebar from 'vuebar' */
import { mapState, mapGetters, mapActions } from 'vuex'
import SearchBlock from './SearchBlock'
import ClearFilterBlock from './ClearFilterBlock'
import PlatformsBlock from './PlatformsBlock'
import CategoriesBlock from './CategoriesBlock'
import BudgetBlock from './BudgetBlock'
import ProjectTypeBlock from './ProjectTypeBlock'
import jobService from '@/services/jobService'
export default {
  components: {
    SearchBlock,
    ClearFilterBlock,
    PlatformsBlock,
    CategoriesBlock,
    BudgetBlock,
    ProjectTypeBlock
  },
  computed: {
    ...mapState('filter', {
      platforms: 'platforms',
      categories: 'categories',
      projectType: 'projectType',
      filterObject: 'filterObject',
      appliedFilterObject: 'appliedFilterObject',
      textSearch: (state) => state.filterObject.textSearch,
      selectedPlatforms: (state) => state.filterObject.ecommercePlatforms,
      selectedCategories: (state) => state.filterObject.category,
      minBudget: (state) => state.filterObject.budgetMin,
      maxBudget: (state) => state.filterObject.budgetMax,
      selectedprojectType: (state) => state.filterObject.projectType
    }),
    ...mapGetters('filter', {
      filterWasChanged: 'getFilterWasChanged',
      showClearAllButton: 'getAnyFiltersApplied'
    })
  },
  methods: {
    ...mapActions('filter', [
      'ADD_PLATFORM_TO_FILTER_OBJECT',
      'CHANGE_SELECTED_PLATFORMS',
      'CHANGE_SELECTED_CATEGORIES',
      'REMOVE_PLATFORM_FROM_FILTER_OBJECT',
      'REMOVE_ALL_PLATFORMS_FROM_FILTER_OBJECT',
      'ADD_CATEGORY_TO_FILTER_OBJECT',
      'REMOVE_CATEGORY_FROM_FILTER_OBJECT',
      'REMOVE_ALL_CATEGORIES_FROM_FILTER_OBJECT',
      'CHANGE_SEARCH_TEXT',
      'CHANGE_MIN_BUDGET',
      'CHANGE_MAX_BUDGET',
      'CLEAR_BUDGETS',
      'ADD_PROJECT_TYPE_TO_FILTER_OBJECT',
      'REMOVE_PROJECT_TYPE_TO_FILTER_OBJECT',
      'REMOVE_FILTER_VALUE',
      'APPLY_FILTERS',
      'CLEAR_FILTER',
      'UPDATE_QUERY_STRING_PARAMS',
      'GENERATE_JOB'
    ]),
    createJob() {
      this.GENERATE_JOB()
    },
    async applyFilters() {
      await this.APPLY_FILTERS()
      this.UPDATE_QUERY_STRING_PARAMS()
    },
    changeSerchText(textSearch) {
      this.CHANGE_SEARCH_TEXT(textSearch)
    },
    addPlatform(platform) {
      this.ADD_PLATFORM_TO_FILTER_OBJECT(platform)
    },
    changePlatforms(platforms) {
      this.CHANGE_SELECTED_PLATFORMS(platforms)
    },
    changeCategories(categories) {
      this.CHANGE_SELECTED_CATEGORIES(categories)
    },
    removePlatform(platform) {
      this.REMOVE_PLATFORM_FROM_FILTER_OBJECT(platform)
    },
    removeAllPlatforms() {
      this.REMOVE_ALL_PLATFORMS_FROM_FILTER_OBJECT()
    },
    addCategory(category) {
      this.ADD_CATEGORY_TO_FILTER_OBJECT(category)
    },
    removeCategory(category) {
      this.REMOVE_CATEGORY_FROM_FILTER_OBJECT(category)
    },
    removeAllCategories() {
      this.REMOVE_ALL_CATEGORIES_FROM_FILTER_OBJECT()
    },
    changeMinBudget(minBudget) {
      this.CHANGE_MIN_BUDGET(minBudget)
    },
    changeMaxBudget(maxBudget) {
      this.CHANGE_MAX_BUDGET(maxBudget)
    },
    clearBudgets() {
      this.CLEAR_BUDGETS()
    },
    addProjectType(projectType) {
      this.ADD_PROJECT_TYPE_TO_FILTER_OBJECT(projectType)
    },
    removeProjectType(projectType) {
      this.REMOVE_PROJECT_TYPE_TO_FILTER_OBJECT(projectType)
    },
    clearFilter() {
      this.CLEAR_FILTER()
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-wrapper {
  height: calc(100vh - 110px);
  max-height: calc(100vh - 110px);
}
.filter-body {
  font-family: ProximaNova;
  background: white;
  padding: 20px;
  margin-bottom: 20px;
  .filter-block {
    margin-bottom: 35px;
  }
}
.filter-apply-button {
  width: 27%;
  max-width: 363px;
  min-width: 300px;
  cursor: pointer;
  border: none;
  outline: none;
  position: fixed;
  left: 0;
  bottom: 0;
  height: 50px;
  text-align: center;
  color: $white;
  background: $light-blue;
  line-height: 50px;
  &.disabled {
    background: $gray;
  }
}
</style>

<style lang="scss">
.filter-wrapper {
  background-color: $background-gray;
  color: $light-black;
  .filter-category-header {
    position: relative;
    // margin: 25px 0 15px;
    margin-bottom: 20px;
    font-family: FuturaPT-Medium;
    font-size: 21px;
    line-height: 27px;
    color: $light-black;
    .add-options {
      vertical-align: middle;
      margin-left: 10px;
      padding: 4px 10px;
      border: 1px solid $light-gray;
      border-radius: 5px;
      cursor: pointer;
      font-family: ProximaNova;
      font-size: 12px;
      color: $middle-gray;
      &:hover {
        color: $light-blue;
        border-color: $light-blue;
      }
    }
    .clear-all {
      cursor: pointer;
      font-family: ProximaNova;
      font-size: 12px;
      color: $middle-gray;
      float: right;
      &:hover {
        color: red;
      }
    }
  }
}
</style>

<style>
.vb > .vb-dragger {
  z-index: 5;
  width: 12px;
  right: 0;
}

.vb > .vb-dragger > .vb-dragger-styler {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform: rotate3d(0, 0, 0, 0);
  transform: rotate3d(0, 0, 0, 0);
  -webkit-transition: background-color 100ms ease-out, margin 100ms ease-out,
    height 100ms ease-out;
  transition: background-color 100ms ease-out, margin 100ms ease-out,
    height 100ms ease-out;
  background-color: rgba(0, 11, 33, 0.1);
  margin: 6px 6px 6px 0;
  border-radius: 20px;
  height: calc(100% - 10px);
  display: block;
}

.vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
  background-color: rgba(0, 11, 33, 0.3);
}

.vb > .vb-dragger:hover > .vb-dragger-styler {
  background-color: rgba(0, 11, 33, 0.3);
  margin: 4px 4px 4px 0;
  height: 100%;
}

.vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
  background-color: rgba(0, 11, 33, 0.3);
  margin: 4px 4px 4px 0;
  height: 100%;
}

.vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
  background-color: rgba(0, 11, 33, 0.3);
}
</style>
