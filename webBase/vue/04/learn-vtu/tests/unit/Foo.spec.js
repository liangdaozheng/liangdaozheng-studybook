import { shallowMount } from '@vue/test-utils'
import Foo from '../../src/components/Foo.vue'

describe('Foo.vue', () => {
  it('count',async () => {
    const wrapper = shallowMount(Foo);
    // console.log(wrapper.text());
    // console.log(wrapper.html());
   await wrapper.get("#btn").trigger("click");
    console.log(wrapper.text());
    expect(wrapper.text()).toContain('2');
  })
  it('input',async () => {
    const wrapper = shallowMount(Foo);
    await wrapper.get("#input").setValue("liang");
    expect(wrapper.text()).toContain('liang');
  })
})
