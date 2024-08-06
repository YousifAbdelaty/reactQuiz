/* eslint-disable react/prop-types */

const NextButton = ({ dispatch, index, answer, numQuestions }) => {
  if (index < numQuestions - 1)
    return (
      <>
        <button
          disabled={answer[index] == undefined}
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
        {index > 0 && (
          <button
            className="btn btn-ui"
            style={{ marginRight: 3 }}
            onClick={() => dispatch({ type: "previousQuestion" })}
          >
            Previous
          </button>
        )}
      </>
    );
  if (index == numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finished" })}
      >
        finish the Quiz
      </button>
    );
};

export default NextButton;
