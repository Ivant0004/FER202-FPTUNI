import React, { useEffect, useMemo, useState } from "react";
import {
  Row, Col, Card, Badge, Button, Modal, Toast, Container
} from "react-bootstrap";
import { movies } from "../../data/movies";

// rút gọn mô tả
const shorten = (text, max = 120) => {
  if (!text) return "";
  return text.length > max ? text.slice(0, max) + "..." : text;
};

// localStorage helpers
const FAV_KEY = "favourites";
const getFavourites = () => {
  try {
    const raw = localStorage.getItem(FAV_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};
const setFavourites = (arr) => localStorage.setItem(FAV_KEY, JSON.stringify(arr));

export default function MovieCardGrid() {
  const data = useMemo(() => Array.isArray(movies) ? movies : [], []);
  const [favs, setFavs] = useState(getFavourites());
  const [toast, setToast] = useState({ show: false, text: "" });
  const [detail, setDetail] = useState({ show: false, movie: null });

  useEffect(() => {
    setFavourites(favs);
  }, [favs]);

  const addToFavourites = (m) => {
    if (!favs.find(x => x.id === m.id)) {
      const next = [...favs, m];
      setFavs(next);
      setToast({ show: true, text: "Added to favourites!" });
    } else {
      setToast({ show: true, text: "Already in favourites" });
    }
  };

  const openDetails = (m) => setDetail({ show: true, movie: m });
  const closeDetails = () => setDetail({ show: false, movie: null });

  if (data.length === 0) return null;

  return (
    <Container className="mt-4">
      <Row xs={1} sm={2} lg={3} className="g-4">
        {data.map((m) => (
          <Col key={m.id}>
            <Card className="h-100 shadow-sm border-0" style={{ overflow: "hidden" }}>
              <div style={{ overflow: "hidden" }}>
                <Card.Img
                  variant="top"
                  src={m.poster}
                  alt={m.title}
                  style={{ height: 220, objectFit: "cover", transition: "transform .3s" }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>
              <Card.Body>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <Card.Title className="mb-0">{m.title}</Card.Title>
                  <Badge bg="secondary">{m.year}</Badge>
                </div>
                <Card.Text className="text-secondary">{shorten(m.description)}</Card.Text>
                <div className="mb-2 d-flex gap-2 flex-wrap">
                  <Badge bg="info" className="text-dark">{m.genre}</Badge>
                  <Badge bg="dark">{m.country}</Badge>
                  <Badge bg="outline-secondary" text="dark">
                    {m.duration} mins
                  </Badge>
                </div>
                <div className="d-flex gap-2">
                  <Button variant="primary" onClick={() => addToFavourites(m)}>
                    Add to Favourites
                  </Button>
                  <Button variant="outline-secondary" onClick={() => openDetails(m)}>
                    Details
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Toast */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="position-fixed"
        style={{ right: 16, bottom: 16, zIndex: 1080 }}
      >
        <Toast
          show={toast.show}
          onClose={() => setToast({ show: false, text: "" })}
          delay={1700}
          autohide
        >
          <Toast.Header closeButton>
            <strong className="me-auto">Favourites</strong>
          </Toast.Header>
          <Toast.Body>{toast.text}</Toast.Body>
        </Toast>
      </div>

      {/* Modal Details */}
      <Modal show={detail.show} onHide={closeDetails} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {detail.movie?.title}{" "}
            {detail.movie && <Badge bg="info" className="text-dark">{detail.movie.genre}</Badge>}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {detail.movie && (
            <Row className="g-3">
              <Col md={5}>
                <img
                  src={detail.movie.poster}
                  alt={detail.movie.title}
                  style={{ width: "100%", borderRadius: 8, objectFit: "cover" }}
                />
              </Col>
              <Col md={7}>
                <p className="text-secondary">{detail.movie.description}</p>
                <div className="mb-2 d-flex gap-2 flex-wrap">
                  <Badge bg="secondary">{detail.movie.year}</Badge>
                  <Badge bg="dark">{detail.movie.country}</Badge>
                  <Badge bg="outline-secondary" text="dark">
                    {detail.movie.duration} mins
                  </Badge>
                </div>
                <div>
                  <strong>Showtimes: </strong>
                  {detail.movie.showtimes?.map((t, idx) => (
                    <Badge key={idx} bg="success" className="me-2">{t}</Badge>
                  ))}
                </div>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDetails}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
