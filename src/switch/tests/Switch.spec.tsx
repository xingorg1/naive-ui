import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { NSwitch } from '../index'

describe('n-switch', () => {
  it('should work with import on demand', () => {
    mount(NSwitch)
  })

  it('should work with `disabled` prop', async () => {
    const wrapper = mount(NSwitch)
    expect(wrapper.find('.n-switch--disabled').exists()).not.toBe(true)

    await wrapper.setProps({ disabled: true })
    expect(wrapper.find('.n-switch').classes()).toContain('n-switch--disabled')
  })

  it('should work with `checked-value` prop', async () => {
    const onUpdateValue = jest.fn()
    const wrapper = mount(NSwitch, {
      props: {
        checkedValue: 'fooo',
        uncheckedValue: 'barr',
        onUpdateValue
      }
    })
    await wrapper.trigger('click')
    expect(onUpdateValue).toHaveBeenCalledWith('fooo')
    await wrapper.trigger('click')
    expect(onUpdateValue).toHaveBeenCalledWith('barr')
    await wrapper.trigger('click')
    expect(onUpdateValue).toHaveBeenCalledWith('fooo')
  })

  it('should work with `checked-value` prop in type layer', () => {
    const onUpdateValue1: (value: string) => void = () => {}
    const onUpdateValue2: (value: number) => void = () => {}
    const onUpdateValue3: (value: boolean) => void = () => {}
    let _ = (
      <NSwitch
        onUpdateValue={onUpdateValue1}
        value={'123'}
        defaultValue={'123'}
      />
    )
    _ = (
      <NSwitch onUpdateValue={onUpdateValue2} value={123} defaultValue={123} />
    )
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _ = (
      <NSwitch
        onUpdateValue={onUpdateValue3}
        value={true}
        defaultValue={false}
      />
    )
  })

  it('should work with `size` prop', async () => {
    const wrapper = mount(NSwitch)

    await wrapper.setProps({ size: 'small' })
    expect(wrapper.find('.n-switch').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ size: 'medium' })
    expect(wrapper.find('.n-switch').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ size: 'large' })
    expect(wrapper.find('.n-switch').attributes('style')).toMatchSnapshot()
  })

  it('should work with `value` prop', async () => {
    const wrapper = mount(NSwitch, { props: { value: true } })
    expect(wrapper.find('.n-switch--active').exists()).toBe(true)

    await wrapper.setProps({ value: false })
    expect(wrapper.find('.n-switch--active').exists()).not.toBe(true)
  })

  it('should work with `on-update:value` prop', async () => {
    const onUpdate = jest.fn()
    const wrapper = mount(NSwitch, { props: { 'onUpdate:value': onUpdate } })

    await wrapper.trigger('click')
    expect(onUpdate).toHaveBeenCalled()
  })

  it('should work with `loading` prop', () => {
    const wrapper = mount(NSwitch, {
      props: {
        loading: true
      }
    })
    expect(wrapper.find('.n-base-loading').exists()).toBe(true)
  })

  it('should work with slot', () => {
    const wrapper = mount(NSwitch, {
      slots: {
        checked: () => 'checked',
        unchecked: () => 'unchecked'
      }
    })
    expect(wrapper.find('.n-switch__checked').text()).toEqual('checked')
    expect(wrapper.find('.n-switch__unchecked').text()).toEqual('unchecked')
  })
})
