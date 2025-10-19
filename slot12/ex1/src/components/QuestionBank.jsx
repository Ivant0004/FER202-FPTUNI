import React, { useReducer } from "react";
import { Button, Container, Card } from "react-bootstrap";

// 🌱 Bước 1: Trạng thái ban đầu
const initialState = {
  questions: [
    {
      id: 1,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Canberra", "Melbourne", "Perth"],
      answer: "Canberra",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      id: 3,
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
      answer: "Pacific Ocean",
    },
  ],
  currentQuestion: 0,   // Theo dõi câu hiện tại
  selectedOption: "",   // Đáp án đã chọn
  score: 0,             // Điểm hiện tại
  showScore: false,     // Hiển thị điểm khi kết thúc
};

// ⚙️ Bước 2: Hàm reducer quản lý trạng thái
function quizReducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION":
      return { ...state, selectedOption: action.payload };

    case "NEXT_QUESTION":
      // Kiểm tra đáp án đúng hay không
      const isCorrect =
        state.selectedOption === state.questions[state.currentQuestion].answer;

      return {
        ...state,
        score: isCorrect ? state.score + 1 : state.score,
        currentQuestion: state.currentQuestion + 1,
        selectedOption: "",
        showScore: state.currentQuestion + 1 === state.questions.length, // Hết câu → hiển thị điểm
      };

    case "RESTART_QUIZ":
      return {
        ...initialState, // Reset quiz
      };

    default:
      return state;
  }
}

// 🧠 Bước 3: Component chính
export default function QuestionBank() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { questions, currentQuestion, selectedOption, score, showScore } = state;

  // Khi người dùng chọn đáp án
  const handleOptionSelect = (option) => {
    dispatch({ type: "SELECT_OPTION", payload: option });
  };

  // Khi bấm Next / Finish
  const handleNextQuestion = () => {
    dispatch({ type: "NEXT_QUESTION" });
  };

  // Khi restart lại quiz
  const handleRestartQuiz = () => {
    dispatch({ type: "RESTART_QUIZ" });
  };

  // 🧾 Hiển thị giao diện
  return (
    <Container className="mt-4">
      <Card className="p-4">
        {showScore ? (
          // Nếu đã hoàn thành tất cả câu hỏi
          <div className="text-center">
            <h2>Your Score: {score} / {questions.length}</h2>
            <Button variant="primary" onClick={handleRestartQuiz}>
              Restart Quiz
            </Button>
          </div>
        ) : (
          // Nếu đang làm bài
          <div>
            <h4>
              Question {questions[currentQuestion].id}: <br />
              {questions[currentQuestion].question}
            </h4>

            <div className="mt-3">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant={
                    selectedOption === option ? "success" : "outline-secondary"
                  }
                  className="m-2"
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </Button>
              ))}
            </div>

            <Button
              variant="primary"
              className="mt-3"
              disabled={!selectedOption}
              onClick={handleNextQuestion}
            >
              {currentQuestion === questions.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </Button>
          </div>
        )}
      </Card>
    </Container>
  );
}
