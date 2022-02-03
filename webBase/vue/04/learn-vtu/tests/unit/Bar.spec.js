import { shallowMount } from '@vue/test-utils'
import Bar from '../../src/components/Bar.vue'

import flushPromises from 'flush-promises';

jest.mock("axios",()=>{
  return {
    get(){
      return new Promise((resolve)=>{
        resolve({data:'2'})
      })
    }
  }
})
describe('Bar.vue', () => {
  it('get user',async () => {
    const wrapper = shallowMount(Bar);
    await wrapper.get("#btn").trigger("click");
    await flushPromises();
    expect(wrapper.text()).toContain('2');
    // setTimeout(() => {
    //   expect(wrapper.text()).toContain('2');
    //   done();
    // }, 0);
  })
  
})
