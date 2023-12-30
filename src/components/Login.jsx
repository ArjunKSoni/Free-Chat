// Login.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../API/authapi';
import { add } from '../redux/token';
import Cookies from 'js-cookie';
import { addUser } from '../redux/user';


const Login = () => {
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
    }, [token])

    const handleLogin=async()=>{
        if(email===""){
            alert("Please provide Email");
        }
        else if(password===""){
            alert("Please provide Password");
        }
        else if(password.length<6){
            alert("password length must be greater than 6");
        }
        else{
            const data=await login(email,password);
            if(data){
                Cookies.set("Token",data._id,{expires: 7});
                Cookies.set("User",data.User,{expires: 7});
                dispatch(addUser(data.User))
                dispatch(add(data._id));
                navigate("/chatroom");
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Login</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">
                            Email
                        </label>
                        <input
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
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
                            onChange={(e)=>setPassword(e.target.value)}
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div
                        onClick={handleLogin}
                        type="submit"
                        className="w-full hover:cursor-pointer text-center bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Login
                    </div>
                    <h1>Don't have an account? <Link className='text-blue-500' to="/">Signup</Link></h1>
                </form>
            </div>
        </div>
    );
};

export default Login;
