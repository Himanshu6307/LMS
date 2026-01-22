import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.jpg"
import google from "../assets/google.jpg"
import axios from 'axios';
import { ServerUrl } from '../App';
import { setUserDetail } from '../Store/Slices/user.slice';
import { TailSpin } from 'react-loader-spinner';

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleLogin = async (e) => {
        e.preventDefault()
        if (!password || !email) {
            toast.error("All fields are required");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(`${ServerUrl}/auth/login`,{ email, password },{withCredentials: true });
            console.log(response.data);

            dispatch(setUserDetail(response.data));

            toast.success("Login Successful");
            setLoading(false)
            setEmail("")
            setPassword("")
            navigate("/")

        } catch (error) {
            setLoading(false)
            toast.error("Error in login")
            console.log(error)
        }

    }

    return (
        <div className='bg-[#dddbdb] w-[100vw] h-[100vh] flex justify-center items-center'>
            <form onSubmit={handleLogin} className='w-[90%] md:w-200 h-150 bg-white shadow-xl rounded-2xl flex'>
                <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-6 '>
                    <div>
                        <h1 className='text-2xl font-semibold text-black '>Welcome Back</h1>
                        <h2 className='text-[18px] '>Login Your Account</h2>
                    </div>

                    <div className='w-[80%] flex flex-col gap-1 items-start justify-center px-3'>


                        <label htmlFor="email" className='font-semibold'>Email</label>
                        <input onChange={(e) => { setEmail(e.target.value) }} value={email} className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]' id='email' type="text" placeholder='Your Email' />

                        <label htmlFor="password" className='font-semibold'>Password</label>
                        <input onChange={(e) => { setPassword(e.target.value) }} value={password} className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]' id='password' type={showPassword ? "text" : "password"} placeholder='Your Password' />

                        <div className='flex gap-1'>
                            <input onClick={() => { setShowPassword((prev) => !prev) }} type="checkbox" />
                            <span className='text-[13px]'>Show Password</span>
                        </div>




                        <button disabled={loading} className='mt-4 w-full bg-black text-white rounded-full py-3 flex justify-center items-center'>{loading ? <TailSpin
                            visible={true}
                            height="40"
                            width="40"
                            color="#4fa94d"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperStyle={{}}
                            wrapperClass=""
                        /> :"Login"}</button>

                        <div className='gap-2 flex justify-center items-center w-[100%]'>
                            <div className='h-[0.5px] w-[25%] bg-[$c4c4c4]'></div>
                            <div className='w-[50%] text-[15px]  flex justify-center items-center'>Or Continue</div>
                            <div className='h-[1px] w-[25%] bg-[$c4c4c4]'></div>

                        </div>

                        <div className='w-[100%] rounded-full h-[40px] border-1 border-black rounded-[5px] flex items-center justify-center ' >
                            <img className='w-[25px]' src={google} alt="" />
                        </div>

                        <div className=' flex justify-center items-center w-[100%]'>
                            <p onClick={() => { navigate("/signup") }} className='flex justify-center cursor-pointer items-center text-blue-600 underline text-center'>Create an account</p>

                        </div>



                    </div>

                </div>

                <div className='md:w-[50%] w-[100%] h-[100%] rounded-r-2xl bg-black  md:flex flex-col items-center justify-center hidden '>
                    <img className='shadow-2xl w-30' src={logo} alt="" />
                    <span className='text-2xl text-white'>VIRTUAL COURSES</span>
                </div>
            </form>
        </div>
    )
}

export default Login