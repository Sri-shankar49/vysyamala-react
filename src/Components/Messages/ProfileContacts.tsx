

import React, { useState, useEffect, useCallback } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { NameCard } from './NameCard';

interface Chat {
  room_name_id: string;
  profile_image: string;
  profile_user_name: string;
  last_mesaage: string;
  profile_lastvist: string;
}

interface ProfileContactsProps {
  setSelectedProfile: (profile: {
    room_name_id: string;
    profile_image: string;
    profile_user_name: string;
    profile_lastvist: string;
  }) => void;
}

export const ProfileContacts: React.FC<ProfileContactsProps> = ({ setSelectedProfile }) => {
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const loginuser_profileId = sessionStorage.getItem('loginuser_profile_id');

  // Fetch chat list
  const fetchChatList = useCallback(async () => {
    try {
      const response = await fetch('http://103.214.132.20:8000/auth/Get_user_chatlist/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profile_id: loginuser_profileId,
        }),
      });

      const data = await response.json();
      if (data.status === 1) {
        setChatList(data.data);
      }
    } catch (error) {
      console.error('Error fetching chat list:', error);
    }
  }, [loginuser_profileId]);

  // Fetch search results
  const fetchSearchResults = useCallback(async () => {
    try {
      const response = await fetch('http://103.214.132.20:8000/auth/Get_user_chatlist_search/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profile_id: loginuser_profileId,
          search_id: searchTerm,
        }),
      });

      const data = await response.json();
      if (data.status === 1) {
        setChatList(data.data);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }, [searchTerm, loginuser_profileId]);

  useEffect(() => {
    if (searchTerm === '') {
      fetchChatList();
    } else {
      fetchSearchResults();
    }
  }, [searchTerm, fetchChatList, fetchSearchResults]);

  return (
    <div className="w-1/3 border-footer-text-gray border-r-[1px]">
      <div className="relative border-b-[1px] border-footer-text-gray px-5 py-5">
        <HiOutlineSearch className="absolute top-9 left-7 text-[22px] text-ashSecondary" />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray rounded-md pl-10 py-[15px] focus-visible:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="h-[40rem] overflow-y-auto">
        {chatList.map((chat) => (
          <NameCard
            key={chat.room_name_id}
            profile_image={chat.profile_image}
            profile_user_name={chat.profile_user_name}
            last_mesaage={chat.last_mesaage}
            profile_lastvist={chat.profile_lastvist}
            room_name={chat.room_name_id}
            onClick={() =>
              setSelectedProfile({
                room_name_id: chat.room_name_id,
                profile_image: chat.profile_image,
                profile_user_name: chat.profile_user_name,
                profile_lastvist: chat.profile_lastvist,
              })
            }
          />
        ))}
      </div>
    </div>
  );
};
