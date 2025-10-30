// src/contexts/MovieContext.jsx
import React, { createContext, useReducer, useContext, useEffect, useCallback } from 'react';
import { movieReducer, initialMovieState } from '../reducers/movieReducers';
import movieApi from '../api/movieAPI';

// State & Dispatch contexts dành cho MOVIE (không liên quan Auth)
export const MovieStateContext = createContext(initialMovieState);
export const MovieDispatchContext = createContext(null);

// Hooks
export const useMovieState = () => useContext(MovieStateContext);
export const useMovieDispatch = () => useContext(MovieDispatchContext);

// Provider chính xác phải tên "MovieProvider"
export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialMovieState);

  const fetchMovies = useCallback(async () => {
    dispatch({ type: 'START_LOADING' });
    try {
      const { q, genreFilter, durationRange, sort } = state;
      const params = {};
      if (q) params.q = q;
      if (genreFilter) params.genreId = genreFilter;

      const { data } = await movieApi.get('/movies', { params });

      let list = data.filter(m => {
        const d = Number(m.duration || 0);
        return d >= durationRange[0] && d <= durationRange[1];
      });

      if (sort === 'title_asc') list.sort((a, b) => a.title.localeCompare(b.title));
      if (sort === 'title_desc') list.sort((a, b) => b.title.localeCompare(a.title));

      dispatch({ type: 'SET_MOVIES', payload: list });
    } catch (e) {
      console.error('Lỗi khi tải danh sách phim:', e);
      dispatch({ type: 'SET_MOVIES', payload: [] });
    }
  }, [state.q, state.genreFilter, state.durationRange, state.sort]);

  const fetchGenres = useCallback(async () => {
    try {
      const { data } = await movieApi.get('/genres');
      dispatch({ type: 'SET_GENRES', payload: data });
    } catch (e) {
      console.error('Lỗi khi tải danh sách thể loại:', e);
      dispatch({ type: 'SET_GENRES', payload: [] });
    }
  }, []);

  const confirmDelete = useCallback(async (id) => {
    dispatch({ type: 'CLOSE_DELETE_MODAL' });
    dispatch({ type: 'START_LOADING' });
    try {
      await movieApi.delete(`/movies/${id}`);
      fetchMovies();
    } catch (e) {
      console.error('Lỗi khi xóa phim:', e);
      fetchMovies();
    }
  }, [fetchMovies]);

  const handleCreateOrUpdate = useCallback(async (dataToSend, isEditing, isEditingId) => {
    dispatch({ type: 'START_LOADING' });
    try {
      if (isEditing) {
        await movieApi.put(`/movies/${isEditingId}`, dataToSend);
      } else {
        await movieApi.post('/movies', dataToSend);
      }
      dispatch({ type: 'RESET_FORM' });
      fetchMovies();
      return true;
    } catch (e) {
      console.error('Lỗi thao tác CREATE/UPDATE:', e);
      fetchMovies();
      return false;
    }
  }, [fetchMovies]);

  useEffect(() => { fetchGenres(); }, [fetchGenres]);
  useEffect(() => { fetchMovies(); }, [fetchMovies]);

  return (
    <MovieStateContext.Provider value={state}>
      <MovieDispatchContext.Provider value={{ dispatch, fetchMovies, fetchGenres, confirmDelete, handleCreateOrUpdate }}>
        {children}
      </MovieDispatchContext.Provider>
    </MovieStateContext.Provider>
  );
};
