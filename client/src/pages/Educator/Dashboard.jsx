import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";

function Dashboard() {
    const { userDetail } = useSelector(state => state.user)
    const navigate=useNavigate();

    return (
        <div className='w-screen min-h-screen bg-gray-100 relative '>

            <div onClick={()=>navigate("/")} className='absolute top-5 left-5'><IoMdArrowBack size={30} /></div>

            <div className='w-full px-6 py-10 bg-gray-50 space-y-10'>

                {/* profile div */}
                <div className='max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center
           gap-6'>
                    <img src={userDetail?.photoUrl || userDetail?.name.slice(0, 1).toUppercase()} className='w-28 h-28 rounded-full object-cover border-4 border-black shadow-md' alt="" />
                    <div className='text-center md:text-left space-y-1'>
                        <h1 className='text-2xl font-bold text-gray-800'>Welcome,{userDetail?.name||"Educator"}</h1>
                        <h1 className='text-xl font-semibold text-gray-800'>Total Earning : 0</h1>
                        <p className='text-gray-600 text-sm'>{userDetail?.description||"Start Creating Courses"}</p>
                         <button onClick={()=>navigate("/courses")} className='px-4 py-2 bg-black text-white text-[15px] rounded-lg'>Create Course</button>
                    </div>
                </div>

                {/* graph div */}
                <div>

                </div>

            </div>

        </div>
    )
}

export default Dashboard