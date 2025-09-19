// exercise7.js

const companies = [
  { name: "Company A", category: "Finance", start: 1981, end: 2004 },
  { name: "Company B", category: "Retail", start: 1992, end: 2008 },
];

// Tạo bản sao từ companies[0] với start + 1 (dùng spread để bất biến)
const company0New = { ...companies[0], start: companies[0].start + 1 };

// Hàm concatAll dùng rest (nhận nhiều mảng) + spread (gộp)
function concatAll(...arrays) {
  return arrays.flat(); // hoặc [].concat(...arrays)
}

// In kết quả
console.log("companies[0] =", companies[0]);   // giữ nguyên
console.log("company0New =", company0New);     // start + 1

console.log("concatAll([1,2],[3],[4,5]) =", concatAll([1,2],[3],[4,5]));
console.log("companies =", companies); // giữ nguyên