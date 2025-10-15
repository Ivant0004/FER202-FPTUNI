import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from './components/CounterComponent';
import LightSwitch from './components/LightSwitch';
import LoginForm from './components/LoginForm';
import LoginForm2 from './components/LoginForm2';
import SearchItem from './components/SearchItem';
import SearchAccount from './components/SearchAccount';
import RegisterForm from './components/RegisterForm';

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', margin: 20 }}>React useState Exercises</h1>
      <CounterComponent />
      <hr />
      <LightSwitch />
      <hr />
      <LoginForm />
      <hr />
      <LoginForm2 />
      <hr />
      <SearchItem />
      <hr />
      <SearchAccount />
      <hr />
      <RegisterForm />
      <hr />
    </div>
  );
}

export default App;
