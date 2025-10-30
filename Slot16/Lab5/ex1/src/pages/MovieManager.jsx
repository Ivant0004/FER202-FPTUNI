import React from 'react';
import { Container } from 'react-bootstrap';
import MovieForm from '../components/MovieForm';
import MovieTable from '../components/MovieTable';
import FilterBar from '../components/FilterBar';

export default function MovieManager() {
  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">🎬 Quản lý Phim (Context + useReducer + Axios)</h1>
      <FilterBar />
      <MovieForm />
      <h2 className="mt-4">Danh sách Phim</h2>
      <MovieTable />
    </Container>
  );
}
