// src/components/Header.jsx
import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState, useAuthDispatch } from "../contexts/AuthContext";

export default function Header() {
  const { user } = useAuthState();
  const { logout } = useAuthDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/movies">🎬 Movie Manager</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="me-3">
            {user && <Nav.Link as={Link} to="/movies">Movies</Nav.Link>}
          </Nav>
          {user ? (
            <>
              <span className="me-3">
                Xin chào, <strong>{user.fullname}</strong>
              </span>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={handleLogout}
              >
                Đăng xuất
              </Button>
            </>
          ) : (
            <Button as={Link} to="/login" variant="primary" size="sm">
              Đăng nhập
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
