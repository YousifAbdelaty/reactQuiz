/* eslint-disable react/prop-types */
const FinishScreen = ({ score, highScore,maxPossibleScore }) => {
  const percentage = 100 * (score / maxPossibleScore);
  return (
    <>
      <p className="result">
        You scored <strong>{score}</strong> out of {maxPossibleScore} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">highscore: {highScore} points</p>
      
    </>
  );
};

export default FinishScreen;
