import React from 'react'
import { FaRegStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Card({ title, thumbnail, price, category,id }) {
     const navigate = useNavigate();
    return (
        <div onClick={()=>navigate(`/coursepage/${id}`)} className='max-w-[350px] w-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-300' >
            <img className='w-full h-48 object-cover' src={thumbnail} alt="" />
            <div className='p-5 space-y-2 '>
                <h2 className='text-lg font-semibold text-gray-900 '>{title}</h2>
                <span className='px-2 py-0.5 bg-gray-100 rounded-full capitalize text-gray-700'>{category}</span>
                <div className='flex items-center justify-between text-sm mt-3 text-gray-600 px-[10px]'>
                    <span className='font-semibold text-gray-800 '>{price}</span>
                    <span className='flex items-center gap-1'><FaRegStar className='text-yellow-500' />4</span>
                </div>
            </div>
        </div>
    )
}

export default Card