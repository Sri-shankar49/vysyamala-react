import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';
import { toast } from "react-toastify";


interface VysAssistPopupProps {
    closePopup: () => void;
}

export const VysAssistPopup: React.FC<VysAssistPopupProps> = ({ closePopup }) => {
    const [notes, setNotes] = useState<string>('');
    const [selectValue, setSelectValue] = useState<string>('');
    const loginuser_profileId = sessionStorage.getItem('loginuser_profile_id');
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://103.214.132.20:8000/auth/Send_vysassist_request/', {
                profile_id: loginuser_profileId,
                profile_to: id,
                status: 1,
                to_message: selectValue || notes, // send either notes or selectValue
            });

            if (response.data.Status === 0) {
                toast.success(`${response.data.message}`);
            } else {
                toast.error(`${response.data.message}`);
            }

            closePopup(); // Close the popup after "saving"
        } catch (error) {
            console.error("There was an error!", error);
            toast.error('Failed to submit the notes.');
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectValue(event.target.value);
        if (event.target.value) {
            setNotes(''); // Clear notes if a category is selected
        }
    };

    const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(event.target.value);
        if (event.target.value) {
            setSelectValue(''); // Clear category if notes are entered
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-1/3 rounded-lg container mx-auto">
                <div className="rounded-lg">
                    <div className="bg-secondary rounded-t-lg flex justify-between items-center px-3 py-2 mb-2">
                        <h4 className="text-[24px] text-white font-semibold">Vysassist Notes</h4>
                        <IoClose onClick={closePopup} className="text-[22px] text-white cursor-pointer" />
                    </div>

                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="px-3 py-3">
                                {!selectValue && (
                                    <textarea
                                        name="VysassistNotes"
                                        rows={5}
                                        className="w-full bg-gray rounded-lg px-3 py-3 focus:outline-none"
                                        placeholder="Enter your Vysassist notes here"
                                        value={notes}
                                        onChange={handleNotesChange}
                                    />
                                )}
                            </div>

                            <div className="px-3 py-3">
                                {!notes && (
                                    <select
                                        onChange={handleChange}
                                        name="category"
                                        className="w-full px-2 py-2 border-[1px] border-primary rounded-md focus-within:outline-none"
                                        value={selectValue}
                                    >
                                        <option value="" disabled>
                                            Select a category
                                        </option>
                                        <option value="Horoscope matched">Horoscope matched</option>
                                        <option value="Sent the self-profile to Profile B through WhatsApp">Sent the self-profile to Profile B through WhatsApp</option>
                                        <option value="First round of call is completed">First round of call is completed</option>
                                        <option value="No response from the opposite side">No response from the opposite side</option>
                                    </select>
                                )}
                            </div>

                            <div className="flex justify-end items-center space-x-5 mx-3 mb-4">
                                <button
                                    type="button"
                                    onClick={closePopup}
                                    className="text-main flex items-center rounded-lg font-semibold px-5 py-2.5 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-gradient text-white flex items-center rounded-lg font-semibold border-2 px-5 py-2 cursor-pointer"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
