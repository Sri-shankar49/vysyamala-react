import React, { useState, useEffect, useRef, useCallback } from 'react';
import { IoMdSend } from 'react-icons/io';

interface ProfileChatAreaProps {
    selectedProfile: {
        room_name_id: string | null;
        profile_image: string;
        profile_user_name: string;
        profile_lastvist: string;
    } | null;
}

interface Message {
    username: string;
    message: string;
    date: string;
}

export const ProfileChatArea: React.FC<ProfileChatAreaProps> = ({ selectedProfile }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');
    const ws = useRef<WebSocket | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const messagesEndRef = useRef<HTMLDivElement | null>(null); 

    const roomName = selectedProfile?.room_name_id || '';
    const profile_id = sessionStorage.getItem('loginuser_profile_id') || 'Guest';
    const username = profile_id;

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const fetchChatHistory = useCallback(async () => {
        if (!roomName) return;
    
        try {
            const response = await fetch('http://103.214.132.20:8000/auth/GetMessages/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    room_name: roomName,
                    profile_id: profile_id,
                }),
            });
    
            if (response.ok) {
                const data = await response.json();
                // Make sure to access the "messages" field, and each message has the "value" (message content), "date", and "user".
                const formattedMessages = data.messages.map((msg: any) => ({
                    username: msg.user,         // Assuming "user" holds the sender's username.
                    message: msg.value,         // Assuming "value" holds the actual message.
                    date: msg.date || new Date().toISOString(),
                }));
    
                setMessages(formattedMessages);
            } else {
                console.error('Error fetching chat history:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching chat history:', error);
        } finally {
            setLoading(false);
        }
    }, [roomName, profile_id]);

    useEffect(() => {
        if (selectedProfile) {
            fetchChatHistory();
            scrollToBottom();
        }
    }, [selectedProfile, fetchChatHistory]);

    useEffect(() => {
        if (!roomName) return;

        const websocketUrl = `ws://103.214.132.20:8000/ws/chat/${roomName}/?username=${username}`;
        ws.current = new WebSocket(websocketUrl);

        ws.current.onopen = () => {
            console.log('WebSocket connection opened.');
        };

        ws.current.onmessage = (event) => {
            console.log('WebSocket message received:', event.data);
            const data = JSON.parse(event.data);
            if (data.date == null) {
                data.date = new Date().toISOString(); 
            }
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages, data];
                localStorage.setItem(`messages_${roomName}`, JSON.stringify(updatedMessages));
                return updatedMessages;
            });
            scrollToBottom();
        };

        ws.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.current.onclose = (event) => {
            console.error('WebSocket connection closed:', event);
        };

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [roomName, username]);

    const handleSendMessage = () => {
        if (ws.current && newMessage.trim() !== '') {
            if (ws.current.readyState === WebSocket.OPEN) {
                ws.current.send(JSON.stringify({
                    username,
                    message: newMessage,
                    date: new Date().toISOString(),
                }));
                setNewMessage('');
            } else {
                console.error('WebSocket is not open. Current state:', ws.current.readyState);
            }
        } else {
            console.error('No WebSocket connection or empty message.');
        }
    };

    if (loading) {
        return (
            <div className="w-full flex items-center justify-center">
                <h4 className="text-lg text-gray-500">Loading chat...</h4>
            </div>
        );
    }

    if (!selectedProfile || !selectedProfile.room_name_id) {
        return (
            <div className="w-full flex items-center justify-center">
                <h4 className="text-lg text-gray-500">Select a chat to start messaging</h4>
            </div>
        );
    }

    // const lastMessage = messages[messages.length - 1];

    return (
        <div className="w-full relative">
            {/* Profile Name & Last seen */}
            <div className="border-footer-text-gray border-b-[1px]">
                <div className="flex items-center px-5 py-5 space-x-3">
                    <div>
                        <img
                            src={selectedProfile.profile_image}
                            alt="Profile"
                            className="w-12 h-12 rounded-full"
                        />
                    </div>
                    <div>
                        <h6 className="text-vysyamalaBlack font-bold">
                            {selectedProfile.profile_user_name}
                        </h6>
                        <p className="text-sm text-ashSecondary font-semibold">
                            Last seen: {selectedProfile.profile_lastvist}
                        </p>
                    </div>
                </div>
            </div>

            {/* Last Chat Message */}
            

            {/* Chat Area */}
            <div className="h-[35rem] overflow-y-auto px-5 py-3">
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.username === username ? 'justify-end' : 'justify-start'}`}>
                            <div className={`rounded-lg p-2 mb-3 ${msg.username === username ? 'bg-blue-950 text-white' : 'bg-gray-200 text-black'}`}>
                                <p>{msg.message}</p>
                                <div className="text-xs">
                                    {new Date(msg.date).toLocaleString('en-IN', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                        hour12: true,
                                        timeZone: 'Asia/Kolkata',
                                    })}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No messages yet.</p>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input Area */}
            <div className="w-full bottom-0">
                <div className="relative mx-5 my-5">
                    <input
                        type="text"
                        placeholder="Type a message"
                        className="w-full bg-chatGray rounded-lg px-3 py-4 focus-visible:outline-none"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <IoMdSend
                        className="text-[26px] text-primary absolute right-3 top-[20px] cursor-pointer"
                        onClick={handleSendMessage}
                    />
                </div>
            </div>
        </div>
    );
};
