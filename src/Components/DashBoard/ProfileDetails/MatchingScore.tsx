// // import { useState, ChangeEvent } from "react";
// import React, { useState, useEffect } from 'react';


// interface MatchingScoreProps {
//   scorePercentage?: any;
// }

// const MatchingScore: React.FC<MatchingScoreProps> = ({ scorePercentage }) => {
//   const [score, setScore] = useState<number>(0);
//   {console.log(scorePercentage, "asasas");}

//   const getEmoji = () => {
//     if (score >= 75) return "😊";
//     if (score >= 50) return "🙂";
//     if (score >= 25) return "😐";
//     return "😞";
//   };

//   const getIndicatorColor = () => {
//     if (score >= 75) return "green";
//     if (score >= 50) return "yellow";
//     if (score >= 25) return "orange";
//     return "red";
//   };


//   useEffect(() => {
//     if (scorePercentage) {
//       setScore(scorePercentage);
//     }
//   }, [scorePercentage]); 
  

//   return (
//     <div className="flex flex-col items-center p-4">
//       <div className="relative w-48 h-24 overflow-hidden">
//         <div
//           className="absolute top-0 left-0 w-48 h-48 rounded-full border-4 border-gray"
//           style={{
//             clipPath: "inset(0 0 50% 0)",
//             background: `conic-gradient(${getIndicatorColor()} 360deg, ${getIndicatorColor()} ${score * 1.8
//               }deg, transparent ${score * 1.8}deg, transparent 180deg)`,
//             transform: "rotate(360deg)", // Rotate -90deg to start from the left
//           }}
//         ></div>
//         <div
//           className="absolute top-0 left-0 w-48 h-48 rounded-full border-4 border-gray"
//           style={{ clipPath: "inset(50% 0 0 0)", backgroundColor: "white" }}
//         ></div>
//         <div className="absolute top-0 left-0 w-48 h-24 flex items-center justify-center">
//           <div className="">
//             <span className="text-3xl bg-white rounded-full w-12 h-12 flex justify-center items-center">
//               {getEmoji()}
//             </span>
//           </div>
//         </div>

//         {/* {/ Needle indicator /} */}
//         <div
//           className="absolute bottom-[2px] left-[40%] w-10 h-10 flex justify-center items-center"
//           style={{
//             transform: `rotate(${score * 1.8 - 90}deg)`, // Rotate needle according to score
//             transformOrigin: "50% 100%",
//           }}
//         >
//           <div className="w-[5px] h-10 rounded-lg bg-secondary"></div>
//         </div>

//         {/* {/ Needle semi circle /} */}
//         <div
//           className="absolute bottom-[-20px] left-[40%] w-10 h-10 flex justify-center items-center">
//           <div className="w-4 h-4 rounded-full bg-secondary"></div>
//         </div>

//       </div>

//       {/* {/ Input Style /} */}
//       {/* <div className="mt-4">
//         <input
//           type="number"
//           value={score}
//           onChange={handleChange}
//           className="border border-gray rounded p-2"
//           min="0"
//           max="100"
//         />
//       </div> */}

//       {/* {/ <div className="mt-2 text-lg font-semibold">Matching Score: {score}%</div> /} */}
//       <div className="mt-2 text-lg font-semibold">Matching Score: {scorePercentage}%</div>

//     </div>
//   );
// };

// export default MatchingScore;



// import { useState, ChangeEvent } from "react";
import React, { useState, useEffect } from 'react';


interface MatchingScoreProps {
  scorePercentage?: any;
}

const MatchingScore: React.FC<MatchingScoreProps> = ({ scorePercentage }) => {
  const [score, setScore] = useState<number>(0);
  { console.log(scorePercentage, "asasas"); }

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


  useEffect(() => {
    if (scorePercentage) {
      setScore(scorePercentage);
    }
  }, [scorePercentage]);


  return (
    <div className="relative flex flex-col items-center p-4">
      <div className="relative w-48 h-24 overflow-hidden">

        {/* Color Gradient */}
        <div
          className="absolute top-0 left-0 w-48 h-48 rounded-full border-4 border-gray"
          style={{
            clipPath: "inset(0 0 50% 0)",
            background: `conic-gradient(${getIndicatorColor()} 360deg, ${getIndicatorColor()} ${score * 1.8
              }deg, transparent ${score * 1.8}deg, transparent 180deg)`,
            transform: "rotate(360deg)", // Rotate -90deg to start from the left
            transition: "all 0.5s ease-out"
          }}
        >
        </div>

        {/* Cover Half Bottom */}
        <div
          className="absolute top-0 left-0 w-48 h-48 rounded-full border-4 border-gray"
          style={{ clipPath: "inset(50% 0 0 0)", backgroundColor: "white" }}
        >
        </div>

        {/* Emoji and Score */}
        {/* <div>
          <div className="absolute top-0 left-0 w-48 h-24 flex items-center justify-center">
            <div className="">
              <span className="text-3xl bg-white rounded-full w-12 h-12 flex justify-center items-center">
                {getEmoji()}
              </span>
            </div>
          </div>
        </div> */}


        {/* Needle indicator */}
        {/* <div
          className="absolute top-[-2.2rem] left-[40%] w-10 h-32 flex justify-center items-center z-[1]"
          style={{
            transform: `rotate(${score * 1.8 - 90}deg)`, // Rotate needle according to score
            transformOrigin: "50% 100%",
          }}
        >
          <div className="w-[5px] h-10 rounded-lg bg-secondary"></div>
        </div> */}

        {/* Needle Center Circle */}
        {/* <div
          className="absolute top-[4.5rem] left-[40%] w-10 h-10 flex justify-center items-center">
          <div className="w-4 h-4 rounded-full bg-ash"></div>
        </div> */}

      </div>

      {/* Emoji and Score */}
      <div>
        <div className="bg-ash rounded-full w-40 h-40 top-8 left-0 right-0 mx-auto absolute flex justify-center items-center">

          {/* Needle indicator */}
          <div
            className="absolute top-[-0.8rem] left-[38%] w-10 h-20 flex justify-center items-center"
            style={{
              transform: `rotate(${score * 1.8 - 90}deg)`, // Rotate needle according to score
              transformOrigin: "50% 100%",
            }}
          >
            <div className="w-[5px] h-20 rounded-lg bg-secondary z-10"></div>
          </div>

          {/* Needle Center Circle */}
          <div
            className="absolute top-[3.5rem] left-[40%] w-10 h-10 flex justify-center items-center">
            <div className="w-4 h-4 rounded-full bg-ash"></div>
          </div>

          <div className="w-48 h-40 flex items-center justify-center">
            <div className="drop-shadow-2xl">
              <span className=" text-3xl bg-white drop-shadow-2xl rounded-full w-[7.5rem] h-[7.5rem] flex flex-col gap-2 justify-center items-center">
                {getEmoji()}


                <div className="text-lg text-ash font-semibold z-10">
                  {scorePercentage}%
                </div>
              </span>
            </div>

          </div>

        </div>
      </div>


      {/* {/ Input Style /} */}
      {/* <div className="mt-20">
        <input
          type="number"
          value={score}
          // onChange={handleChange}
          onChange={(e) => setScore(Number(e.target.value))}
          className="border border-gray rounded p-2"
          min="0"
          max="100"
        />
      </div> */}

      {/* Matching Score */}
      {/* {/ <div className="mt-2 text-lg font-semibold">Matching Score: {score}%</div> /} */}
      <div className="mt-24 text-lg font-semibold">Matching Score: {scorePercentage}%</div>

    </div>
  );
};

export default MatchingScore;