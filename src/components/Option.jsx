/* eslint-disable react/prop-types */

const Option = ({ question, dispatch, index, answer }) => {
  return (
    <div className="options">
      {question.options.map((option, i) => {
        return (
          <button
            key={option}
            disabled={answer[index] != undefined}
            onClick={() => dispatch({ type: "newAnswer", payload: i })}
            className={`btn btn-option ${answer[index] == i ? "answer" : ""} ${
              answer.length - index >= 1
                ? i === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default Option;
