<template>
  <div class="filter-block budget">
    <div class="filter-category-header">
      Budget
    </div>
    <div class="budget-body">
      <FilterInput
        id="min-budget"
        :value="displayMinBudget"
        @onInput="changeMinBudget"
        :error="error"
        label="From:"
        number-validation
      />
      <div class="between-inputs">
        <i class="icon-remove"></i>
      </div>
      <FilterInput
        id="max-budget"
        :value="displayMaxBudget"
        @onInput="changeMaxBudget"
        :error="error"
        label="To:"
        number-validation
      />
      <div @click="clearBudgets" class="remove-select">
        <i class="icon-clear"></i>
      </div>
    </div>
  </div>
</template>

<script>
import FilterInput from './FilterInput'
export default {
  components: {
    FilterInput
  },
  props: {
    maxBudget: {
      type: Number,
      required: true
    },
    minBudget: {
      type: Number,
      required: true
    }
  },
  computed: {
    displayMinBudget() {
      return this.minBudget || ''
    },
    displayMaxBudget() {
      return this.maxBudget || ''
    },
    error() {
      return this.maxBudget < this.minBudget && this.maxBudget !== 0
    }
  },
  methods: {
    changeMinBudget(value) {
      this.$emit('changeMinBudget', +value)
    },
    changeMaxBudget(value) {
      this.$emit('changeMaxBudget', +value)
    },
    clearBudgets() {
      this.$emit('clearBudgets')
    }
  }
}
</script>

<style lang="scss" scoped>
.choosen-option {
  display: flex;
  justify-content: space-around;
}
.budget-body {
  display: flex;
  flex-direction: row;
  justify-content: sflex-start;
  margin-top: 40px;
}
.between-inputs {
  margin: 0 12px;
  height: 40px;
  line-height: 40px;

  .icon-remove {
    font-size: 16px;
    vertical-align: middle;
    color: #acacac;
  }
}
.remove-select {
  cursor: pointer;
  margin-left: 12px;
  height: 40px;
  line-height: 40px;
  .icon-clear {
    font-size: 15px;
    vertical-align: middle;
    color: $middle-gray;
    &:hover {
      color: red;
    }
  }
}
</style>
