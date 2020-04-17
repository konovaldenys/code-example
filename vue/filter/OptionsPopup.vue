<template>
  <transition name="options-slide">
    <div class="filter-options-popup">
      <div class="popup-title">{{ title }}</div>
      <div class="popup-body">
        <slot></slot>
      </div>
      <div class="close-popup">
        <button @click.prevent="closePopup" class="close-popup-button">
          <span class="text">OK</span>
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import getParents from '@/assets/js/helpers/getParents'
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  mounted() {
    setTimeout(() => {
      document.addEventListener('click', this.documentClick)
    }, 0)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.documentClick)
  },
  methods: {
    closePopup() {
      this.$emit('close')
    },
    documentClick(event) {
      // Close popup if click outside
      const element = event.target
      if (!getParents(element, '.filter-options-popup')) {
        this.$emit('clickOutside')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-options-popup {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 15px;
  width: 100%;
  border: 1px solid #0077ff;
  border-radius: 5px;
  background-color: white;
  z-index: 10;
  .popup-title {
    color: #1292ee;
    font-size: 21px;
  }
  .popup-body {
    padding: 15px 0;
  }
  .close-popup {
    float: right;
    &-button {
      font-family: ProximaNova-Bold;
      border: none;
      text-decoration: none;
      border-radius: 5px;
      font-size: 16px;
      width: 72px;
      height: 36px;
      color: $white;
      background-color: #0077ff;
      .text {
        vertical-align: middle;
      }
    }
  }
}
</style>
