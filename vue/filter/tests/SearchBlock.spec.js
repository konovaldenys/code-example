import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import SearchBlock from '@/components/app/filter/SearchBlock'

describe('components/app/filter/SearchBlock', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(SearchBlock, {
      propsData: {
        textSearch: ''
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('test input value depends on props', async () => {
    const wrapper = shallowMount(SearchBlock, {
      propsData: {
        textSearch: ''
      }
    })
    const input = wrapper.find('input')
    expect(input.element.value).toEqual('')

    wrapper.setProps({ textSearch: 'text' })
    await Vue.nextTick()
    expect(input.element.value).toEqual('text')

    wrapper.setProps({ textSearch: 'some text' })
    await Vue.nextTick()
    expect(input.element.value).toEqual('some text')
  })

  test('Emit changeSeracText event when change input value', () => {
    const wrapper = shallowMount(SearchBlock, {
      propsData: {
        textSearch: ''
      }
    })
    const input = wrapper.find('input')
    input.setValue('some value')

    expect(wrapper.emitted().changeSerchText).toBeTruthy()

    expect(wrapper.emitted().changeSerchText.length).toBe(1)

    expect(wrapper.emitted().changeSerchText[0]).toEqual(['some value'])
  })
})
