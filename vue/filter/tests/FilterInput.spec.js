import { shallowMount } from '@vue/test-utils'
// import Button from '@/components/shared/Button.vue'
import FilterInput from '@/components/app/filter/FilterInput'

describe('@/components/app/filter/FilterInput', () => {
  //   const vm = wrapper.vm
  test('is a Vue instance', () => {
    const wrapper = shallowMount(FilterInput, {
      propsData: {
        value: 0,
        id: 'Id'
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('Shows correct Label', () => {
    const wrapper = shallowMount(FilterInput, {
      propsData: {
        value: 0,
        label: 'From:',
        id: 'min-budget'
      }
    })
    const label = wrapper.find('label')
    expect(label.text()).toBe('From:')
  })

  test('Add error class if error props is true', () => {
    const wrapper = shallowMount(FilterInput, {
      propsData: {
        value: 0,
        id: 'min-budget',
        error: true
      }
    })
    const input = wrapper.find('input')
    expect(input.classes('error')).toBeTruthy()
  })

  test('Emit onInput Event', () => {
    const wrapper = shallowMount(FilterInput, {
      propsData: {
        value: 0,
        id: 'min-budget'
      }
    })
    const input = wrapper.find('input')
    input.setValue('some value')

    expect(wrapper.emitted().onInput).toBeTruthy()
    expect(wrapper.emitted().onInput.length).toBe(1)
    expect(wrapper.emitted().onInput[0]).toEqual(['some value'])
  })

  test('Emit onChange Event', () => {
    const wrapper = shallowMount(FilterInput, {
      propsData: {
        value: 0,
        id: 'min-budget'
      }
    })
    const input = wrapper.find('input')
    input.setValue('some value')

    input.trigger('change')

    expect(wrapper.emitted().onChange).toBeTruthy()
    expect(wrapper.emitted().onChange.length).toBe(1)
    expect(wrapper.emitted().onChange[0]).toEqual(['some value'])
  })

  test('Test thousands filter', () => {
    const wrapper = shallowMount(FilterInput, {
      propsData: {
        value: 22543,
        id: 'min-budget'
      }
    })
    const input = wrapper.find('input')
    expect(input.element.value).toEqual('22,543')
  })
})
