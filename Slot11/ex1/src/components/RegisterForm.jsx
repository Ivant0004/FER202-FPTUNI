import React, { useMemo, useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Modal, Toast, ToastContainer } from 'react-bootstrap';

const usernameRegex = /^(?=.{3,30}$)[A-Za-z0-9._]+$/; // ≥3 ký tự, chỉ chữ/số/._ 
const emailRegex    = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/; // ≥8, hoa, thường, số, ký tự đặc biệt

function RegisterForm() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [touched, setTouched] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const errors = useMemo(() => {
    const e = {};
    // username
    const uname = form.username.trim();
    if (!uname) e.username = 'Username is required';
    else if (!usernameRegex.test(uname)) e.username = 'Chỉ chữ, số, ., _ và ≥ 3 ký tự';
    // email
    const mail = form.email.trim();
    if (!mail) e.email = 'Email is required';
    else if (!emailRegex.test(mail)) e.email = 'Email không hợp lệ';
    // password
    if (!form.password) e.password = 'Password is required';
    else if (!passwordRegex.test(form.password)) e.password = 'Tối thiểu 8 ký tự, gồm hoa, thường, số, ký tự đặc biệt';
    // confirm
    if (!form.confirmPassword) e.confirmPassword = 'Confirm password is required';
    else if (form.confirmPassword !== form.password) e.confirmPassword = 'Không khớp password';
    return e;
  }, [form]);

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'username' ? value.trimStart() : value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // đánh dấu tất cả đã chạm để hiện lỗi nếu có
    setTouched({ username: true, email: true, password: true, confirmPassword: true });
    if (!isValid) return;
    // hợp lệ: show toast + modal kết quả
    setShowToast(true);
    setShowModal(true);
  };

  const handleCancel = () => {
    setForm({ username: '', email: '', password: '', confirmPassword: '' });
    setTouched({});
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md={7} lg={6}>
          <Card className="shadow-sm">
            <Card.Header><h3 className="text-center mb-0">Register</h3></Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit} noValidate>
                {/* Username */}
                <Form.Group className="mb-3" controlId="reg_username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.username && !!errors.username}
                    placeholder="vd: tai.vd"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-3" controlId="reg_email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.email && !!errors.email}
                    placeholder="you@example.com"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3" controlId="reg_password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.password && !!errors.password}
                    placeholder="Tối thiểu 8 ký tự mạnh"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Confirm */}
                <Form.Group className="mb-4" controlId="reg_confirm">
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                    placeholder="Nhập lại password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button type="submit" variant="primary" disabled={!isValid} className="flex-grow-1">
                    Submit
                  </Button>
                  <Button type="button" variant="outline-secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Toast báo thành công */}
      <ToastContainer position="top-center" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={2000} autohide bg="success">
          <Toast.Body className="text-white text-center">Submitted successfully!</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Modal hiển thị thông tin submit */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin đăng ký</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="border-0">
            <Card.Body>
              <div><b>Username:</b> {form.username}</div>
              <div><b>Email:</b> {form.email}</div>
              <div><b>Password:</b> ******</div>
              <div><b>Confirm:</b> ******</div>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>OK</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default RegisterForm;
