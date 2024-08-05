/* eslint-disable react/prop-types */

const Option = ({ question, dispatch, answer }) => {
  return (
    <div className="options">
      {question.options.map((option, index) => {
        return (
          <button
            key={option}
            disabled={answer != null}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              answer != null
                ? index === question.correctOption
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
