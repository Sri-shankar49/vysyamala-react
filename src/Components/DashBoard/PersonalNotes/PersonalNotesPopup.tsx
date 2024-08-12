import React from 'react'
import { IoClose } from 'react-icons/io5'

interface PersonalNotesPopupProps {
    closePopup: () => void;
}

export const PersonalNotesPopup: React.FC<PersonalNotesPopupProps> = ({ closePopup }) => {

    const handlePersonalNotesPopup = () => {
        closePopup(); // Close the popup
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-1/3 rounded-lg container mx-auto">
                <div className="rounded-lg ">
                    <div className="bg-secondary rounded-t-lg flex justify-between items-center px-3 py-2 mb-2">
                        <h4 className="text-[24px] text-white font-semibold">Personal Notes</h4>
                        <IoClose onClick={handlePersonalNotesPopup} className="text-[22px] text-white cursor-pointer" />
                    </div>

                    <div>
                        {/* Input Field  */}
                        <div>
                            <form action="" method="post">
                                <div className="px-3 py-3">
                                    {/* <input type="text" id="" name="peronal notes" placeholder="Enter your personal notes here" className="w-full" /> */}
                                    <textarea name="" id="" rows={5} className="w-full bg-gray rounded-lg px-3 py-3 focus:outline-none">
                                        Enter your personal notes here
                                    </textarea>
                                </div>

                                <div className="flex justify-end items-center space-x-5 mx-3 mb-4">
                                    <button type="button"
                                        className="text-main flex items-center rounded-lg font-semibold px-5 py-2.5 cursor-pointer">Cancel</button>
                                    <button type="submit"
                                        className="bg-gradient text-white flex items-center rounded-lg font-semibold border-2 px-5 py-2 cursor-pointer">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
