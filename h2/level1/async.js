
let asyncFunc1 = (msg) =>
new Promise((resolve) => {
    setTimeout(() => {
        resolve(`func1 : ${msg}`);
    }, 1000);
});

let asyncFunc2 = (msg) =>
new Promise((resolve) => {
    setTimeout(() => {
        resolve(`func2 : ${msg}`);
    }, 1000);
});

async function asyncFunc() {
let result = await asyncFunc1('Hello');
console.log(result);
result = await asyncFunc2('World');
console.log(result);
}

let promiseFunc = () => {
asyncFunc1('Hello')
    .then(
        (result) => {
            console.log(result);

            // return하면 result가 바뀜....
            // 이 함수의 결과를 바꾸는 역할을 할 수 있다 !!!
            return asyncFunc2('World');
        })
    .then(
        (result) => {
            console.log(result);
        }
    )
}

/*

let promiseFunc = () => {
asyncFunc('Hello') // Promise가 아니라, 후 then 역할을 수행하지 않음.
    .then(
        (result) => {
            console.log(result);

            // return하면 result가 바뀜....
            // 이 함수의 결과를 바꾸는 역할을 할 수 있다 !!!
            return asyncFunc2('World');
        })
    .then(
        (result) => {
            console.log(result);
        }
    )
}
*/


//asyncFunc();
promiseFunc();
