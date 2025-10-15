import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Modal } from 'react-bootstrap';

function LoginForm2() {
  const [user, setUser] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!user.username.trim()) newErrors.username = 'Username is required';
    if (!user.password.trim()) newErrors.password = 'Password is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUser({ username: '', password: '' });
    setErrors({});
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Header><h3 className="text-center">Login Form 2</h3></Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">Login</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton><Modal.Title>Login Successful</Modal.Title></Modal.Header>
        <Modal.Body className="text-success text-center">Welcome, {user.username}!</Modal.Body>
      </Modal>
    </Container>
  );
}
export default LoginForm2;
