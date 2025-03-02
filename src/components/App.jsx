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
import FinishScreen from "./FinishScreen";
import RestartButton from "./RestartButton";
import Footer from "./Footer";
import Timer from "./Timer";
const SEC_PER_Q = 30;
let REFRENCE_DATA;
const initialState = {
  questions: [],
  // 'loading','error','ready','active','finshed'//
  status: "loading",
  index: 0,
  answer: [],
  score: 0,
  highScore: 0,
  level: null,
  secondsRemaining: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      REFRENCE_DATA = action.payload;
      return { ...state, questions: action.payload, status: "ready" };
    case "tick":
      return {
        ...state,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
        secondsRemaining: state.secondsRemaining - 1,
      };
    case "chooseLevel":
      const questionsAfterLevelChosen = REFRENCE_DATA.filter(
        (q) => q.level == action.payload
      );

      return {
        ...state,
        questions: questionsAfterLevelChosen,
        level: action.payload,
      };

    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SEC_PER_Q,
      };
    case "newAnswer":
      const currentQuestion = state.questions[state.index];
      return {
        ...state,
        answer: [...state.answer, action.payload],
        score:
          action.payload === currentQuestion.correctOption
            ? state.score + currentQuestion.points
            : state.score,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1 };
    case "previousQuestion":
      return { ...state, index: state.index - 1 };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
        highScore: state.highScore,
      };

    case "finished":
      return {
        ...state,
        status: "finished",
        highScore:
          state.score > state.highScore ? state.score : state.highScore,
      };

    default:
      throw new Error("action unKnown");
  }
}
const App = () => {
  const [
    {
      questions,
      secondsRemaining,
      level,
      highScore,
      answer,
      index,
      status,
      score,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
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
        {status === "finished" && (
          <>
            <FinishScreen
              score={score}
              highScore={highScore}
              maxPossibleScore={maxPossibleScore}
            />
            <RestartButton dispatch={dispatch} />
          </>
        )}
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
              index={index}
            />

            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                index={index}
                numQuestions={questionsNumber}
                answer={answer}
              />
            </Footer>
          </>
        )}
        {status === "ready" && (
          <Startscreen
            questionsNumber={questionsNumber}
            level={level}
            dispatch={dispatch}
          />
        )}
      </Master>
    </div>
  );
};
export default App;
