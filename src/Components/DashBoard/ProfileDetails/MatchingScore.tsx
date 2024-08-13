import { useState, ChangeEvent } from 'react';

const MatchingScore = () => {
    const [score, setScore] = useState(75);

    const getEmoji = () => {
        if (score >= 75) return '😊';
        if (score >= 50) return '🙂';
        if (score >= 25) return '😐';
        return '😞';
    };

    const getIndicatorColor = () => {
        if (score >= 75) return 'bg-green-500';
        if (score >= 50) return 'bg-yellow-500';
        if (score >= 25) return 'bg-orange-500';
        return 'bg-red-500';
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newScore = parseInt(e.target.value, 10);
        if (!isNaN(newScore)) {
            setScore(newScore);
        }
    };

    return (
        <div className="flex flex-col items-center p-4">
            <div className="relative w-48 h-48 flex items-center justify-center">
                <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-gray-200"></div>
                <div
                    className={`absolute top-0 left-0 w-full h-full rounded-full transform origin-center
                         ${getIndicatorColor()}`}
                // style={{ clipPath: `polygon(50% 50%, 50% 0, ${50 + 50 * Math.cos((score / 100) * 2 * Math.PI - Math.PI / 2)}% ${50 + 50 * Math.sin((score / 100) * 2 * Math.PI - Math.PI / 2)}%, 50% 50%)` }}
                ></div>
                <div className="relative w-36 h-36 bg-white rounded-full flex items-center justify-center">
                    <span className="text-3xl">{getEmoji()}</span>
                </div>
            </div>
            <div className="mt-4">
                <input
                    type="number"
                    value={score}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2"
                    min="0"
                    max="100"
                />
            </div>
            <div className="mt-2 text-lg font-semibold">Matching Score: {score}%</div>
        </div>
    );
};

export default MatchingScore;
