import React, { useReducer } from "react";
import { Button } from "react-bootstrap";

const reducer = (state, action) => {
  switch (action.type) {
    case "toggle": return { isOn: !state.isOn };
    default: return state;
  }
};

export default function ToggleComponent() {
  const [state, dispatch] = useReducer(reducer, { isOn: false });
  return (
    <div className="text-center mt-3">
      <h4>Trạng thái: {state.isOn ? "🔵 Bật" : "⚪ Tắt"}</h4>
      <Button onClick={() => dispatch({ type: "toggle" })}>
        {state.isOn ? "Tắt" : "Bật"}
      </Button>
    </div>
  );
}
