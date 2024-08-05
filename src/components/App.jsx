/* eslint-disable no-case-declarations */
import { useEffect, useReducer } from "react";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import Master from "./Master";
import Startscreen from "./Startscreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
const initialState = {
  questions: [],
  // 'loading','error','ready','active','finshed'//
  status: "loading",
  index: 0,
  answer: null,
  score: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const currentQuestion = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        score:
          action.payload === currentQuestion.correctOption
            ? state.score + currentQuestion.points
            : state.score,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    default:
      throw new Error("action unKnown");
  }
}
const App = () => {
  const [{ questions, answer, index, status, score }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const questionsNumber = questions.length;
  const maxPossibleScore = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch {
        dispatch({ type: "dataFailed" });
      }
    };
    fetchData();
  }, []);
  return (
    <div className="app">
      <Header />
      <Master>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "active" && (
          <>
            <Progress
              index={index}
              score={score}
              maxPossibleScore={maxPossibleScore}
              numQuestions={questionsNumber}
              answer={answer}
            />
            <Question
              dispatch={dispatch}
              answer={answer}
              question={questions[index]}
            />
            <NextButton dispatch={dispatch} answer={answer} />
          </>
        )}
        {status === "ready" && (
          <Startscreen questionsNumber={questionsNumber} dispatch={dispatch} />
        )}
      </Master>
    </div>
  );
};
export default App;
