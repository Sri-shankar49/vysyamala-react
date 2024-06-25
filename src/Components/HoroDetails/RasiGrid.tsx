import React from 'react';

const RasiGrid = () => {
    const labels = [
        'Raghu/Rahu', 'Mars/Chevai', 'Jupiter/Guru', 'Mercury/Budhan',
        'Saturn/Sani', 'Lagnam', 'Sun/Suriyan', 'Venus/Sukran',
        'Moon/Chandran', 'Kethu/Ketu'
    ];

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="flex space-x-10">
                {/* Labels */}
                <div className="flex flex-col space-y-2">
                    {labels.map((label, index) => (
                        <div key={index} className="bg-yellow-200 p-2 rounded text-center">
                            {label}
                        </div>
                    ))}
                </div>
                {/* Rasi Grid */}
                <div className="grid grid-cols-3 gap-2">
                    {/* Top Row */}
                    <div className="col-span-3 grid grid-cols-3 gap-2">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="w-24 h-24 border"></div>
                        ))}
                    </div>
                    {/* Middle Row */}
                    <div className="col-span-3 grid grid-cols-3 gap-2">
                        <div className="w-24 h-24 border"></div>
                        <div className="w-24 h-24 flex justify-center items-center bg-gray-300 text-center">
                            Rasi
                        </div>
                        <div className="w-24 h-24 border"></div>
                    </div>
                    {/* Bottom Row */}
                    <div className="col-span-3 grid grid-cols-3 gap-2">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="w-24 h-24 border"></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RasiGrid;
