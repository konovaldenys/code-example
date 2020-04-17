import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import CategoriesBlock from '@/components/app/filter/CategoriesBlock'
import OptionsPopup from '@/components/app/filter/OptionsPopup'

const categories = [
  'Developer',
  'Manager',
  'Designer',
  'Marketing expert',
  'Content wrinter',
  'Customer support specialist'
]

describe('components/app/filter/CategoriesBlock', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(CategoriesBlock, {
      propsData: {
        categories,
        selectedCategories: []
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('test categories popup is closed at the begining', () => {
    const wrapper = shallowMount(CategoriesBlock, {
      propsData: {
        categories,
        selectedCategories: []
      }
    })
    expect(wrapper.find(OptionsPopup).exists()).toBe(false)
  })

  test('test categories popup opens when Add button clicked', async () => {
    const wrapper = shallowMount(CategoriesBlock, {
      propsData: {
        categories,
        selectedCategories: []
      }
    })
    const addButton = wrapper.find('.add-options')
    addButton.trigger('click')
    await Vue.nextTick()
    expect(wrapper.find(OptionsPopup).exists()).toBe(true)
  })

  test('test categories closes popup when close event from popup was emmited', async () => {
    const wrapper = shallowMount(CategoriesBlock, {
      propsData: {
        categories,
        selectedCategories: []
      }
    })
    const addButton = wrapper.find('.add-options')
    addButton.trigger('click')
    await Vue.nextTick()
    wrapper.find(OptionsPopup).vm.$emit('close')

    expect(wrapper.emitted().changeCategories).toBeTruthy()
    expect(wrapper.emitted().changeCategories.length).toBe(1)
  })
})
