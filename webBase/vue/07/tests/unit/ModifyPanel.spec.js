import { mount } from "@vue/test-utils";
import ModifyPanel from "../../src/views/ModifyPanel.vue";

describe("ModifyPanel.vue", () => {
  it("should emit cancel ", async () => {
    // given
    const item = {
      id: 1,
      username: "小海",
      email: "aaa@qq.com",
      gender: "男",
      hobby: ["篮球", "读书", "编程"],
    };

    const visible = true;
    // when
    const wrapper = mount(ModifyPanel, {
      propsData: {
        item,
        visible,
      },
    });

    //then
    // cancel
    wrapper.get("#cancelBtn").trigger("click");
    expect(wrapper.emitted("cancel")[0]).toBeTruthy();
    // save
    const itemData = Object.assign({}, item, { id: 2 });
    await wrapper.setProps({ item: itemData });
    wrapper.get("#saveBtn").trigger("click");
    expect(wrapper.emitted("save")[0][0]).toEqual(itemData);
  });
});
