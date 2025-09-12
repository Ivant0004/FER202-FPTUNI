const add=(a,b)=>a+b;
console.log(add(2,3));

let greet =(name,timeOfDay)=>{
    console.log(`Good ${timeOfDay},${name}!`);
}
greet('Alice','morning')

let square =num =>{
    return num*num;
}
console.log(square(5));

let sayHello=()=>{
    console.log("Hello there!");
};

sayHello();

let thang={
    name:"john",
    age:30,
    greet: function(){
        console.log(`Hello,my name is ${this.name} and iam ${this.age} year old` );
    }

}
thang.greet();