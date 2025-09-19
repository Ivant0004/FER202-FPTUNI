
const person = {
  name: "John",
  age: 30,
  address: {
    street: "123 Main St",
    // city: "New York"   // thử comment dòng này để test mặc định
  }
};

// Destructuring object lồng nhau + giá trị mặc định
const {
  address: {
    street,
    city = "Unknown City"
  }
} = person;

// In kết quả
console.log("street =", street);
console.log("city =", city);
console.log("person =", person);