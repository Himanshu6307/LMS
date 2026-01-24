import React from 'react'
import {SiViaplay} from "react-icons/si"
import { FaDesktop } from "react-icons/fa";
import { FaMobileAlt } from "react-icons/fa";
import { FaHackerrank } from "react-icons/fa6";
import { AiFillOpenAI } from "react-icons/ai";
import { FaUikit } from "react-icons/fa6";
import { SiGoogledataproc } from "react-icons/si";
import { SiOpenaigym } from "react-icons/si";
import { BsFillClipboardDataFill } from "react-icons/bs";


function ExploreCourses() {
  return (
    <div className='w-[100vw] min-h-[50vh] lg:h-[60vh] flex flex-col lg:flex-row items-center justify-center gap-4 px-[100px] mb-8 sm:mt-4 ' >

         {/* left Div */}
        <div className='lg:w-[350px] lg:h-[100%] min-h-[400px] flex flex-col items-start justify-center gap-1 md:px-[40px] px-[20px]'>

            <span className='text-[35px] font-semibold'>Explore</span>
            <span className='text-[35px] font-semibold'>Our Courses</span>
            <p className='text-[17px]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi molestiae consequatur est alias, laborum quam facere nesciunt consectetur, nulla natus quo, soluta nam </p>
            <button className=' cursor-pointer px-[20px] py-[10px] bg-black border-2 border-white text-white rounded-[10px] text-[19px] font-light flex gap-2 mt-[40px]'>Explore <SiViaplay className="w-[30px] h-[30px] lg:fill-white fill-black"  /></button>

        </div>

        {/* right div */}

        <div className='w-[720px] max-w-[90%] min-h-[320px]  flex items-center justify-center lg:gap-[60px] gap-[50px] flex-wrap mb-[50px] lg:mb-[0px]'  >

            <div className='w-[100px] h-[130px] font-light text-[13px] font-medium flex flex-col gap-3 text-center'>
                <div className='w-[90px] h-[80px] bg-[#f0cdf0] flex items-center justify-center rounded-lg'>
                    <FaDesktop className='h-[50px] w-[50px] text-[#6d6c6c]' />
                </div>
                Web Dev
            </div>

            <div className='w-[100px] h-[130px] font-light text-[13px] font-medium flex flex-col gap-3 text-center'>
                <div className='w-[90px] h-[80px] bg-[#98cadf] flex items-center justify-center rounded-lg'>
                    <FaMobileAlt className='h-[50px] w-[50px] text-[#6d6c6c]' />
                </div>
                App Dev
            </div>

            <div className='w-[100px] h-[130px] font-light text-[13px] font-medium flex flex-col gap-3 text-center'>
                <div className='w-[90px] h-[80px] bg-[#a9e6a6] flex items-center justify-center rounded-lg'>
                    <FaHackerrank className='h-[50px] w-[50px] text-[#6d6c6c]' />
                </div>
                Ethical Hacking
            </div>

            <div className='w-[100px] h-[130px] font-light text-[13px] font-medium flex flex-col gap-3 text-center'>
                <div className='w-[90px] h-[80px] bg-[#dece8d] flex items-center justify-center rounded-lg'>
                    <AiFillOpenAI className='h-[50px] w-[50px] text-[#6d6c6c]' />
                </div>
                AI/ML
            </div>

            <div className='w-[100px] h-[130px] font-light text-[13px] font-medium flex flex-col gap-3 text-center'>
                <div className='w-[90px] h-[80px] bg-[#978de5] flex items-center justify-center rounded-lg'>
                    <SiGoogledataproc className='h-[50px] w-[50px] text-[#6d6c6c]' />
                </div>
                Data Science
            </div>

            <div className='w-[100px] h-[130px] font-light text-[13px] font-medium flex flex-col gap-3 text-center'>
                <div className='w-[90px] h-[80px] bg-[#759bd4] flex items-center justify-center rounded-lg'>
                    <FaUikit className='h-[50px] w-[50px] text-[#6d6c6c]' />
                </div>
                UI/UX Designing
            </div>

            <div className='w-[100px] h-[130px] font-light text-[13px] font-medium flex flex-col gap-3 text-center'>
                <div className='w-[90px] h-[80px] bg-[#ee72b6] flex items-center justify-center rounded-lg'>
                    <BsFillClipboardDataFill className='h-[50px] w-[50px] text-[#6d6c6c]' />
                </div>
                Data Analytics
            </div>

            <div className='w-[100px] h-[130px] font-light text-[13px] font-medium flex flex-col gap-3 text-center'>
                <div className='w-[90px] h-[80px] bg-[#dbe87b] flex items-center justify-center rounded-lg'>
                    <SiOpenaigym className='h-[50px] w-[50px] text-[#6d6c6c]' />
                </div>
                AI Tools
            </div>
        </div>

    </div>
  )
}

export default ExploreCourses