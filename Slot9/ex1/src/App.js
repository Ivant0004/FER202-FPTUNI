// src/App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import FooterPage from './pages/FooterPage';

export default function App() {
  return (
    <div className="App">
      <HomePage />
      <FooterPage />
    </div>
  );
}
