/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
const Startscreen = ({ questionsNumber, dispatch }) => {
  return (
    <div className="start">
      <h2>Welcome to react Quiz !</h2>
      <h3>{questionsNumber} Questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start " })}
      >
        Let's start
      </button>
    </div>
  );
};

export default Startscreen;
