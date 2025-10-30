import React, { useState } from 'react';
import { Button, Card, Container, Form, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuthDispatch, useAuthState } from '../contexts/AuthContext';

export default function LoginPage() {
  const { login } = useAuthDispatch();
  const { loading } = useAuthState();
  const nav = useNavigate();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('123');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    const res = await login(username, password);
    if (res.ok) nav('/movies');
    else setMsg(res.message || 'Đăng nhập thất bại');
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={5}>
          <Card>
            <Card.Body>
              <h3 className="mb-3 text-center">Đăng nhập</h3>
              {msg && <Alert variant="danger">{msg}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Tài khoản</Form.Label>
                  <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <div className="d-grid">
                  <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? <Spinner size="sm" /> : 'Đăng nhập'}
                  </Button>
                </div>
              </Form>
              <div className="text-muted mt-3">
                Demo: <code>admin / 123</code> hoặc <code>tai / 123</code>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
