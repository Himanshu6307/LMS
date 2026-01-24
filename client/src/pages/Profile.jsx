import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { FaCircleUser } from "react-icons/fa6";
import { MdArrowBack } from 'react-icons/md';

function Profile() {

    const { userDetail } = useSelector(state => state.user);
    const navigate = useNavigate()

    return (
        <div className='min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center'>
            <div className='bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full relative'>
                <div className='flex flex-col  items-center text-center'>

                    <div className='w-full' >
                        <MdArrowBack size={30} onClick={()=>{navigate("/")}} />
                    </div>

                    {userDetail?.photoUrl ? <img src={userDetail?.photoUrl} alt="" className='w-24 h-24 rounded-full object-cover border-4 border-black ' /> : <div className='w-24 h-24 rounded-full object-cover border-4 border-white text-red-700 text-5xl font-bold bg-black flex items-center justify-center '>{userDetail?.name.slice(0, 1).toUpperCase()}</div>}

                    <h2 className='text-2xl font-bold mt-4 text-gray-800 '>{userDetail?.name}</h2>
                    <p className='text-xl text-gray-500'>{userDetail?.role}</p>
                </div>

                <div className='flex flex-col justify-center items-start mt-6 space-y-4'>
                    <div className='flex items-center justify-center '>
                        <span className='font-semibold text-gray-700 text-[20px]'>Email:</span>
                        <span>{userDetail?.email}</span>
                    </div>
                    <div className='flex justify-center items-center  gap-3'>
                        <span className='font-semibold text-gray-700 text-[20px]'>Bio:</span>
                        <span>{userDetail?.description || "Update Your Bio"}</span>
                    </div>
                    <div className='flex justify-center items-center '>
                        <span className='font-semibold text-gray-700 text-[20px] '>Enrolled Courses:</span>
                        <span>{userDetail?.enrolledCourses?.length}</span>
                    </div>
                </div>

                <div className='mt-6 flex justify-center items-center gap-4'>
                    <button onClick={() => { navigate("/editprofile") }} className='px-7 py-3 rounded bg-black text-white active:bg-[#4b4b4b] cursor-pointer transition'>
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Profile