import StringService from '@/services/stringService'
import JobSevice from '@/services/jobService'

const extractAppliedFilters = (filterObject) => {
  const data = {}
  for (const key in filterObject) {
    const value = filterObject[key]
    if (Array.isArray(value)) {
      if (value.length) data[key] = value
    } else if (value) data[key] = value
  }
  return data
}

export default {
  REMOVE_FILTER_VALUE({ state, commit }, payload) {
    const { category, value } = payload
    let newValue
    if (Array.isArray(state.filterObject[category])) {
      const index = state.filterObject[category].indexOf(value)
      newValue = [...state.filterObject[category]]
      newValue.splice(index, 1)
    } else {
      newValue = typeof state.filterObject[category] === 'number' ? 0 : ''
    }
    commit('SET_FILTER_OBJECT_KEY', { key: category, value: newValue })
  },
  ADD_PLATFORM_TO_FILTER_OBJECT({ state, commit }, platform) {
    const platforms = [...state.filterObject.ecommercePlatforms]
    platforms.push(platform)
    commit('SET_FILTER_OBJECT_KEY', {
      key: 'ecommercePlatforms',
      value: platforms
    })
  },
  CHANGE_SELECTED_PLATFORMS({ commit }, platforms) {
    const newPlatforms = [...platforms]
    commit('SET_FILTER_OBJECT_KEY', {
      key: 'ecommercePlatforms',
      value: newPlatforms
    })
  },
  REMOVE_PLATFORM_FROM_FILTER_OBJECT({ state, commit }, platform) {
    const index = state.filterObject.ecommercePlatforms.indexOf(platform)
    const platforms = [...state.filterObject.ecommercePlatforms]
    platforms.splice(index, 1)
    commit('SET_FILTER_OBJECT_KEY', {
      key: 'ecommercePlatforms',
      value: platforms
    })
  },
  REMOVE_ALL_PLATFORMS_FROM_FILTER_OBJECT({ commit }) {
    commit('SET_FILTER_OBJECT_KEY', { key: 'ecommercePlatforms', value: [] })
  },
  ADD_CATEGORY_TO_FILTER_OBJECT({ state, commit }, category) {
    const categories = [...state.filterObject.category]
    categories.push(category)
    commit('SET_FILTER_OBJECT_KEY', { key: 'category', value: categories })
  },
  CHANGE_SELECTED_CATEGORIES({ commit }, categories) {
    const newCategories = [...categories]
    commit('SET_FILTER_OBJECT_KEY', { key: 'category', value: newCategories })
  },
  REMOVE_CATEGORY_FROM_FILTER_OBJECT({ state, commit }, category) {
    const index = state.filterObject.category.indexOf(category)
    const categories = [...state.filterObject.category]
    categories.splice(index, 1)
    commit('SET_FILTER_OBJECT_KEY', { key: 'category', value: categories })
  },
  REMOVE_ALL_CATEGORIES_FROM_FILTER_OBJECT({ state, commit }) {
    commit('SET_FILTER_OBJECT_KEY', { key: 'category', value: [] })
  },
  CHANGE_MIN_BUDGET({ state, commit }, number) {
    commit('SET_FILTER_OBJECT_KEY', { key: 'budgetMin', value: number })
  },
  CHANGE_MAX_BUDGET({ state, commit }, number) {
    commit('SET_FILTER_OBJECT_KEY', { key: 'budgetMax', value: number })
  },

  CLEAR_BUDGETS({ commit }) {
    commit('SET_FILTER_OBJECT_KEY', { key: 'budgetMax', value: 0 })
    commit('SET_FILTER_OBJECT_KEY', { key: 'budgetMin', value: 0 })
  },

  CHANGE_SEARCH_TEXT({ state, commit }, string) {
    commit('SET_FILTER_OBJECT_KEY', { key: 'textSearch', value: string })
  },

  ADD_PROJECT_TYPE_TO_FILTER_OBJECT({ state, commit }, projectType) {
    const newprojectType = [...state.filterObject.projectType, projectType]
    commit('SET_FILTER_OBJECT_KEY', {
      key: 'projectType',
      value: newprojectType
    })
  },
  REMOVE_PROJECT_TYPE_TO_FILTER_OBJECT({ state, commit }, projectType) {
    const newprojectType = state.filterObject.projectType.filter(
      (el) => el !== projectType
    )
    commit('SET_FILTER_OBJECT_KEY', {
      key: 'projectType',
      value: newprojectType
    })
  },

  CLEAR_FILTER({ state, commit }) {
    const filter = { ...state.filterObject }
    for (const key in filter) {
      if (Array.isArray(filter[key])) {
        filter[key] = []
      } else {
        filter[key] = typeof filter[key] === 'number' ? 0 : ''
      }
    }
    commit('SET_FILTER_OBJECT', filter)
    this.$router.push({
      query: {}
    })
  },
  async APPLY_FILTERS({ state, commit }) {
    commit('SET_APPLIED_FILTER_OBJECT', { ...state.filterObject })
    const data = extractAppliedFilters(state.filterObject)
    // In dataBase we use snake_case naming convection
    const snakeData = StringService.convertToSnake(data)
    commit('app/SET_DATA_FOR_LOADING_MORE_JOBS', snakeData, { root: true })
    // Send request to server
    const result = await JobSevice.getByFields({ search: snakeData })
    const jobs = result.jobs
    const totalCount = result.totalCount
    const firstPage = jobs.slice(0, 50)
    if (firstPage.length) {
      firstPage[0].startPage = 1
      firstPage[firstPage.length - 1].finishPage = 1
    }
    const secondPage = jobs.slice(50, 100)
    if (secondPage.length) {
      secondPage[0].startPage = 2
      secondPage[secondPage.length - 1].finishPage = 2
    }
    const jobsData = [...firstPage, ...secondPage]
    commit('app/SET_JOBS_LIST', jobsData, { root: true })
    commit('app/SET_CURRENT_PAGE', 1, { root: true })
    commit('app/SET_JOBS_TOTAL_COUNT', totalCount, { root: true })
    // Display first 50 jobs
    commit('app/SET_JOBS_TO_DISPLAY', firstPage, { root: true })
    // use return for filling jobsList inside 'fetch' hook on Jobs page
    return jobs
  },
  UPDATE_QUERY_STRING_PARAMS({ state }) {
    const data = extractAppliedFilters(state.filterObject)
    this.$router.push({
      query: data
    })
  },
  FILL_FILTER_FROM_QUERY_STRING({ state, commit }, queryParametrsObject) {
    const currentFilter = { ...state.filterObject }

    const updatedFilter = { ...state.filterObject }
    for (const key in currentFilter) {
      const valueFromQuery = queryParametrsObject[key]
      if (valueFromQuery) {
        switch (key) {
          case 'textSearch':
            updatedFilter[key] = valueFromQuery
            break
          case 'budgetMin':
          case 'budgetMax':
            updatedFilter[key] = +valueFromQuery
            break
          case 'ecommercePlatforms':
            if (Array.isArray(valueFromQuery)) {
              valueFromQuery.forEach((platform) => {
                if (state.platforms.includes(platform))
                  updatedFilter[key].push(platform)
              })
            } else if (state.platforms.includes(valueFromQuery))
              updatedFilter[key].push(valueFromQuery)
            break
          case 'category':
            if (Array.isArray(valueFromQuery)) {
              valueFromQuery.forEach((category) => {
                if (state.categories.includes(category))
                  updatedFilter[key].push(category)
              })
            } else if (state.categories.includes(valueFromQuery))
              updatedFilter[key].push(valueFromQuery)
            break
          case 'locations':
            if (Array.isArray(valueFromQuery)) {
              valueFromQuery.forEach((location) => {
                updatedFilter[key].push(location)
              })
            } else {
              updatedFilter[key].push(valueFromQuery)
            }
            break
          case 'projectType':
            const existedprojectType = state.projectType.map(
              (object) => object.value
            )
            if (Array.isArray(valueFromQuery)) {
              valueFromQuery.forEach((projectType) => {
                if (existedprojectType.includes(projectType))
                  updatedFilter[key].push(projectType)
              })
            } else if (existedprojectType.includes(valueFromQuery))
              updatedFilter[key].push(valueFromQuery)
            break
        }
      }
    }
    commit('SET_FILTER_OBJECT', updatedFilter)
  }
}
