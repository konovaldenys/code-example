<template>
  <div @click="onClick" :class="{ active: active }" class="clear-filters">
    Clear all filters
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick() {
      if (this.active) this.$emit('onClick')
    }
  }
}
</script>

<style lang="scss" scoped>
.clear-filters {
  font-size: 12px;
  color: $gray;
  transition: all 0.5s;
  cursor: default;
  &.active {
    cursor: pointer;
    color: $light-black;
  }
}
</style>
