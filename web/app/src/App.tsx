import React from 'react';
import logo from './logo.svg';
import './App.css';

function sample(name: string, age: number) {
  return name + age + "歳です。";
}
// ==================ENUM======================
enum Role {
  ADMIN, READ_ONLY, AUTH
}

const person = {
  name: 'chaki',
  age: 35,
  role: Role.ADMIN
}

if (person.role === Role.ADMIN) {
  console.log(Role.ADMIN);
  console.log("管理者ユーザーです");
}
// ================================================
// ==================Literal&エイリアス======================
type Combinable = number | string;
type ConversionDescriptor = 'asNumber' | 'asString'

function combine(
  input1: Combinable,
  input2: Combinable,
  resultConversion: ConversionDescriptor
) {
  let result;
  if (typeof input1 === "number" && typeof input2 === "number" || resultConversion === "asNumber") {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  // if(resultConversion === 'asNumber'){
  //   return +result;
  // }else{
  //   return result.toString();
  // }
  return result;
}

const combineAges = combine(24, 11, "asNumber");
console.log(combineAges);

const combineStringAges = combine('24', '11', "asNumber");
console.log(combineStringAges);

const combineName = combine("Ryou", "Chaki", "asString");
console.log(combineName);

// ================================================
// =====================function型とvoid型===========
type Num = number;
function add(num1: number, num2: number): number{
  return num1 + num2;
}

function resultPrint(num: number){
  console.log("result: " + num);
}

resultPrint(add(1, 15));
console.log(resultPrint(add(1, 15)));

// ================================================
// =====================callback=================

function addAndHandle(n1: number, n2: number, callback: (num: number) => void){
  const result = n1 + n2;
  callback(result);
}

addAndHandle(20, 22, (result)=>{
  console.log(result);
})

// ================================================
// =====================エラーオブジェクト=================
function generateError(message: string, code: number){
  throw{message: message, errorCode: code};
}

generateError("エラーが発生しました", 404);
// ================================================
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {sample("chaki", 34)}<br></br>
          Hello World!!!!!!!!!!!!!!!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
