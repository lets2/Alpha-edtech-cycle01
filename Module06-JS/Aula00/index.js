


function checkPhoneKey(key) {
    return (key >= '0' && key <= '9') || ['+','(',')','-','ArrowLeft','ArrowRight','Delete','Backspace'].includes(key);
  }

const inputElement = document.getElementById("inputElement");

inputElement.addEventListener("input",function(event){
    console.log("Dispara sempre que muda algo no input",event.target.value);
})

console.log("usando for in")
//Objeto
const obj = {a:1, b:2, c:3};

//Para prop (propriedade) in obj (objeto) faça
for (let prop in obj) {
  // ctrl+shift+k (para abrir o console no mozilla firefox)
  console.log("obj." + prop + " = " + obj[prop]);
}
//A saída (output) deverá ser:
// "obj.a = 1"
// "obj.b = 2"
// "obj.c = 3"

console.log("Usando for of")

let iterable = [10, 20, 30];

for (let value of iterable) {
  console.log(value);
}
//+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
//Using dataset
//+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
const el = document.querySelector('#user');

// el.id === 'user'
// el.dataset.id === '1234567890'
// el.dataset.user === 'johndoe'
// el.dataset.dateOfBirth === ''

// set a data attribute
el.dataset.dateOfBirth = '1960-10-03';
// Result on JS: el.dataset.dateOfBirth === '1960-10-03'
// Result on HTML: <div id="user" data-id="1234567890" data-user="johndoe" data-date-of-birth="1960-10-03">John Doe</div>

delete el.dataset.dateOfBirth;
// Result on JS: el.dataset.dateOfBirth === undefined
// Result on HTML: <div id="user" data-id="1234567890" data-user="johndoe">John Doe</div>

if (!('someDataAttr' in el.dataset)) {
  el.dataset.someDataAttr = 'mydata';
  // Result on JS: 'someDataAttr' in el.dataset === true
  // Result on HTML: <div id="user" data-id="1234567890" data-user="johndoe" data-some-data-attr="mydata">John Doe</div>
}