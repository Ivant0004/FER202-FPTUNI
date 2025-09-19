// exercise5.js

const people = [
  { name: "Ann", age: 19 },
  { name: "Bob", age: 12 },
  { name: "Chris", age: 15 },
  { name: "Daisy", age: 20 },
  { name: "Eva", age: 13 }
];

// Lọc teen (13–19), rồi map thành "Name (age)"
const teens = people
  .filter(person => person.age >= 13 && person.age <= 19)
  .map(person => `${person.name} (${person.age})`);

// In từng dòng
teens.forEach(t => console.log(t));
