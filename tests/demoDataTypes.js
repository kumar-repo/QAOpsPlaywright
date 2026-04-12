var message = "Hello, TypeScript!";
console.log(message);
var isDone = false;
console.log(isDone);
var count = 42;
console.log(count);
var list = [1, 2, 3];
console.log(list);
var tuple = ["Hello", 42];
console.log(tuple);
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Blue;
console.log(c);
var notSure = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
console.log(notSure);
//** Function */
function add(x, y) {
    return x + y;
}
console.log(add(1, 10));
var myAdd = function (x, y) { return x + y; };
console.log(myAdd(10, 10));
var myAddArrow = function (x, y) { return x + y; };
console.log(myAddArrow(11, 10));
//** object */
var person = {
    name: "John",
    age: 30
};
console.log(person);
//**Class */
var Student = /** @class */ (function () {
    function Student(name, age) {
        this.name = name;
        this.age = age;
    }
    return Student;
}());
var student = new Student("Alice", 20);
console.log(student);
function greet(person) {
    return "Hello, " + person.name;
}
var user = { name: "Bob", age: 25 };
console.log(greet(user));
//** Generics */
function identity(arg) {
    return arg;
}
console.log(identity("Hello, Generics!"));
console.log(identity(42));
//**Array */
var array = [1, 2, 3];
console.log(array);
