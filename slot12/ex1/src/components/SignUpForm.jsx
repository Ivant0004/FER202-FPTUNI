import React, { useReducer } from "react";
import { Form, Button, Card } from "react-bootstrap";

const initialState = { username: "", email: "", password: "", message: "" };

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SIGNUP":
      if (state.username && state.email && state.password)
        return { ...state, message: "✅ Đăng ký thành công!" };
      return { ...state, message: "❌ Vui lòng nhập đầy đủ thông tin!" };
    default:
      return state;
  }
}

export default function SignUpForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Card className="p-4 mt-4" style={{ width: "400px", margin: "auto" }}>
      <h3 className="text-center mb-3">Sign Up</h3>
      <Form>
        {["username", "email", "password"].map((field, i) => (
          <Form.Group className="mt-2" key={i}>
            <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
            <Form.Control
              type={field === "password" ? "password" : "text"}
              value={state[field]}
              onChange={(e) =>
                dispatch({ type: "SET_FIELD", field, value: e.target.value })
              }
            />
          </Form.Group>
        ))}
        <Button className="mt-3 w-100" onClick={() => dispatch({ type: "SIGNUP" })}>
          Đăng ký
        </Button>
      </Form>
      <p className="text-center mt-3">{state.message}</p>
    </Card>
  );
}
