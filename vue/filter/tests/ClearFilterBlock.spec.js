import { shallowMount } from '@vue/test-utils'
import ClearFilterBlock from '@/components/app/filter/ClearFilterBlock'

describe('components/app/filter/ClearFilterBlock', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(ClearFilterBlock)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('Root element does not contain the active class without the active props', () => {
    const wrapper = shallowMount(ClearFilterBlock, {
      propsData: {
        active: false
      }
    })
    const el = wrapper.find('.clear-filters')
    expect(el.classes('active')).not.toBeTruthy()
  })

  test('Add active class when set the active props', () => {
    const wrapper = shallowMount(ClearFilterBlock, {
      propsData: {
        active: true
      }
    })
    const el = wrapper.find('.clear-filters')
    expect(el.classes('active')).toBeTruthy()
  })

  test('Clicking on "Clear all filters" does not emit "onClick" event without active props', () => {
    const wrapper = shallowMount(ClearFilterBlock)
    const el = wrapper.find('.clear-filters')
    el.trigger('click')
    expect(wrapper.emitted().onClick).not.toBeTruthy()
  })

  test('Clicking on "Clear all filters" emitы "onClick" event with active props', () => {
    const wrapper = shallowMount(ClearFilterBlock, {
      propsData: {
        active: true
      }
    })
    const el = wrapper.find('.clear-filters')
    el.trigger('click')
    expect(wrapper.emitted().onClick).toBeTruthy()
    expect(wrapper.emitted().onClick.length).toBe(1)
  })
})
