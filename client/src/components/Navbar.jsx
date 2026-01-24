import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logo from "../assets/logo.jpg"
import about from "../assets/about.jpg"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ServerUrl } from '../App'
import { setUserDetail } from '../Store/Slices/user.slice'
import toast from 'react-hot-toast'
import { TailSpin } from 'react-loader-spinner'
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";

function Navbar() {
    const { userDetail } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [show1, setShow1] = useState(false)

    const handleLogout = async () => {
        if (!userDetail) {
            navigate("/login")
            return;
        }
        setLoading(true)
        try {
            const response = await axios.get(`${ServerUrl}/auth/logout`, { withCredentials: true });
            console.log(response.data)
            if (response.data.success) {
                dispatch(setUserDetail(null))
                toast.success("Logout Successful")
            }
            setLoading(false)

        } catch (error) {
            console.log("error in logout frontend", error)
            toast.error("Error in Logout")
            setLoading(false)
        }
    }


    return (
        <div className='w-[100%] h-[65px] px-[20px] py-[10px] flex justify-between items-center fixed top-0 bg-[#00000047] z-10 '>
            <div className='lg:w-[20%] w-[40%] lg:pl-[50px] '>
                <img className='border-2 border-white w-[55px]  ' src={logo} alt="" />
            </div>

            <div className='w-[30%] lg:flex justify-center items-center gap-2 hidden'>

                {!userDetail && <img onClick={() => { setShow((prev) => !prev) }} className='w-[47px] h-[47px] cursor-pointer rounded-full' src={about} alt="" />}

                {(!(userDetail?.photoUrl) && userDetail) && <div onClick={() => { setShow((prev) => !prev) }} className='w-[47px] h-[47px] cursor-pointer rounded-full text-red-500 flex justify-center items-center font-bold text-[20px] border-2 bg-black border-white cursor-pointer'>
                    {userDetail?.name.slice(0, 1).toUpperCase()}
                </div>}

                {((userDetail?.photoUrl) && userDetail) && <div onClick={() => { setShow((prev) => !prev) }} className='w-[47px] h-[47px] cursor-pointer rounded-full text-red-500 flex justify-center items-center font-bold text-[20px] border-2 overflow-hidden bg-black border-white cursor-pointer'>
                    <img src={userDetail?.photoUrl} className='object-cover h-full w-full' alt="" />               </div>
                }


                {userDetail?.role === "educator" && <div onClick={()=>navigate("/dashboard")} className='text-white text-[18px]  px-[20px] py-[7px] bg-black border-2 border-white rounded-full cursor-pointer font-light'>Dashboard</div>}

                <span onClick={handleLogout} className='text-black text-[18px]  px-[20px] py-[7px] bg-white  rounded-full cursor-pointer font-light shadow-sm' >{userDetail ? loading ? <TailSpin
                    visible={true}
                    height="30"
                    width="30"
                    color="#4fa94d"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                /> : "Logout" : "Login"}</span>
            </div>


            <div onClick={() => { setShow1((prev) => !prev) }} className=' lg:hidden'>
                <GiHamburgerMenu className='w-[30px] h-[30px] cursor-pointer text-white' />
            </div>


            {/* slider */}

            <div className={`lg:hidden fixed top-0 left-0  w-[100vw] h-[100vh] bg-[#000000d6] flex items-center justify-center flex-col gap-5 z-10 ${show1 ? "translate-x-[0] transition duration-600" : "translate-x-[-100%] transition duration-600"}`}>
                <MdClose onClick={() => { setShow1((prev) => !prev) }} className='absolute top-6 right-6 text-white w-[30px] h-[30px]' />



                {!userDetail && <img className='w-[47px] h-[47px] cursor-pointer rounded-full' src={about} alt="" />}

                {(!(userDetail?.photoUrl) && userDetail) && <div onClick={() => { setShow((prev) => !prev) }} className='w-[47px] h-[47px] cursor-pointer rounded-full text-red-500 flex justify-center items-center font-bold text-[20px] border-2 bg-black border-white cursor-pointer'>
                    {userDetail?.name.slice(0, 1).toUpperCase()}
                </div>}

                {((userDetail?.photoUrl) && userDetail) && <div onClick={() => { setShow((prev) => !prev) }} className='w-[47px] h-[47px] cursor-pointer rounded-full text-red-500 flex justify-center items-center font-bold text-[20px] border-2 overflow-hidden bg-black border-white cursor-pointer'>
                    <img src={userDetail?.photoUrl} className='object-cover h-full w-full' alt="" />               </div>
                }


                {userDetail?.role === "educator" && <div onClick={()=>{navigate("/profile")}} className='text-white text-[18px]  px-[35px] py-[9px] bg-black border-2 border-white rounded-xl cursor-pointer font-light'>My Profile</div>}
                {userDetail?.role === "educator" && <div className='text-white text-[18px]  px-[35px] py-[9px] bg-black border-2 border-white rounded-xl cursor-pointer font-light'>My Courses</div>}
                {userDetail?.role === "educator" && <div className='text-white text-[18px]  px-[35px] py-[9px] bg-black border-2 border-white rounded-xl cursor-pointer font-light'>Dashboard</div>}

                <span onClick={handleLogout} className='text-black text-[18px]  px-[55px] py-[9px] bg-white  rounded-xl cursor-pointer border-2 border-black font-light shadow-sm' >{userDetail ? loading ? <TailSpin
                    visible={true}
                    height="30"
                    width="30"
                    color="#4fa94d"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                /> : "Logout" : "Login"}</span>

            </div>


            {/* profile open */}
            {show && <div className='absolute top-[110%] right-[15%] flex flex-col items-center justify-center gap-2 text-[16px] rounded-md bg-white px-[15px] py-[10px] border-[2px] border-black hover:border-white hover:text-white cursor-pointer hover:bg-black' >
                <span onClick={() => { navigate("/profile") }} className='bg-black text-white px-[30px] py-[10px] rounded-full hover:bg-gray-600'>My Profile</span>
                <span className='bg-black text-white px-[30px] py-[10px] rounded-full hover:bg-gray-600'>My Courses</span>
            </div>
            }
        </div>
    )
}

export default Navbar