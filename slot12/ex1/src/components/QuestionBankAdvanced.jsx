import React, { useReducer, useEffect, useState } from "react";
import { Button, Card, Container, ProgressBar } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const initialState = {
  questions: [
    { id: 1, question: "Capital of Australia?", options: ["Sydney", "Canberra", "Melbourne"], answer: "Canberra" },
    { id: 2, question: "Red Planet?", options: ["Venus", "Mars", "Jupiter"], answer: "Mars" },
    { id: 3, question: "Largest ocean?", options: ["Atlantic", "Pacific", "Indian"], answer: "Pacific" },
  ],
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
  feedback: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION":
      return { ...state, selectedOption: action.payload };
    case "NEXT_QUESTION":
      const correct =
        state.selectedOption === state.questions[state.currentQuestion].answer;
      return {
        ...state,
        score: correct ? state.score + 1 : state.score,
        feedback: correct ? "✅ Correct!" : `❌ Incorrect! The correct answer is ${state.questions[state.currentQuestion].answer}`,
        currentQuestion: state.currentQuestion + 1,
        selectedOption: "",
        showScore: state.currentQuestion + 1 === state.questions.length,
      };
    case "RESTART":
      return { ...initialState };
    default:
      return state;
  }
}

export default function QuestionBankAdvanced() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [timer, setTimer] = useState(10);
  const [highScore, setHighScore] = useState(
    localStorage.getItem("highScore") || 0
  );

  useEffect(() => {
    if (state.showScore) {
      if (state.score > highScore) {
        localStorage.setItem("highScore", state.score);
        setHighScore(state.score);
      }
      return;
    }

    if (timer === 0) {
      dispatch({ type: "NEXT_QUESTION" });
      setTimer(10);
    }
    const countdown = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(countdown);
  }, [timer, state]);

  const { questions, currentQuestion, showScore, score, feedback } = state;
  const total = questions.length;

  return (
    <Container className="mt-4">
      <Card className="p-4 text-center">
        {showScore ? (
          <>
            <h2>Your Score: {score} / {total}</h2>
            <p>🏆 High Score: {highScore}</p>
            <Button onClick={() => dispatch({ type: "RESTART" })}>
              Restart Quiz
            </Button>
          </>
        ) : (
          <>
            <h4>
              Question {currentQuestion + 1}/{total}
            </h4>
            <p>{questions[currentQuestion].question}</p>
            <ProgressBar
              now={((currentQuestion + 1) / total) * 100}
              className="mb-3"
            />
            <div>
              {questions[currentQuestion].options.map((opt, i) => (
                <Button
                  key={i}
                  className="m-1"
                  variant={
                    state.selectedOption === opt ? "success" : "outline-secondary"
                  }
                  onClick={() => dispatch({ type: "SELECT_OPTION", payload: opt })}
                >
                  {opt}
                </Button>
              ))}
            </div>
            <p className="mt-3">
              Thời gian còn lại:{" "}
              <span style={{ color: timer < 5 ? "red" : "black" }}>
                {timer}s
              </span>
            </p>
            <p>{feedback && (feedback.includes("✅") ? <FaCheckCircle color="green" /> : <FaTimesCircle color="red" />)} {feedback}</p>
            <Button
              className="mt-3"
              disabled={!state.selectedOption}
              onClick={() => {
                dispatch({ type: "NEXT_QUESTION" });
                setTimer(10);
              }}
            >
              {currentQuestion === total - 1 ? "Finish Quiz" : "Next Question"}
            </Button>
          </>
        )}
      </Card>
    </Container>
  );
}
