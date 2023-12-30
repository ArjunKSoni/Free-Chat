import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { add } from '../redux/token';
import { signup } from '../API/authapi';
import Cookies from 'js-cookie';
import { addUser } from '../redux/user';

export default function Home() {
    const [user,setUser]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const token = useSelector((state) => state.Token.Token)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addToken=(token,user)=>{
        dispatch(add(token));
        dispatch(addUser(user));
    }
    useEffect(() => {
        const savedData1 = Cookies.get('Token');
        const savedData2 = Cookies.get('User');
        if (savedData1 && savedData2) {
            addToken(savedData1,savedData2);
            navigate("/chatroom");
        }
        //eslint-disable-next-line
    }, [token,user])

    const handleSignup=async()=>{
        if(user===""){
            alert("Please enter the User name");
        }
        else if(email===""){
            alert("Please provide Email");
        }
        else if(password===""){
            alert("Please provide Password");
        }
        else if(password.length<6){
            alert("password length must be greater than 6");
        }
        else{
            const data=await signup(user,email,password);
            if(data){
                Cookies.set("Token",data._id,{expires: 7});
                Cookies.set("User",data.User,{expires: 7});
                dispatch(addUser(data.User));
                dispatch(add(data._id));
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Sign Up</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-600 text-sm font-medium mb-2">
                            Username
                        </label>
                        <input
                            value={user}
                            onChange={e=>setUser(e.target.value)}
                            type="text"
                            id="username"
                            name="username"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">
                            Email
                        </label>
                        <input
                            value={email}
                            onChange={e=>setEmail(e.target.value)}
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">
                            Password
                        </label>
                        <input
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div
                        type="submit"
                        onClick={()=>handleSignup()}
                        className="w-full text-center hover:cursor-pointer bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Sign Up
                    </div>
                    <h1>Already have an account? <Link className='text-blue-500' to="/login">Login</Link></h1>
                    <h1>{token}</h1>
                </form>
            </div>
        </div>
    );
}
