var vv = 123;
vv = 321;

console.log("vv: ", vv);

// let ll = 123;
// ll = 321;
// console.log("ll: ", ll);

// const cc;
// cc = 321;
// console.log("cc: ", cc);


function funcScope() {
    var v1 = 123;
    let vvv = 1231421;
    if (true) {
        var v2 = 123;
        let ll = 'abc';
        console.log('let은 Block Scope, ll: ', ll);
    }
    // console.log('let은 Block Scope, ll: ', ll);
    console.log('var은 function Scope, v2: ', v2);
}

funcScope();

let aa = "ABCDEFG";
console.log(`Hello ! ${aa}`);

/*
Array
- 객체
- 배열 요소의 타입 고정아님
- 인덱스 연속적이지 않아도 된다. 0과 31에는 데이터넣고 1~30은 비워도된다.
- arr = [] 형태
*/

var arr = [1, '안녕', null, true];
// var arr = Array(1, '안녕', null, true);

arr.push('PUSH');
arr[12] = 'ABCDE';


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

// 전체 리스트 출력
console.log(arr);

// 리스트 길이 출력
console.log(arr.length);

let str3 = 'Server3: ';
arr.forEach(element => {
    console.log(element);
    str3 += element + ', ';
});

console.log(str3);


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


var addBool = (x, y) => {
    if (x + y) {
        return true;
    }
    else {
        return false;
    }
}

const a = addBool(true, false);
console.log(a);

var dict = {
    'Server': 'NodeJs',
    'Lang': 'Javascript',
    'Version': 10000,
    'Person': {
        'Name': 'KimBobae',
        'Age': 26,
        'Address': 'Korea',
        'Major': 'Software',
        printName: function () {
            console.log('Name:', this.Name);
        },
        printAge: function () {
            console.log('Age', this.Age);
        },
        printWhatYouWant: function (want) {
            console.log(want, ':', this[want]);
        }
    }
};



console.log(dict.Server);
console.log(dict['Server']);

var name = dict['Person'].Name;
var age = dict['Person'].Age;
console.log(name, age);
dict['Person'].printName();
dict['Person'].printAge();

dict['Person'].printWhatYouWant('Age');

console.log(JSON.stringify(dict));