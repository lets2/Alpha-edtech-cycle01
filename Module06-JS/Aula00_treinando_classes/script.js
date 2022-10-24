//Its a good practice iniciate with UPPER CASE about class name/
//javascript typage is dynamic, then its not necessary to say type of attributes
class Person
{

     //attributes == variables == características
    //develop in general decided that _(underscore->private/protected, without nothing then is public)
    _name //type string
    _age //type integer
    _weight //type float ===real
    _height
    _imc
  
    //atribute static, belong to class, static is a reserved word
    static totalPerson = 0;
    
  
    //métodos ==functions == behavior
    //constructor method
    constructor(name,age,weight,height){
        this._name = name
        this._age = age
        this._weight = weight
        this._height = height
        this._imc = (this._weight/(this._height*this._height)).toFixed(2);
        Person.totalPerson += 1;
    }
    CalculateIMC(){
        return (this._weight/(this._height*this._height)).toFixed(2);
    }
    classifyIMC(){
        let valueIMC = (this.imc);
        let classification = "";
        if(valueIMC<=18.5){
            classification = "Below of weight";
        }
        else if(valueIMC<=24.9){
            classification = "normal weight";
        }
        else if(valueIMC<=29.9){
            classification = "over weight";
        }
        else if(valueIMC<=34.9){
            classification = "overweight degree 1";
        }
        else if(valueIMC<=39.9){
            classification = "overweight degree 2";
        }
        else if(valueIMC>40){
            classification = "overweight degree 3";
        }
        else{
            classification = "weight invalid";
        }
        return classification;
        
    }
    //GET method, if a need to get, s o i need a aswer/return
    get name (){
        return this._name;
    }
    get age (){
        return this._age;
    }
    
    get imc (){
        return this._imc;
    }
    get totalPerson (){
        return this.totalPerson;
    }
    //set ==config/edit/
    set name (newName){
        this._name = newName;
    }
    set age (newAge){
        this._age = newAge;
    }
    
}

console.log(Person)

//create new object from class = = instanciar objeto
//let person1 = new Person();//new object of type Person
//let person2 = new Person();//new object of type Person
//atribuir valores para atributs de um objeto
console.log("Number total of people is:",Person.totalPerson);
let person1 = new Person("Leo Santos",10,49.5,1.5);//new object of type Person
let person2 = new Person("Mary",22,74.2,1.7);//new object of type Person
let person3 = new Person("Jonh",12,54.2,1.45);//new object of type Person
let person4 = new Person("Joseph",30,50.4,1.57);//new object of type Person

//person1._name = "Leo";
//person1._age = 40;
//person1._weight = 49.5;
//person1._height = 1.50;

//person2._name = "Let";
//person2._age = 20;
//person2._weight = 60.0;
//person2._height = 1.65;
console.log(person1);
console.log(person1._name);
console.log(person2);
console.log(person3);
console.log(person4);
console.log("-----------------");
console.log("Using method calculateIMC on each person");
console.log(person1.CalculateIMC());
console.log(person2.CalculateIMC());
console.log(person3.CalculateIMC());
console.log(person4.CalculateIMC());
console.log("Using methods get and set");

//name get name return this._name, so below we are using get method
console.log("Person1name:",person1.name);
console.log("Person1imc:",person1.age);
console.log("Person1imc:",person1.imc);

//now I want change a name using set method, so we writing: person1.name = "new name"
//this way, the name is updated!!
person1.name = "Leopoldo";
person1.age = 2; 

console.log("Person1name:",person1.name);
console.log("Person1age:",person1.age);


console.log("Number total of people is:",Person.totalPerson);

console.log("Situation of person 1 is:",person1.classifyIMC());