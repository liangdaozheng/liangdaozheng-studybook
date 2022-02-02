var Person = /** @class */ (function () {
    // 类的构造函数也是属于类的
    function Person(name, age, gender) {
        if (gender === void 0) { gender = '男'; }
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    Person.prototype.eat = function () {
        // ...
    };
    // 属于类的
    Person.type = '人';
    return Person;
}());
var p1 = new Person('zMouse', 35, '男');
p1.eat();
Person.type;
// let fn:PersonConstructor = function(name: string, age: number, gender: '男'|'女') {
//     return new Person(name, age, gender);
// }
// let p2 = new fn('zMouse', 35, '男');
function fn1(arg) {
    // arg.eat();
    new arg('zMouse', 35, '男');
}
fn1(Person);
