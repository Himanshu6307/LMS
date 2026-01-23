import React from 'react'
import { MdCastForEducation } from "react-icons/md";
import { FaLifeRing } from "react-icons/fa";
import { RiMoneyEuroCircleFill } from "react-icons/ri";
import { FcSupport } from "react-icons/fc";
import { RiUserCommunityFill } from "react-icons/ri";

function Logo() {
    return (
        <div className='w-[100vw] min-h-[90px] flex items-center justify-center flex-wrap gap-4 md:mb-[50px]'>

            <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gray-200 cursor-pointer'>
                <MdCastForEducation className='w-[35px] h-[35px] fill-[#03394b]' /> 20k+ Online Courses
            </div>

            <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gray-200 cursor-pointer'>
                <FaLifeRing className='w-[35px] h-[35px] fill-[#03394b]' /> Lifetime Access
            </div>

            <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gray-200 cursor-pointer'>
                <RiMoneyEuroCircleFill className='w-[35px] h-[35px] fill-[#03394b]' />Value for Money
            </div>

            <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gray-200 cursor-pointer'>
                <FcSupport className='w-[35px] h-[35px] fill-[#03394b]' />Lifetime Support
            </div>

            <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gray-200 cursor-pointer'>
                <RiUserCommunityFill className='w-[35px] h-[35px] fill-[#03394b]' /> Community Support
            </div>
            
        </div>
    )
}

export default Logo