import React, { useReducer } from "react";
import { Button, Card } from "react-bootstrap";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment": return { count: state.count + 1 };
    case "decrement": return { count: state.count - 1 };
    case "reset": return initialState;
    default: return state;
  }
}

export default function CounterComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Card className="p-3 mt-3 text-center">
      <h3>Bộ đếm đa năng</h3>
      <h4>Giá trị hiện tại: {state.count}</h4>
      <div>
        <Button onClick={() => dispatch({ type: "increment" })} className="m-2">+</Button>
        <Button onClick={() => dispatch({ type: "decrement" })} className="m-2">-</Button>
        <Button variant="danger" onClick={() => dispatch({ type: "reset" })} className="m-2">Reset</Button>
      </div>
    </Card>
  );
}
