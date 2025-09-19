// exercise4.js

const ages = [33, 12, 20, 16];

// Destructuring: lấy phần tử 1, bỏ qua phần tử 2, lấy phần tử 3 (có default = 0), và lấy phần còn lại
const [first, , third = 0, ...restAges] = ages;

// In kết quả
console.log("first =", first);     // 33
console.log("third =", third);     // 20
console.log("restAges =", restAges); // [16]
console.log("ages =", ages);