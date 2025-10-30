import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { useMovieDispatch, useMovieState } from '../contexts/MovieContext';

export default function FilterBar() {
  const state = useMovieState();
  const { dispatch, fetchMovies } = useMovieDispatch();
  const [q, setQ] = useState(state.q);
  const [genre, setGenre] = useState(state.genreFilter);
  const [durMin, setDurMin] = useState(state.durationRange[0]);
  const [durMax, setDurMax] = useState(state.durationRange[1]);
  const [sort, setSort] = useState(state.sort);

  useEffect(() => {
    const t = setTimeout(() => {
      dispatch({ type: 'SET_QUERY', payload: q });
      dispatch({ type: 'SET_GENRE_FILTER', payload: genre });
      dispatch({ type: 'SET_DURATION_RANGE', payload: [Number(durMin), Number(durMax)] });
      dispatch({ type: 'SET_SORT', payload: sort });
      fetchMovies();
    }, 300);
    return () => clearTimeout(t);
  }, [q, genre, durMin, durMax, sort, dispatch, fetchMovies]);

  return (
    <Form className="p-3 border rounded bg-white">
      <Row className="g-3">
        <Col md={4}>
          <Form.Control
            placeholder="Tìm theo tên phim..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Select value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="">-- Lọc theo thể loại --</option>
            {state.genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
          </Form.Select>
        </Col>
        <Col md={3} className="d-flex align-items-center gap-2">
          <Form.Control
            type="number"
            min="0"
            max="600"
            value={durMin}
            onChange={(e) => setDurMin(e.target.value)}
          />
          <span>~</span>
          <Form.Control
            type="number"
            min="0"
            max="600"
            value={durMax}
            onChange={(e) => setDurMax(e.target.value)}
          />
          <span>phút</span>
        </Col>
        <Col md={2}>
          <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="title_asc">Tên A → Z</option>
            <option value="title_desc">Tên Z → A</option>
          </Form.Select>
        </Col>
      </Row>
    </Form>
  );
}
