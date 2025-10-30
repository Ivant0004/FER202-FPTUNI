export const initialMovieState = {
  movies: [],
  genres: [],
  loading: false,
  isEditing: null,
  currentMovie: { avatar: '', title: '', description: '', genreId: '', duration: '', year: '', country: '' },
  showEditModal: false,
  showDeleteModal: false,
  movieToDelete: null,
  // filter/sort
  q: '',
  genreFilter: '',
  durationRange: [0, 600],
  sort: 'title_asc'
};

export const movieReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return { ...state, movies: action.payload, loading: false };
    case 'SET_GENRES':
      return { ...state, genres: action.payload };
    case 'START_LOADING':
      return { ...state, loading: true };
    case 'UPDATE_FIELD':
      return { ...state, currentMovie: { ...state.currentMovie, [action.payload.name]: action.payload.value } };
    case 'OPEN_EDIT_MODAL':
      return { ...state, currentMovie: action.payload, isEditing: action.payload.id, showEditModal: true };
    case 'CLOSE_EDIT_MODAL':
      return { ...state, currentMovie: initialMovieState.currentMovie, isEditing: null, showEditModal: false };
    case 'OPEN_DELETE_MODAL':
      return { ...state, movieToDelete: action.payload, showDeleteModal: true };
    case 'CLOSE_DELETE_MODAL':
      return { ...state, movieToDelete: null, showDeleteModal: false };
    case 'RESET_FORM':
      return { ...state, currentMovie: initialMovieState.currentMovie, isEditing: null, showEditModal: false };
    // filter/sort
    case 'SET_QUERY':
      return { ...state, q: action.payload };
    case 'SET_GENRE_FILTER':
      return { ...state, genreFilter: action.payload };
    case 'SET_DURATION_RANGE':
      return { ...state, durationRange: action.payload };
    case 'SET_SORT':
      return { ...state, sort: action.payload };
    default:
      return state;
  }
};
