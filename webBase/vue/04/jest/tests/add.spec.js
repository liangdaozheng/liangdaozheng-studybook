const add = require("../add.js");

// test === it 同等
describe("add", () => {
  it("1+1 = 2 ", () => {
    // 准备数据 -> given
    const a = 1;
    const b = 2;

    // 触发测试动作 -> when
    const result = add(a, b);

    // jest -> 断言
    // toBe -> jest 匹配器
    //   expect(result).toBe(3);
    // then -> 验证
    expect(result).toBe(3);
  });

  it("2+2=4 ", () => {
    // 准备数据 -> given
    const a = 2;
    const b = 2;

    // 触发测试动作 -> when
    const result = add(a, b);

    // jest -> 断言
    // toBe -> jest 匹配器
    //   expect(result).toBe(3);
    // then -> 验证
    expect(result).toBe(4);
  });
});

test("判断2个对象是否相等", () => {
  const objA = {
    name: "objA",
  };

  const objB = {
    name: "objA",
  };

  expect(objA).toEqual(objB);
});

test("string contain str", () => {
  const str = "string";

  expect(str).toContain("str");
  expect(str).not.toContain("hello");
});
