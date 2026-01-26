import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import home1 from "../assets/home1.jpg"
import { FaGooglePlay } from "react-icons/fa";
import ai from "../assets/ai.png"
import ai1 from "../assets/SearchAi.png"
import Logo from '../components/Logo';
import ExploreCourses from '../components/ExploreCourses';
import CardPage from '../components/CardPage';
import { useNavigate } from 'react-router-dom';

function Home() {

  const { loading } = useSelector(state => state.user)
  const navigate = useNavigate();


  return (
    <div className='w-[100%] overflow-hidden'>
      {!loading ?
        <div className='w-[100%] lg:h-[140vh] h-[70vh] relative'>
          <Navbar />
          <img src={home1} alt="" className='object-cover md:object-fill w-[100%] lg:h-[100%] h-[50vh]' />
          <span className='absolute lg:text-[70px] md:text-[40px] lg:top-[10%] top-[15%] w-[100%] flex items-center justify-center text-white font-bold text-[20px] '>Grow Your Skills To Advance</span>

          <span className='absolute lg:text-[70px] md:text-[40px] lg:top-[18%] top-[20%] w-[100%] flex items-center justify-center text-white font-bold text-[20px] '>Your Career Path</span>

          <div className='absolute lg:top-[30%] top-[75%] md:top-[80%] w-[100%] flex items-center justify-center gap-3 flex-wrap'>
            <button onClick={()=>navigate("/allcourse")} className='px-[20px] py-[10px] border-2 lg:border-white border-black lg:text-white text-black font-light text-[18px] flex gap-2 cursor-pointer'>View All Courses <FaGooglePlay className='w-[30px] h-[30px] fill-black lg:fill-white '  />
            </button>

            <button className='px-[20px] py-[10px] border-2 lg:bg-white bg-black lg:text-black text-white font-light text-[18px] flex gap-2 cursor-pointer rounded-[10px] text-center'>Search With Ai <img src={ai} alt="" className='w-[30px] h-[30px] rounded-full hidden lg:block' />  <img src={ai1} alt="" className='w-[30px] h-[30px] rounded-full lg:hidden' />
            </button>
          </div>
          
        </div>
        :
        <div className='w-[100%] lg:h-[140vh] h-[100vh] relative'>
          Loading
        </div>
      }
      <Logo/>
      <ExploreCourses/>
      <CardPage/>
    </div>
  )
}

export default Home