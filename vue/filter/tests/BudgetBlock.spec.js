import { shallowMount } from '@vue/test-utils'
import BudgetBlock from '@/components/app/filter/BudgetBlock'
import FilterInput from '@/components/app/filter/FilterInput.vue'

describe('components/app/filter/BudgetBlock', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(BudgetBlock, {
      propsData: {
        maxBudget: 0,
        minBudget: 0
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('test emit event when min budget was changed', () => {
    const wrapper = shallowMount(BudgetBlock, {
      propsData: {
        maxBudget: 0,
        minBudget: 0
      }
    })
    const input = wrapper.findAll(FilterInput).at(0)
    input.vm.$emit('onInput')

    expect(wrapper.emitted().changeMinBudget).toBeTruthy()
    expect(wrapper.emitted().changeMinBudget.length).toBe(1)
  })

  test('test emit event when max budget was changed', () => {
    const wrapper = shallowMount(BudgetBlock, {
      propsData: {
        maxBudget: 0,
        minBudget: 0
      }
    })
    const input = wrapper.findAll(FilterInput).at(1)
    input.vm.$emit('onInput')

    expect(wrapper.emitted().changeMaxBudget).toBeTruthy()
    expect(wrapper.emitted().changeMaxBudget.length).toBe(1)
  })

  test('test no error if min and max budget equals zero', () => {
    const wrapper = shallowMount(BudgetBlock, {
      propsData: {
        maxBudget: 0,
        minBudget: 0
      }
    })
    const vm = wrapper.vm
    expect(vm.error).toEqual(false)
  })

  test('test error if min budget bigger than max budget', () => {
    const wrapper = shallowMount(BudgetBlock, {
      propsData: {
        maxBudget: 5,
        minBudget: 10
      }
    })
    const vm = wrapper.vm
    expect(vm.error).toEqual(true)
  })

  test('test no error if min budget bigger than max budget and max budget equals zero', () => {
    const wrapper = shallowMount(BudgetBlock, {
      propsData: {
        maxBudget: 0,
        minBudget: 10
      }
    })
    const vm = wrapper.vm
    expect(vm.error).toEqual(false)
  })
})
