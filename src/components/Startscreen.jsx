/* eslint-disable react/no-unescaped-entities */

import HardLevel from "./HardLevel";

/* eslint-disable react/prop-types */
const Startscreen = ({ questionsNumber, dispatch, level }) => {
  return (
    <div className="start">
      <h2>Welcome to react Quiz !</h2>
      <h3>{questionsNumber} Questions to test your React mastery</h3>
      <HardLevel dispatch={dispatch} level={level} />
      <button
        disabled={level == null}
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
};

export default Startscreen;
