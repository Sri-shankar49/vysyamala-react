import { useState, ChangeEvent } from "react";

const MatchingScore = () => {
  const [score, setScore] = useState(75);

  const getEmoji = () => {
    if (score >= 75) return "😊";
    if (score >= 50) return "🙂";
    if (score >= 25) return "😐";
    return "😞";
  };

  const getIndicatorColor = () => {
    if (score >= 75) return "green";
    if (score >= 50) return "yellow";
    if (score >= 25) return "orange";
    return "red";
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newScore = parseInt(e.target.value, 10);
    if (!isNaN(newScore)) {
      setScore(newScore);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="relative w-48 h-24 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-48 h-48 rounded-full border-4 border-gray"
          style={{
            clipPath: "inset(0 0 50% 0)",
            background: `conic-gradient(${getIndicatorColor()} 360deg, ${getIndicatorColor()} ${
              score * 1.8
            }deg, transparent ${score * 1.8}deg, transparent 180deg)`,
            transform: "rotate(360deg)", // Rotate -90deg to start from the left
          }}
        ></div>
        <div
          className="absolute top-0 left-0 w-48 h-48 rounded-full border-4 border-gray"
          style={{ clipPath: "inset(50% 0 0 0)", backgroundColor: "white" }}
        ></div>
        <div className="absolute top-0 left-0 w-48 h-24 flex items-center justify-center">
          <div className="">
            <span className="text-3xl bg-white rounded-full w-12 h-12 flex justify-center items-center">
              {getEmoji()}
            </span>
          </div>
        </div>
        {/* Needle indicator */}
        <div
          className="absolute bottom-[-2px] left-[40%] w-10 h-10 flex justify-center items-center"
          style={{
            transform: `rotate(${score * 1.8 - 90}deg)`, // Rotate needle according to score
            transformOrigin: "50% 100%",
          }}
        >
          <div className="w-[5px] h-10 rounded-lg bg-secondary"></div>
        </div>
      </div>
      <div className="mt-4">
        <input
          type="number"
          value={score}
          onChange={handleChange}
          className="border border-gray rounded p-2"
          min="0"
          max="100"
        />
      </div>
      <div className="mt-2 text-lg font-semibold">Matching Score: {score}%</div>
    </div>
  );
};

export default MatchingScore;
