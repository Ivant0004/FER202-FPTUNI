import React from 'react';
import { Table, Button, Image, Modal, Alert, Spinner } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

export default function MovieTable() {
  const state = useMovieState();
  const { dispatch, confirmDelete } = useMovieDispatch();

  const { movies, genres, loading, movieToDelete, showDeleteModal } = state;

  const genreMap = genres.reduce((map, g) => {
    map[g.id] = g.name;
    return map;
  }, {});

  const handleEditClick = (movie) => {
    dispatch({ type: 'OPEN_EDIT_MODAL', payload: movie });
  };

  const handleDeleteClick = (movie) => {
    dispatch({ type: 'OPEN_DELETE_MODAL', payload: movie });
  };

  if (loading && movies.length === 0) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" role="status" className="me-2" />
        <Alert variant="info" className="mt-3">Đang tải dữ liệu phim...</Alert>
      </div>
    );
  }

  return (
    <>
      <Table striped bordered hover responsive className="mt-4">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>ID</th>
            <th>Tên Phim</th>
            <th>Danh mục</th>
            <th>Năm</th>
            <th>Thời lượng</th>
            <th>Quốc gia</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((m) => (
            <tr key={m.id}>
              <td><Image src={m.avatar} alt={m.title} style={{ width: 50, height: 50, objectFit: 'cover' }} rounded /></td>
              <td>#{m.id}</td>
              <td><strong>{m.title}</strong></td>
              <td>{genreMap[m.genreId] || 'Unknown'}</td>
              <td>{m.year}</td>
              <td>{m.duration} phút</td>
              <td>{m.country}</td>
              <td>
                <Button variant="primary" size="sm" onClick={() => handleEditClick(m)} className="me-2">Sửa</Button>
                <Button variant="danger" size="sm" onClick={() => handleDeleteClick(m)}>Xóa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showDeleteModal} onHide={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
        <Modal.Header closeButton><Modal.Title>Xác nhận Xóa Phim</Modal.Title></Modal.Header>
        <Modal.Body>
          Bạn có chắc muốn xóa <strong>{movieToDelete?.title}</strong> (ID: {movieToDelete?.id})?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>Hủy</Button>
          <Button variant="danger" onClick={() => confirmDelete(movieToDelete.id)}>Xác nhận Xóa</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
