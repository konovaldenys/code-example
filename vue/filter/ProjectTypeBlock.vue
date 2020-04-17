<template>
  <div class="filter-block project-type">
    <div class="filter-category-header">
      Project type
    </div>
    <div class="project-type-body">
      <app-checkbox
        v-for="option in projectType"
        :key="option.value"
        :value="selectedprojectType.includes(option.value)"
        @change="onChange($event, option.value)"
        :label="option.label"
      ></app-checkbox>
    </div>
  </div>
</template>

<script>
import Checkbox from '~/components/shared/Checkbox'
export default {
  components: {
    'app-checkbox': Checkbox
  },
  props: {
    projectType: {
      type: Array,
      required: true
    },
    selectedprojectType: {
      type: Array,
      required: true
    }
  },
  methods: {
    onChange(checked, option) {
      checked
        ? this.$emit('addOption', option)
        : this.$emit('removeOption', option)
    }
  }
}
</script>

<style lang="scss"></style>
