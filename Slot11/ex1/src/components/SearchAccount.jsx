import React, { useMemo, useState } from 'react';
import { Card, Form, Row, Col, Badge } from 'react-bootstrap';

const accounts = [
  { id: 1, username: 'admin',   password: 'Admin@123', avatar: 'https://picsum.photos/seed/a/160' },
  { id: 2, username: 'taivan',  password: 'Tai@2025',  avatar: 'https://picsum.photos/seed/b/160' },
  { id: 3, username: 'traltb',  password: 'Tra@2025',  avatar: 'https://picsum.photos/seed/c/160' },
  { id: 4, username: 'sakura',  password: 'Sa@2025',   avatar: 'https://picsum.photos/seed/d/160' },
  { id: 5, username: 'john_doe',password: 'JohN@999',  avatar: 'https://picsum.photos/seed/e/160' },
];

function SearchAccount() {
  const [keyword, setKeyword] = useState('');

  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase();
    if (!k) return accounts;
    return accounts.filter(a => a.username.toLowerCase().includes(k));
  }, [keyword]);

  return (
    <div className="container my-5">
      <h2 className="mb-3">Tìm kiếm Account theo <Badge bg="primary">username</Badge></h2>
      <Form.Control
        placeholder="Nhập username cần tìm…"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="mb-4"
      />

      {filtered.length === 0 ? (
        <p className="text-muted text-center">Không tìm thấy kết quả</p>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-3">
          {filtered.map(acc => (
            <Col key={acc.id}>
              <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={acc.avatar} alt={acc.username} />
                <Card.Body>
                  <Card.Title className="mb-1">@{acc.username}</Card.Title>
                  <Card.Text className="text-muted" style={{ fontFamily: 'monospace' }}>
                    • id: {acc.id}<br/>
                    • password: {acc.password}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default SearchAccount;
