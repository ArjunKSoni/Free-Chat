import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { remove } from '../redux/token';
import { removeUser } from '../redux/user';
import { createchatroom, getallchatroom } from '../API/authapi';

export default function Chatroom() {
    const [token, setToken] = useState(useSelector((state) => state.Token.Token))
    const [user, setUser] = useState(useSelector((state) => state.User.User));
    const [allchatrooms, setAllchatrooms] = useState([])
    const [newChatroom, setNewChatroom] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const createChatroom = async () => {
        if (newChatroom === "") {
            alert("Enter the Chatroom name");
        } else {
            await createchatroom(newChatroom)
            setNewChatroom("");
        }
    }
    const signout = () => {
        Cookies.remove('Token');
        Cookies.remove('User');
        dispatch(remove());
        dispatch(removeUser());
        setToken(null);
        setUser(null);
        navigate("/");
    }
    const allChats = async () => {
        const data = await getallchatroom();
        setAllchatrooms(data);
        setTimeout(() => {
            allChats();
        }, 3000);
    }

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
        else {
            allChats();
        }
        //eslint-disable-next-line
    }, [token, user])
    return (
        <div className="bg-gray-100 h-screen flex flex-col items-center justify-center">
            <div onClick={signout} className=' absolute top-5 right-5 py-2 px-7 hover:bg-orange-500 transition-all bg-red-500 text-xl font-bold text-white rounded-lg hover:cursor-pointer'>Logout</div>
            <div className='mb-2 flex gap-3 flex-wrap items-center justify-center'><h1 className='text-3xl font-extrabold'>Welcome</h1> <h1 className='text-3xl font-extrabold text-yellow-500'>{user}</h1></div>
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Chatroom Dashboard</h2>
                <input type="text"
                    placeholder='Type new chatroom Name'
                    className='text-xl text-center bg-slate-200 rounded-lg font-bold p-3 w-full mb-2'
                    value={newChatroom}
                    onChange={e => setNewChatroom(e.target.value)}
                />
                <div onClick={createChatroom} className='text-xl mb-4 font-bold py-2 px-3 text-center bg-green-500 rounded-lg text-white hover:bg-black hover:text-white transition-all hover:cursor-pointer'>Create new Room</div>
                <div className="mb-4">
                    <label className="block mb-2 text-gray-600 font-medium">Select a Chat Room:</label>
                    <div className='flex flex-col gap-3'>
                        {allchatrooms.map((e, i) => {
                            return (
                                <div key={i} className='flex flex-wrap items-center bg-slate-300 rounded-xl py-2 px-3 justify-between'>
                                    <h1 className='text-xl font-bold'>{e.Name}</h1>
                                    <Link to={"/chatscreen/" + e._id} className='bg-green-500 px-7 py-2 text-white text-xl font-bold rounded-xl hover:bg-black hover:text-white transition-all hover:cursor-pointer'>Join</Link>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
        </div>
    )
}
