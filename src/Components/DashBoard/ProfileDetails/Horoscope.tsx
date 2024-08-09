import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { MdModeEdit } from 'react-icons/md';
import RasiGrid from '../../HoroDetails/RasiGrid';
import AmsamGrid from '../../HoroDetails/AmsamGrid';
import { useNavigate } from 'react-router-dom';

export const Horoscope = () => {
    const [data, setData] = useState({
        tamilYear: '',
        tamilMonth: '',
        tamilDay: '',
        teluguYear: '',
        teluguMonth: '',
        teluguDay: '',
        rasi: '',
        starPadham: '',
        lagnam: '',
        nallikai: '',
        didi: '',
        suyaGothram: '',
        madhulam: '',
        dasa: '',
        dasaBalance: '',
        chevaiDosham: '',
        sarpaDosham: '',
    });

    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://103.214.132.20:8000/auth/Get_save_details/', {
                    page_id: '5',
                    profile_id: 'VY240065'
                });
                const fetchedData = response.data.data;
                sessionStorage.setItem('formattedDatarasi',fetchedData.rasi_kattam );
                sessionStorage.setItem('formattedDatamsam',fetchedData.amsa_kattam);


                setData({
                    tamilYear: fetchedData.time_of_birth || 'Not available',
                    tamilMonth: fetchedData.place_of_birth || 'Not available',
                    tamilDay: fetchedData.birthstar_name || 'Not available',
                    teluguYear: fetchedData.birth_rasi_name || 'Not available',
                    teluguMonth: fetchedData.lagnam_didi || 'Not available',
                    teluguDay: fetchedData.nalikai || 'Not available',
                    rasi: fetchedData.rasi_kattam || 'Not available',
                    starPadham: fetchedData.amsa_kattam || 'Not available',
                    lagnam: fetchedData.lagnam_didi || 'Not available',
                    nallikai: fetchedData.nalikai || 'Not available',
                    didi: fetchedData.dasa_name || 'Not available',
                    suyaGothram: fetchedData.ragu_dosham || 'Not available',
                    madhulam: fetchedData.ragu_dosham || 'Not available',
                    dasa: fetchedData.dasa_name || 'Not available',
                    dasaBalance: fetchedData.dasa_balance || 'Not available',
                    chevaiDosham: fetchedData.chevvai_dosaham || 'Not available',
                    sarpaDosham: fetchedData.ragu_dosham || 'Not available',
                });
            } catch (error) {
                console.error('Error fetching horoscope data:', error);
            }
        };

        fetchData();
    }, []);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://103.214.132.20:8000/auth/Horoscope_registration/', {
                profile_id: "VY240065",
                time_of_birth: data.tamilYear,
                place_of_birth: data.tamilMonth,
                birthstar_name: data.tamilDay,
                birth_rasi_name: data.teluguYear,
                lagnam_didi: data.teluguMonth,
                nalikai: data.teluguDay,
                rasi_kattam: data.rasi,
                amsa_kattam: data.starPadham,
                lagnam_didi: data.lagnam,
                nalikai: data.nallikai,
                dasa_name: data.didi,
                dasa_balance: data.dasaBalance,
                ragu_dosham: data.suyaGothram,
                ragu_dosham: data.madhulam,
                dasa_name: data.dasa,
                dasa_balance: data.dasaBalance,
                chevvai_dosaham: data.chevaiDosham,
                ragu_dosham: data.sarpaDosham
            });
            console.log('Horoscope details updated:', response.data);
            setIsEditing(false);
            navigate('/desired-route'); // Redirect after successful update
        } catch (error) {
            console.error('Error submitting horoscope details:', error);
        }
    };



    return (
        <div>
            <h2 className="flex items-center text-[30px] text-vysyamalaBlack font-bold mb-5">
                Horoscope Details
                <MdModeEdit className="text-2xl text-main ml-2 cursor-pointer" onClick={handleEditClick} />
            </h2>

            {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(data).map(([key, value]) => (
                            <div key={key}>
                                <label className="block text-sm font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                                <input
                                    type="text"
                                    name={key}
                                    value={value}
                                    onChange={handleChange}
                                    className="border rounded px-3 py-2 w-full"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end space-x-4 mt-4">
                        <button
                            type="button"
                            onClick={handleEditClick}
                            className="text-main flex items-center rounded-lg font-semibold px-5 py-2.5 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-white text-main flex items-center rounded-lg font-semibold border-2 px-5 py-2.5 cursor-pointer"
                        >
                            Update Changes
                        </button>
                    </div>
                </form>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(data).map(([key, value]) => (
                        <div key={key}>
                            <h5 className="text-[20px] text-ash font-semibold mb-2">
                                {key.replace(/([A-Z])/g, ' $1')} :
                                <span className="font-normal"> {value}</span>
                            </h5>
                        </div>
                    ))}
                </div>
            )}

            <div className="space-y-10 my-10">
                <div>
                    <RasiGrid centerLabel={"Rasi"} />
                </div>
                <div>
                    <AmsamGrid centerLabel={"Amsam"} />
                </div>
            </div>
        </div>
    );
};
