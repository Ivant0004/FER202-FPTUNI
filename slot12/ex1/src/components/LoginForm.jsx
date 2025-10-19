import React, { useReducer } from "react";
import { Form, Button, Card } from "react-bootstrap";

const initialState = { username: "", password: "", message: "" };

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "LOGIN":
      if (state.username === "admin" && state.password === "1234")
        return { ...state, message: "✅ Đăng nhập thành công!" };
      else return { ...state, message: "❌ Sai tài khoản hoặc mật khẩu!" };
    default:
      return state;
  }
}

export default function LoginForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Card className="p-4 mt-4" style={{ width: "400px", margin: "auto" }}>
      <h3 className="text-center mb-3">Login</h3>
      <Form>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={state.username}
            onChange={(e) =>
              dispatch({ type: "SET_FIELD", field: "username", value: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={state.password}
            onChange={(e) =>
              dispatch({ type: "SET_FIELD", field: "password", value: e.target.value })
            }
          />
        </Form.Group>
        <Button className="mt-3 w-100" onClick={() => dispatch({ type: "LOGIN" })}>
          Đăng nhập
        </Button>
      </Form>
      <p className="text-center mt-3">{state.message}</p>
    </Card>
  );
}
