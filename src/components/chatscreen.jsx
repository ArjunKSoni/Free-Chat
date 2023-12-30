import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { getallmesages } from '../API/authapi';

export default function Chatscreen() {
    const navigate = useNavigate();
    const { id } = useParams();
    const user = useSelector((state) => state.User.User);
    const [socket, setSocket] = useState(null);
    const token = useSelector((state) => state.Token.Token);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesContainerRef = useRef(null);

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;
        if (socket) {
            socket.emit('sendMessage', { id, message: newMessage });
        }
        // setMessages(prevMessages => [...prevMessages, { user: user, message: newMessage }]);
        // AllMessages();
        setNewMessage('');
    };

    const AllMessages = async () => {
        const data = await getallmesages(id);
        setMessages(data);
        scrollToBottom();
    }

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    const connectSocket = () => {
        if (token && !socket) {
            const newSocket = io('https://free-chat-backend.vercel.app', {
                query: {
                    token: token,
                    user: user,
                },
            });

            newSocket.on('disconnect', () => {
                setSocket(null);
                setTimeout(() => {
                    connectSocket();
                }, 3000);
            });

            newSocket.on('connect', () => {
                newSocket.emit('joinRoom', { id });
            });
            setSocket(newSocket);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
        connectSocket();
        if (socket) {
            socket.on('newMessage', ({ user, message }) => {
                setMessages(prevMessages => [...prevMessages, { user: user, message: message }]);
                // AllMessages()
                scrollToBottom();
            });
        }
        return () => {
            if (socket) {
                socket.emit('leaveRoom', { id });
                socket.disconnect();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token,id,socket]);

    useEffect(() => {
        AllMessages()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        scrollToBottom();
    }, [messages])

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="w-full max-w-md p-4 md:h-fit h-full flex-shrink-0 bg-white rounded shadow-md">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Chat Room</h2>
                <div className=" md:h-60 h-5/6 border p-4 mb-4 overflow-y-auto" ref={messagesContainerRef}>
                    {messages.map((msg, index) => {
                        if (msg.user !== user) return (
                            <div key={index} className="mb-2">
                                <strong className='text-red-500'>{msg.user}:</strong> {msg.message}
                            </div>
                        )
                        return (
                            <div key={index} className="mb-2 text-right">
                                {msg.message} <strong className='text-green-500'> :{msg.user}</strong>
                            </div>
                        )
                    })}
                </div>
                <div className="flex">
                    <input
                        type="text"
                        className="w-full p-2 border mr-2"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button
                        type="button"
                        className="bg-blue-500 text-white p-2 rounded"
                        onClick={handleSendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}
