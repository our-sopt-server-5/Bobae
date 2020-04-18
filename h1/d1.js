/*
var/let/const
변수 재선언
변수 값 재할당
초기화 값 필요
*/

var v1 = 123;
var v1 = 234;
console.log('v1:', v1);

let v2 = 123;
// let v2 = 234; // ERROR
v2 = 234;
console.log('v2:', v2);

const v3 = 123;
// const v3;        // ERROR
// const v3 = 234;  // ERROR
// v3 = 234;        // ERROR
console.log('v3:', v3);




/*
Function Scope/Block Scope
var: function scope
let/const: block scope
*/

function foo(){
    var vv1 = "Hello1";
    let vv2 = "Hello2";
    const vv3 = "Hello3";
}
// console.log(vv1);    // ERROR 
// console.log(vv2);    // ERROR
// console.log(vv3);    // ERROR

{
    var vv1 = "Hello1";
    let vv2 = "Hello2";
    const vv3 = "Hello3";
}
console.log(vv1);
// console.log(vv2);    // ERROR
// console.log(vv3);    // ERROR

// Example
function funcScope() {
    var vvv1 = 123;
    let vvv2 = 1231421;
    if (true) {
        var vvv3 = 123;
        let vvv4 = 'abc';
        console.log('let은 Block Scope, vvv4: ', vvv4);
    }
    // console.log('let은 Block Scope, vvv4: ', vvv4);
    console.log('var은 function Scope, vvv3: ', vvv3);
}

funcScope();

// Use backtick(`) - template literals
let backtick = "ABCDEFG";
console.log(`Hello ! ${backtick}`);



/*
Array
- 객체
- 배열 요소의 타입 고정아님
- 인덱스 연속적이지 않아도 된다. 0과 31에는 데이터넣고 1~30은 비워도된다.
- arr = []
- arr = Array(element1, element2, ...)
*/
console.log('ArrayArrayArrayArrayArrayArrayArrayArrayArrayArrayArrayArrayArray')

var arr = [1, '안녕', null, true];
// var arr = Array(1, '안녕', null, true);

arr.push('PUSH');   // 추가
arr[12] = 'ABCDE';  // 인덱스 지정 추가

/*
for ( A of B ) : B의 item를 A로 !
for ( A in B ) : B의 index를 A로 !
*/

// item
for (let item of arr) {
    console.log('Item:', item);
    console.log(`Item: ${item}`);
}
console.log();

// index
for (let item in arr) {
    console.log('Item:', item);
    console.log(`Item: ${arr[item]}`);
}

// forEach 
let str3 = 'Server3: ';
arr.forEach(element => {
    console.log(element);
    str3 += element + ', ';
});
console.log(str3);

str3 = 'Server3: '
arr.forEach(item => str3 += item + ', ');
console.log(str3);


// 전체 리스트 출력
// [ elements .. ]
console.log(arr);

// 리스트 길이 출력
console.log(arr.length);
// 리스트 길이를 통한 마지막 위치 데이터 추가
arr[arr.length] = "Last value";
console.log(arr);


/* 
Function
- Can be contained in variables or data structures.
- Can be passed on to parameters of other functions.
- Can be used as a return value.
- Can be generated at runtime.
*/

console.log('FunctionFunctionFunctionFunctionFunctionFunctionFunctionFunctionFunction')

function addNum(x, y) {
    console.log(x + y);
}
addNum(2, 3);

var addStr = function (x, y) {
    console.log(x + y);
}
addStr("함수", "표현식");


/*
function(x, y){

}

(x, y) => {


}
*/
var BBool = (x, y) => {
    if (x + y) {
        return true;
    }
    else {
        return false;
    }
}
const a = BBool(true, true);
console.log(a);


/*
JSON (JavaScript Object Notation)
*/
console.log('JSONJSONJSONJSONJSONJSONJSONJSONJSONJSONJSONJSONJSONJSONJSON')
var dict = {
    Server: 'NodeJs',
    Lang: 'Javascript',
    Version: 10000,
    Person: {
        Name: 'KimBobae',
        Age: 26,
        Address: 'Korea',
        Major: 'Software',
        printName: function () {
            console.log('Name:', this.Name);
        },
        printAge: function () {
            console.log('Age', this.Age);
        },
        setAge: function(age){
            this.Age = age;
        },
        printWhatYouWant: function (want) {
            console.log(want, ':', this[want]);
        }
    }
};
console.log(typeof dict);
console.log('sopt: ', dict);
console.log('sopt: ' + dict);
console.log(JSON.stringify(dict));


console.log(dict.Server);
console.log(dict['Server']);

var name = dict['Person'].Name;
var age = dict['Person'].Age;
console.log(name, age);
dict['Person'].printName();
dict['Person'].printAge();
dict['Person'].printWhatYouWant('Age');
dict['Person'].setAge(21);
dict['Person'].printWhatYouWant('Age');

var animals = [
    {name: 'A동물', weight: 29, height:122, age: 4},
    {name: 'B동물', weight: 22, height:162, age: 5},
    {name: 'C동물', weight: 37, height:119, age: 6},
    {name: 'D동물', weight: 12, height:98, age: 7}    
]

console.log(animals);
console.log(animals.length);
animals.forEach(animal => console.log(`Animal ${animal.name}
- Age: ${animal.age}
- H: ${animal.height}
- W: ${animal.weight}
`));