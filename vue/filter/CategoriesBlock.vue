<template>
  <div class="filter-block categories">
    <div class="filter-category-header">
      {{ title }}
      <span @click="openOptionsPopup" class="add-options">+ Add</span>
      <span @click="removeAllOptions" class="clear-all">Clear all</span>
      <transition name="slide-left-380px">
        <OptionsPopup
          @close="closeOptionsPopus"
          @clickOutside="closeOptionsPopus"
          :title="title"
          v-if="showOptionsPopup"
        >
          <Checkbox
            v-for="option in options"
            :key="option"
            :value="selectedOptions.includes(option)"
            @change="onChange($event, option)"
            :label="option"
          ></Checkbox>
        </OptionsPopup>
      </transition>
    </div>
    <div class="platforms-body">
      <div>
        <div
          v-for="category in selectedCategories"
          :key="category"
          class="choosen-option"
        >
          <div>
            {{ category }}
          </div>
          <div @click="removeSelectedOption(category)" class="remove-select">
            <i class="icon-clear"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OptionsPopup from './OptionsPopup'
import Checkbox from '@/components/shared/Checkbox'
export default {
  components: {
    OptionsPopup,
    Checkbox
  },
  props: {
    categories: {
      type: Array,
      required: true
    },
    selectedCategories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showOptionsPopup: false,
      options: [...this.categories],
      selectedOptions: [...this.selectedCategories],
      title: 'Category'
    }
  },
  watch: {
    selectedCategories(newVal) {
      this.selectedOptions = [...newVal]
    }
  },
  methods: {
    closeOptionsPopus() {
      this.$emit('changeCategories', this.selectedOptions)
      this.showOptionsPopup = false
    },
    openOptionsPopup() {
      this.showOptionsPopup = true
    },
    onChange(checked, option) {
      checked
        ? this.selectedOptions.push(option)
        : (this.selectedOptions = this.selectedOptions.filter(
            (el) => el !== option
          ))
    },
    removeSelectedOption(option) {
      this.$emit('removeCategory', option)
    },
    removeAllOptions() {
      this.$emit('removeAllCategories')
    }
  }
}
</script>

<style lang="scss" scoped>
.choosen-option {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
}
.remove-select {
  cursor: pointer;
  .icon-clear {
    font-size: 15px;
    color: $middle-gray;
    &:hover {
      color: red;
    }
  }
}
</style>
