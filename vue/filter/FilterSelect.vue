<template>
  <div class="filter-select-wrapper">
    <div class="select-outer">
      <select id="" @change="changeOption" name="">
        <option v-for="option in options" :key="option" :value="option">{{
          option
        }}</option>
      </select>
      <div class="arrow">
        <img src="~/static/icons/arrow-down.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  methods: {
    changeOption(e) {
      const option = e.target.value
      this.$emit('change', option)
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-select-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: nowrap;
  margin: 10px 0;
}
.select-outer {
  position: relative;
  width: 100%;
}
.arrow {
  background-color: #fff;
  border-radius: 4px;
  position: absolute;
  pointer-events: none;
  cursor: pointer;
  right: 5px;
  top: 8px;
  text-align: center;
  font-size: 10px;
}

select {
  background-color: white;
  border: 1px solid $light-black;
  display: block;
  width: 100%;
  font-weight: 300;
  color: $light-black;
  font-size: 16px;
  padding: 0 30px 0 15px;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  -webkit-appearance: none;
  outline: none !important;
  &:active {
    ~ .arrow {
      transform: rotate(180deg);
    }
  }
}
</style>
