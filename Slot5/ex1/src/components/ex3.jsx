export function Ex3() {
  const arr = [1, 2, 3, 4, 5];
  const names = ["thanh", "tung", "an", "tuan"];

  const people = [
    { id: 1, name: "thanh", age: 20 },
    { id: 2, name: "tung", age: 21 },
    { id: 3, name: "trung", age: 22 },
    { id: 4, name: "an", age: 23 },
    { id: 5, name: "tuan", age: 24 },
    { id: 6, name: "hieu", age: 25 },
    { id: 7, name: "quynh", age: 17 },
    { id: 8, name: "bao", age: 18 },
    { id: 9, name: "anh", age: 28 },
    { id: 10, name: "nam", age: 29 }
  ];

  const companies = [
    { name: "A", category: "Tech", start: 2000, end: 2020 },
    { name: "B", category: "Finance", start: 1999, end: 2010 },
    { name: "C", category: "Retail", start: 2005, end: 2015 },
    { name: "D", category: "Auto", start: 2001, end: 2008 }
  ];

  // Tuổi trung bình
  const teamAverage = (people) =>
    people.reduce((sum, p) => sum + p.age, 0) / people.length;

  // Lọc teen
  const teens = people.filter((p) => p.age >= 13 && p.age <= 19);

  // Tổng mảng arr
  const num = arr.reduce((a, b) => a + b, 0);

  // Top 3 công ty theo end tăng dần
  const sortedCompanies = [...companies].sort((a, b) => a.end - b.end).slice(0, 3);

  // Clone object + spread
  const company0New = { ...companies[0], start: companies[0].start + 1 };

  // Rest + concat
  const concatAll = (...arrays) => arrays.flat();

  // Tính toán nâng cao
  const ages = people.map((p) => p.age);
  const total = ages.reduce((a, b) => a + b, 0);
  const min = Math.min(...ages);
  const max = Math.max(...ages);
  const buckets = ages.reduce(
    (acc, age) => {
      if (age >= 13 && age <= 19) acc.teen++;
      else if (age >= 20) acc.adult++;
      return acc;
    },
    { teen: 0, adult: 0 }
  );

  return (
    <>
      <h1>Exercise 3</h1>

      <p>Các phần tử của mảng arr:</p>
      <ul>
        {arr.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>

      <p>Tổng các phần tử trong mảng arr:</p>
      <p>{num}</p>

      <p>Các phần tử của mảng names:</p>
      <ul>
        {names.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>

      <p>Các phần tử của mảng people:</p>
      <ul>
        {people.map((p) => (
          <li key={p.id}>
            id={p.id}, name={p.name}, age={p.age}
          </li>
        ))}
      </ul>

      <p>Hiển thị people theo name tăng dần:</p>
      <ul>
        {[...people]
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((p) => (
            <li key={p.id}>name={p.name}</li>
          ))}
      </ul>

      <p>Hiển thị tuổi teen:</p>
      <ul>
        {teens.map((p) => (
          <li key={p.id}>
            {p.name}, {p.age}
          </li>
        ))}
      </ul>

      <p>Tuổi trung bình:</p>
      <p>{teamAverage(people)}</p>

      <hr />
      <p>Top 3 companies (end tăng dần):</p>
      <ul>
        {sortedCompanies.map((c, i) => (
          <li key={i}>
            {c.name} - {c.end}
          </li>
        ))}
      </ul>

      <p>Spread vs rest:</p>
      <div>companies[0]: {JSON.stringify(companies[0])}</div>
      <div>company0New: {JSON.stringify(company0New)}</div>
      <div>
        concatAll([1,2],[3],[4,5]):{" "}
        {JSON.stringify(concatAll([1, 2], [3], [4, 5]))}
      </div>

      <hr />
      <p>Reduce nâng cao:</p>
      <div>
        Total: {total}, Min: {min}, Max: {max}
      </div>
      <div>Buckets: {JSON.stringify(buckets)}</div>
    </>
  );
}
