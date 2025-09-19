// exercise6.js

const companies = [
  { name: "Company A", category: "Finance", start: 1981, end: 2004 },
  { name: "Company B", category: "Retail", start: 1992, end: 2008 },
  { name: "Company C", category: "Auto", start: 1999, end: 2007 },
  { name: "Company D", category: "Retail", start: 1989, end: 2010 },
  { name: "Company E", category: "Technology", start: 2009, end: 2014 },
  { name: "Company F", category: "Finance", start: 1987, end: 2010 },
  { name: "Company G", category: "Auto", start: 1986, end: 1996 },
];

// Sắp xếp theo end tăng dần (không mutate → dùng spread [...companies])
const sorted = [...companies].sort((a, b) => a.end - b.end);

// Lấy 3 công ty đầu tiên
const top3 = sorted.slice(0, 3);

// In kết quả
top3.forEach(c => console.log(`${c.name} - ${c.end}`));
console.log("companies =", companies);