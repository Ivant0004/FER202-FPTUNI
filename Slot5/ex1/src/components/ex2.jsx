export function Ex2() {
    //khai bao mang
    const number = [1,2,3,4,5];
    //tinh tong cac phan tu trong mang
    const sum = number.reduce((total, current) => total + current, 0);
    //khai bao chuoi mang name
    const names = ['Alice', 'Bob', 'Charlie'];
    //khai bao mang people gom 10 phan tu
    const people = [
        {name: 'Alice', age: 17},
        {name: 'Bob', age: 15},
        {name: 'Charlie', age: 35},
        {name: 'David', age: 28},
        {name: 'Eve', age: 22},
        {name: 'Frank', age: 33},
        {name: 'Grace', age: 16},
        {name: 'Hannah', age: 29},
        {name: 'Ivy', age: 14},
        {name: 'Jack', age: 26}
    ];  
    //loc nhung nguoi la tuoi teen
    const teens = people.filter(person => person.age >= 13 && person.age <= 19);
    //so nguoi la tuoi teen
    console.log("So nguoi la tuoi teen: " + teens.length);
    //trung binh tuoi
    const avgAge = people.reduce((total, person) => total + person.age, 0) / people.length;
    console.log("Trung binh tuoi: " + avgAge);

    return(
        <div>
            <p> Hello <strong>JSX</strong></p>
            <ul>
            {number.map((number, index) => <li key={index}>{number}</li>)}
            </ul>
            <p>Tong cac phan tu trong mang la: <strong>Sum: {sum}</strong></p>
            <p>Danh sach ten:</p>
            <ul>
                {names.sort().map((name, index) => <li key={index}>{name}</li>)}
            </ul>
            <p>Danh sach nguoi la tuoi <strong>teen:</strong></p>
            <ul>
                {teens.map((teen, index) => <li key={index}>{teen.name} - {teen.age} tuoi</li>)}
            </ul>
            <p>So nguoi la tuoi teen: <strong>{teens.length}</strong></p>
        </div>
    )
    }