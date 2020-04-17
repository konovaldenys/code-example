import deepEqual from '@/assets/js/helpers/deepEqual'
export default {
  getFilterWasChanged: (state) =>
    !deepEqual(state.filterObject, state.appliedFilterObject),
  getAnyFiltersApplied: (state) => {
    let result = false
    const filter = state.filterObject
    for (const key in filter) {
      const value = filter[key]
      if (Array.isArray(value)) {
        if (value.length) {
          result = true
        }
      } else if (value) {
        result = true
      }
    }
    return result
  }
}
