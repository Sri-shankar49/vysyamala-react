import React from 'react'
import ProfileChatImg from "../../assets/images/ProfileChatImg.png"
import { IoMdSend } from "react-icons/io";

export const ProfileChatArea = () => {
    return (
        <div className="w-full relative">

            {/* Profile Name & Last seen */}
            <div className=" border-footer-text-gray border-b-[1px]">
                <div className="flex items-center px-5 py-5 space-x-3">
                    <div>
                        <img src={ProfileChatImg} alt="Profile-image" className="w-full" />
                    </div>
                    <div>
                        <h6 className="text-vysyamalaBlack font-bold">Harini</h6>
                        <p className="text-sm text-ashSecondary font-semibold">Last online 10 days ago</p>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="h-[35rem] overflow-y-auto ">

                {/* Incoming Message */}
                <div className="flex items-center justify-start mx-5 my-5">
                    <div className="w-1/2 bg-chatGray rounded-xl rounded-tl-none py-2 px-3">
                        <p>I am interested in your profile. If you are interested in my profile, please contact me...</p>
                        <p className="text-end text-xs text-primary">02:03 PM</p>
                    </div>
                </div>

                {/* Outgoing Message */}
                <div className="flex items-center justify-end mx-5 my-5">
                    <div className="w-1/2 bg-chatBlue rounded-xl rounded-tr-none py-2 px-3">
                        <p className="text-white">That's perfect. There's a new place on Main St I've been wanting to check out. I hear their hawaiian pizza is off the hook!</p>
                        <p className="text-end text-xs text-white text-primary">02:03 PM</p>
                    </div>
                </div>

                {/* Incoming Message */}
                <div className="flex items-center justify-start mx-5 my-5">
                    <div className="w-1/2 bg-chatGray rounded-xl rounded-tl-none py-2 px-3">
                        <p>I don't know why people are so anti pineapple pizza. I kind of like it.</p>
                        <p className="text-end text-xs text-primary">02:03 PM</p>
                    </div>
                </div>

                {/* Outgoing Message */}
                <div className="flex items-center justify-end mx-5 my-5">
                    <div className="w-1/2 bg-chatBlue rounded-xl rounded-tr-none py-2 px-3">
                        <p className="text-white">Let's get lunch. How about pizza?Let's get lunch. How about pizza?</p>
                        <p className="text-end text-xs text-white">02:03 PM</p>
                    </div>
                </div>

                {/* Incoming Message */}
                <div className="flex items-center justify-start mx-5 my-5">
                    <div className="w-1/2 bg-chatGray rounded-xl rounded-tl-none py-2 px-3">
                        <p>I am interested in your profile. If you are interested in my profile, please contact me...</p>
                        <p className="text-end text-xs text-primary">02:03 PM</p>
                    </div>
                </div>

                {/* Outgoing Message */}
                <div className="flex items-center justify-end mx-5 my-5">
                    <div className="w-1/2 bg-chatBlue rounded-xl rounded-tr-none py-2 px-3">
                        <p className="text-white">That's perfect. There's a new place on Main St I've been wanting to check out. I hear their hawaiian pizza is off the hook!</p>
                        <p className="text-end text-xs text-white">02:03 PM</p>
                    </div>
                </div>

            </div>

            {/* Message Input Area */}
            <div className="w-full  bottom-0">
                <div className="relative mx-5 my-5">
                    <input type="text"
                        placeholder="Type a message"
                        className="w-full bg-chatGray rounded-lg px-3 py-4 focus-visible:outline-none" />

                    {/* Send Icon */}
                    <IoMdSend className="text-[22px] text-footer-gray absolute right-3 top-4 cursor-pointer" />
                </div>
            </div>
        </div>
    )
}
