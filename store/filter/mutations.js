import Vue from 'vue'
export default {
  SET_FILTER_OBJECT(state, object) {
    state.filterObject = { ...object }
  },

  SET_APPLIED_FILTER_OBJECT(state, object) {
    state.appliedFilterObject = { ...object }
  },

  SET_FILTER_OBJECT_KEY(state, payload) {
    const { key, value } = payload
    Vue.set(state.filterObject, key, value)
  },
  SET_NEW_PLATFORMS(state, platforms) {
    state.newPlatforms = platforms
  },
  SET_NEW_CATEGORIES(state, categories) {
    state.newCategories = categories
  },
  SET_NEW_PROJECT_TYPES(state, projectType) {
    state.newprojectType = projectType
  }
}
