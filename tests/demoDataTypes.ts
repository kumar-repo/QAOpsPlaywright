let message:string = "Hello, TypeScript!";
console.log(message);

let isDone:boolean = false;
console.log(isDone);

let count:number = 42;
console.log(count);

let list:number[] = [1, 2, 3];
console.log(list);

let tuple:[string, number] = ["Hello", 42];
console.log(tuple);

enum Color {Red, Green, Blue}
let c:Color = Color.Blue;
console.log(c);

let notSure:any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
console.log(notSure);



//** Function */
function add(x:number, y:number): number {
    return x + y;
}
console.log(add(1, 10));

let myAdd = function(x:number, y:number): number { return x + y; };
console.log(myAdd(10, 10));

let myAddArrow = (x:number, y:number): number => x + y;
console.log(myAddArrow(11, 10));

//** object */
let person: { name: string; age: number } = {
    name: "John",
    age: 30
};
console.log(person);
//**Class */
class Student {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}
let student = new Student("Alice", 20);
console.log(student);

//** Interface */
interface Person {
    name: string;
    age: number;
}
function greet(person: Person) {
    return "Hello, " + person.name;
}
let user = { name: "Bob", age: 25 };
console.log(greet(user));

//** Generics */

function identity<T>(arg: T): T {
    return arg;
}
console.log(identity<string>("Hello, Generics!"));
console.log(identity<number>(42));          

//**Array */
let array: number[] = [1, 2, 3];
console.log(array);

