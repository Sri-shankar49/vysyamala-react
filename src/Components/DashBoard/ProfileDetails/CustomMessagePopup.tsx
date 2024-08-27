import React, { useState } from "react";
interface CustomMessagePopupProps {
    setOpenCustomMsgShow: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenCustomMsg: (value: string) => void;
}

const CustomMessagePopup: React.FC<CustomMessagePopupProps> = ({
    setOpenCustomMsgShow,
    setOpenCustomMsg,
}) => {
    const [message, setMessage] = useState<string>("");

    const handleSend = () => {
        setOpenCustomMsg(message);
        console.log("Message sent:", message);
        setOpenCustomMsgShow(false);
    };

    const handleCancel = () => {
        setOpenCustomMsgShow(false);
    };

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-lg font-bold mb-4">Enter your message</h2>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        rows={4}
                        placeholder="Type your message here..."
                    />
                    <div className="flex justify-end space-x-4">
                        <button
                            onClick={handleCancel}
                            className="px-4 py-2 bg-red-500 text-white rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSend}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomMessagePopup;
