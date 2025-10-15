import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

function CounterComponent() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div style={{ padding: 20, border: '1px solid #ccc' }}>
      <h2>Bộ Đếm Đa Năng</h2>
      <p style={{ fontSize: 24, fontWeight: 'bold' }}>Giá trị hiện tại: {count}</p>
      <Button onClick={increment} variant="primary" className="m-1">Tăng (+1)</Button>
      <Button onClick={decrement} variant="warning" className="m-1">Giảm (-1)</Button>
      <Button onClick={reset} variant="danger" className="m-1">Reset</Button>
    </div>
  );
}
export default CounterComponent;
