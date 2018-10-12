import 'babel-polyfill'
import sum from './sum.js'

console.log('sum(23, 24)=', sum(23, 24))

let func = () => {};
const Num = 45;
let arr = [1, 2, 4];
let arrB = arr.map(item => item * 2);

console.log(arrB.includes(8));
console.log('new Set(arrB) is ', new Set(arrB));
