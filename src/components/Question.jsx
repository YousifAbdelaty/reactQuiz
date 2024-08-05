import Option from "./Option";

/* eslint-disable react/prop-types */
const Question = ({ question, answer, dispatch }) => {
  return (
    <div>
      <h4>{question.question}</h4>
      <Option question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
};

export default Question;
