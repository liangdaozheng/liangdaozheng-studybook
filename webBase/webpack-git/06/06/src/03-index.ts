interface IFly {
    fly(): void;
}

class Person implements IFly {
    name: string;
    age: number;

    study() {

    }

    fly() {}
}

class Cat implements IFly {
    name: string;
    age: number;

    catchMouse() {}

    fly() {}
}

let p1 = new Person();
let c1 = new Cat();

// function fn(arg: Person) {
//     arg.name;
// }

// fn( c1 )


function fn2( arg: IFly ) {
    arg.fly();
}

fn2(p1);
fn2(c1);