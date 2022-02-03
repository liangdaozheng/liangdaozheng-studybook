import { shallowMount } from "@vue/test-utils";
import TodoItem from "@/components/TodoItem.vue";

describe("TodoItem.vue", () => {
  it("input:props,output:view", () => {
    // given
    const todo={
      id:1,
      text:'11',
      status:false,
    }
    // when
    const wrapper = shallowMount(TodoItem, {
      propsData: { todo },
    });
    // then
    expect(wrapper.text()).toMatch('11');
  });
  it("input:slot,output:view", () => {
    // given
    const todo={
      id:1,
      text:'11',
      status:false,
    }
    // when
    const wrapper = shallowMount(TodoItem, {
      propsData: { todo },
      slots: { default:'liang' },
    });
    // then
    expect(wrapper.text()).toMatch('liang');
  });
  it("input:user click,output:emit", () => {
    // given
    const todo={
      id:1,
      text:'11',
      status:false,
    }
    // when
    const wrapper = shallowMount(TodoItem, {
      propsData: { todo },
      slots: { default:'liang' },
    });
    wrapper.get('#removeBtn').trigger("click");
    wrapper.get('#removeBtn').trigger("click");
    // then
    // 
    console.log(wrapper.emitted());
    expect(wrapper.emitted('over')[0]).toEqual([1]);
  });




});
