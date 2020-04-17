<template>
  <div class="labels-block">
    <div
      @click="removeAllLabels"
      v-if="labels.length"
      class="label clear-label"
    >
      <img src="~/static/icons/cross.svg" alt="remove" />
      <span class="label-text">Clear all filters</span>
    </div>
    <div
      @click="removeLabel(label)"
      v-for="label in labels"
      :key="label.label"
      class="label"
    >
      <img src="~/static/icons/cross.svg" alt="remove" />
      <span class="label-text">{{ label.label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    filterObject: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    labels() {
      const filter = this.filterObject
      const labels = []
      for (const key in filter) {
        if (Array.isArray(filter[key])) {
          filter[key].forEach((el) => {
            labels.push({
              category: key,
              value: el,
              label: this.transformObjectToLabel(key, el)
            })
          })
        } else {
          filter[key] &&
            labels.push({
              category: key,
              value: filter[key],
              label: this.transformObjectToLabel(key, filter[key])
            })
        }
      }
      return labels
    }
  },
  methods: {
    transformObjectToLabel(key, value) {
      switch (key.toLowerCase()) {
        case 'platforms':
          return `Platform: ${value}`
        case 'categories':
          return `Category: ${value}`
        case 'minbudget':
          return `Minimum budget: ${value}`
        case 'maxbudget':
          return `Maximum budget: ${value}`
        case 'location':
          return `Location: ${value}`
        case 'projecttype':
          return `Type: ${value}`
        default:
          return `${value}`
      }
    },
    removeLabel(label) {
      const { category, value } = label
      this.$emit('removeLabel', { category, value })
    },
    removeAllLabels() {
      this.$emit('clearFilter')
    }
  }
}
</script>

<style lang="scss" scoped>
.labels-block {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.label {
  padding: 5px 10px;
  background-color: lightgray;
  margin: 10px 10px 0 0;
  border-radius: 5px;
  font-size: 12px;
  &.clear-label {
    background-color: transparent;
  }
  img {
    vertical-align: middle;
    transform: translateY(-1px);
  }
  .label-text {
    vertical-align: middle;
  }
}
</style>
