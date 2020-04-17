<template>
  <div class="filter-block platforms">
    <div class="filter-category-header">
      {{ title }}
      <span @click="openOptionsPopup" class="add-options">+ Add</span>
      <span @click="removeAllOptions" class="clear-all">Clear all</span>
      <transition name="slide-left-380px">
        <OptionsPopup
          @close="closeOptionsPopup"
          @clickOutside="closeOptionsPopup"
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
          v-for="platform in selectedPlatforms"
          :key="platform"
          :style="{ borderColor: platformColors[platform] }"
          class="choosen-option"
        >
          <div>
            {{ platform }}
          </div>
          <div @click="removeSelectedOption(platform)" class="remove-select">
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
import platformColors from '@/assets/js/staticData/platformColors'
export default {
  components: {
    OptionsPopup,
    Checkbox
  },
  props: {
    platforms: {
      type: Array,
      required: true
    },
    selectedPlatforms: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showOptionsPopup: false,
      options: [...this.platforms],
      selectedOptions: [...this.selectedPlatforms],
      title: 'Platform',
      platformColors
    }
  },
  watch: {
    selectedPlatforms(newVal) {
      this.selectedOptions = [...newVal]
    }
  },
  methods: {
    closeOptionsPopup() {
      this.$emit('changePlatforms', this.selectedOptions)
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
      this.$emit('removePlatform', option)
    },
    removeAllOptions() {
      this.$emit('removeAllPlatforms')
    }
  }
}
</script>

<style lang="scss" scoped>
.choosen-option {
  display: flex;
  justify-content: space-between;
  border-left: 3px solid;
  padding-left: 7px;
  margin: 5px 3px;
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
