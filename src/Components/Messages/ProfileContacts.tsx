import React from 'react'
import { HiOutlineSearch } from "react-icons/hi";
import { NameCard } from './ProfileContacts/NameCard';

export const ProfileContacts = () => {
    return (
        <div className="w-1/3 border-footer-text-gray border-r-[1px]">
            <div className="relative border-b-[1px] border-footer-text-gray px-5 py-5">
                <HiOutlineSearch className="absolute top-9 left-7 text-[22px] text-ashSecondary" />
                <input type="text" placeholder="Search" className="w-full bg-gray rounded-md pl-10 py-[15px] focus-visible:outline-none" />
            </div>

            <div className="h-[40rem] overflow-y-auto">
                <NameCard />
                <NameCard />
                <NameCard />
                <NameCard />
                <NameCard />
                <NameCard />
                <NameCard />
                <NameCard />
            </div>
        </div>
    )
}
