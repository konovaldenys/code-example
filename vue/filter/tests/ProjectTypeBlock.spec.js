import { shallowMount } from '@vue/test-utils'
import ProjectTypeBlock from '@/components/app/filter/ProjectTypeBlock'
import Checkbox from '~/components/shared/Checkbox'

const projectType = ['type one', 'type two']

describe('components/app/filter/ProjectTypeBlock', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(ProjectTypeBlock, {
      propsData: {
        projectType,
        selectedprojectType: []
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('test renders 2 checkboxes', () => {
    const wrapper = shallowMount(ProjectTypeBlock, {
      propsData: {
        projectType,
        selectedprojectType: []
      }
    })
    const checkbox = wrapper.findAll(Checkbox)
    expect(checkbox.length).toBe(2)
  })

  test('test emit event when check checkbox', () => {
    const wrapper = shallowMount(ProjectTypeBlock, {
      propsData: {
        projectType,
        selectedprojectType: []
      }
    })
    const checkbox = wrapper.find(Checkbox)
    checkbox.vm.$emit('change', true)
    expect(wrapper.emitted().addOption).toBeTruthy()
    expect(wrapper.emitted().addOption.length).toBe(1)
  })

  test('test emit event when uncheck checkbox', () => {
    const wrapper = shallowMount(ProjectTypeBlock, {
      propsData: {
        projectType,
        selectedprojectType: []
      }
    })
    const checkbox = wrapper.find(Checkbox)
    checkbox.vm.$emit('change', false)
    expect(wrapper.emitted().removeOption).toBeTruthy()
    expect(wrapper.emitted().removeOption.length).toBe(1)
  })
})
