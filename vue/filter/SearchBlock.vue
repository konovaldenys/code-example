<template>
  <div class="filter-search-text">
    <i class="icon-search"></i>
    <input
      :value="textSearch"
      @input="onChange"
      class="search-text-input"
      type="text"
    />
  </div>
</template>

<script>
export default {
  props: {
    textSearch: {
      type: String,
      required: true
    }
  },
  methods: {
    onChange(event) {
      const value = event.target.value
      this.$emit('changeSerchText', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-search-text {
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid $light-gray;
  padding: 0 20px;
  .icon-search {
    vertical-align: middle;
    font-size: 26px;
  }
  .search-text-input {
    width: calc(100% - 30px);
    float: right;
    line-height: 58px;
    height: 58px;
    border: none;
    outline: none !important;
  }
}
</style>
