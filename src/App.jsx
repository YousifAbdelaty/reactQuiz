import { useEffect, useReducer } from "react";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import Master from "./Master";
import Startscreen from "./Startscreen";
import Question from "./Question";
const initialState = {
  questions: [],
  // 'loading','error','ready','active','finshed'//
  status: "loading",
  index: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    default:
      throw new Error("action unKnown");
  }
}
const App = () => {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);
  const questionsNumber = questions.length;
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
        {status === "active" && <Question />}
        {status === "ready" && (
          <Startscreen questionsNumber={questionsNumber} dispatch={dispatch} />
        )}
      </Master>
    </div>
  );
};
export default App;
