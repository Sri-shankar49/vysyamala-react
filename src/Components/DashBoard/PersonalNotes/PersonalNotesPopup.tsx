import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoClose } from 'react-icons/io5';
import { toast } from 'react-toastify';

interface PersonalNotesPopupProps {
    closePopup: () => void;
    profileId: string; // Profile ID of the current user
    profileTo: string; // Profile ID of the profile to view/edit
}

export const PersonalNotesPopup: React.FC<PersonalNotesPopupProps> = ({closePopup}) => {
    const [notes, setNotes] = useState<string>('');
    const loginuser_profileId = sessionStorage.getItem('loginuser_profile_id');
    const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

    // const handlePersonalNotesPopup = () => {
    //     closePopup(); // Close the popup
    // };
    // Fetch personal notes when the component mounts
    useEffect(() => {
        const fetchPersonalNotes = async () => {
            try {
                const response = await axios.post('http://103.214.132.20:8000/auth/Get_profile_det_match/', {
                    profile_id: loginuser_profileId,
                    user_profile_id: id
                });

                const personalNotes = response.data.basic_details.personal_notes;
                setNotes(personalNotes || ''); // Set notes or default to empty string
            } catch (error) {
                console.error('Error fetching personal notes:', error);
                setNotes(''); // Default to empty string in case of error
            }
        };

        fetchPersonalNotes();
    }, [loginuser_profileId, id]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://103.214.132.20:8000/auth/Save_personal_notes/', {
                profile_id: loginuser_profileId,
                profile_to: id,
                notes: notes,
            });

            if (response.data.Status === 1) {
                toast.success('Your Notes have been saved!');
                closePopup(); // Close the popup after saving
            } else {
                toast.error('Failed to save notes');
            }
        } catch (error) {
            console.error('Error saving notes:', error);
            alert('An error occurred while saving notes');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-1/3 rounded-lg container mx-auto">
                <div className="rounded-lg">
                    <div className="bg-secondary rounded-t-lg flex justify-between items-center px-3 py-2 mb-2">
                        <h4 className="text-[24px] text-white font-semibold">Personal Notes</h4>
                        <IoClose onClick={closePopup} className="text-[22px] text-white cursor-pointer" />
                    </div>

                    <div>
                        {/* Input Field */}
                        <form onSubmit={handleSubmit}>
                            <div className="px-3 py-3">
                                <textarea
                                    name="personalNotes"
                                    rows={5}
                                    className="w-full bg-gray rounded-lg px-3 py-3 focus:outline-none"
                                    placeholder="Enter your personal notes here"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
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
