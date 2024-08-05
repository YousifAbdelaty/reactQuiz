/* eslint-disable react/prop-types */
const Progress = ({ index, answer, score, maxPossibleScore, numQuestions }) => {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer != null)} />

      <p>
        Questions <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{score}</strong> / {maxPossibleScore}
      </p>
    </header>
  );
};

export default Progress;
