import React from 'react'
import { MdArrowBack } from 'react-icons/md';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function ProfilePhoto() {
    const {userDetail}=useSelector(state=>state.user);
    const navigate=useNavigate()
  return (
    <div className='bg-black/60 h-screen w-screen flex justify-center items-center relative'>
      
        <MdArrowBack className='text-black absolute top-4 left-4' size={30} onClick={()=>{navigate("/profile")}} />
            <h1 className='absolute top-4 left-[44vw] text-[3vh] font-semibold '>Profile Photo</h1>
        <img className='h-[45vw] w-[45vw] rounded-full object-cover border border-4 border-black ' src={userDetail?.photoUrl} alt="" />
   
    </div>
  )
}

export default ProfilePhoto