var serverFive = [
    {name: '권세희', age: 23, part: 'server', member: 'YB'},
    {name: '김보배', age: 26, part: 'server', member: 'YB'},
    {name: '오태진', age: 24, part: 'server', member: 'OB'},
    {name: '정효원', age: 24, part: 'server', member: 'YB'},
    {name: '허정민', age: 24, part: 'server', member: 'OB'}
]

console.log(serverFive);
console.log(serverFive.length);
serverFive.forEach(each => console.log(
    `이름 ${each.name}
- 나이: ${each.age}
- 파트: ${each.part}
- 멤버: ${each.member}`));