/* eslint-disable react/prop-types */
const HardLevel = ({ level, dispatch }) => {
  return (
    /* From Uiverse.io by gharsh11032000 */
    <div className="radio-button-container">
      <div className="radio-button">
        <input
          type="radio"
          className="radio-button__input"
          id="radio1"
          name="radio-group"
          value="easy"
          checked={level == "easy"}
          onChange={() => dispatch({ type: "chooseLevel", payload: "easy" })}
        />
        <label className="radio-button__label" htmlFor="radio1">
          <span className="radio-button__custom"></span>
          🐣easy
        </label>
      </div>
      <div className="radio-button">
        <input
          type="radio"
          className="radio-button__input"
          id="radio2"
          name="radio-group"
          value="medium"
          checked={level == "medium"}
          onChange={() => dispatch({ type: "chooseLevel", payload: "medium" })}
        />
        <label className="radio-button__label" htmlFor="radio2">
          <span className="radio-button__custom"></span>
          🪴medium
        </label>
      </div>
      <div className="radio-button">
        <input
          type="radio"
          className="radio-button__input"
          id="radio3"
          name="radio-group"
          value="hard"
          checked={level == "hard"}
          onChange={() => dispatch({ type: "chooseLevel", payload: "hard" })}
        />
        <label className="radio-button__label" htmlFor="radio3">
          <span className="radio-button__custom"></span>
          💪🏼hard
        </label>
      </div>
    </div>
  );
};

export default HardLevel;
