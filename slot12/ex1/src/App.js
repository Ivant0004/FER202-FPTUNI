// App.js
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CounterComponent from "./components/CounterComponent";
import ToggleComponent from "./components/ToggleComponent";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import QuestionBank from "./components/QuestionBank";
import QuestionBankAdvanced from "./components/QuestionBankAdvanced";
import { Button, Container } from "react-bootstrap";

function App() {
  const [exercise, setExercise] = useState(1);

  const renderExercise = () => {
    switch (exercise) {
      case 1: return <CounterComponent />;
      case 2: return <ToggleComponent />;
      case 3: return <LoginForm />;
      case 4: return <SignUpForm />;
      case 5: return <QuestionBank />;
      case 6: return <QuestionBankAdvanced />;
      default: return <CounterComponent />;
    }
  };

  return (
    <Container className="mt-3">
      <h2 className="text-center text-primary">🧠 useReducer Exercises</h2>

      <div className="d-flex justify-content-center flex-wrap gap-2 my-3">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <Button
            key={num}
            variant={exercise === num ? "primary" : "outline-primary"}
            onClick={() => setExercise(num)}
          >
            Exercise {num}
          </Button>
        ))}
      </div>

      {renderExercise()}
    </Container>
  );
}

export default App;
