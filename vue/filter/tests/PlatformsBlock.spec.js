import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import PlatformsBlock from '@/components/app/filter/PlatformsBlock'
import OptionsPopup from '@/components/app/filter/OptionsPopup'

const platforms = [
  'Shopify',
  'Big Cartel',
  'Big Commerce',
  'Magento',
  'Open Cart',
  'PrestaShop',
  'Squarespace',
  'Volusion',
  'Woocommerce'
]

describe('components/app/filter/PlatformsBlock', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(PlatformsBlock, {
      propsData: {
        platforms,
        selectedPlatforms: []
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('test platforms popup is closed at the begining', () => {
    const wrapper = shallowMount(PlatformsBlock, {
      propsData: {
        platforms,
        selectedPlatforms: []
      }
    })
    expect(wrapper.find(OptionsPopup).exists()).toBe(false)
  })

  test('test platforms popup opens when Add button clicked', async () => {
    const wrapper = shallowMount(PlatformsBlock, {
      propsData: {
        platforms,
        selectedPlatforms: []
      }
    })
    const addButton = wrapper.find('.add-options')
    addButton.trigger('click')
    await Vue.nextTick()
    expect(wrapper.find(OptionsPopup).exists()).toBe(true)
  })

  test('test platforms closes popup when close event from popup was emmited', async () => {
    const wrapper = shallowMount(PlatformsBlock, {
      propsData: {
        platforms,
        selectedPlatforms: []
      }
    })
    const addButton = wrapper.find('.add-options')
    addButton.trigger('click')
    await Vue.nextTick()
    wrapper.find(OptionsPopup).vm.$emit('close')

    expect(wrapper.emitted().changePlatforms).toBeTruthy()
    expect(wrapper.emitted().changePlatforms.length).toBe(1)
  })
})
