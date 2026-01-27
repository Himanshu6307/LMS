import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { MdArrowBack } from 'react-icons/md';
import ai from "../assets/ai.png"


function AllCourses() {
    const [slide, setSlide] = useState(false);
    const [category, setCategory] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const navigate = useNavigate();

    const toggleCategory=(e)=>{
         if(category.includes(e.target.value)){
            setCategory(category.filter(cat=>cat!==e.target.value));
            console.log(category);
         }else{
            setCategory(prev=>[...prev, e.target.value]);
            console.log(category);
         }
    }



    return (
        <div className='flex min-h-screen bg-gray-50'>
            <Navbar />

            {/* sidebar */}
            <aside className='w-[260px] h-screen overflow-y-auto bg-black fixed top-0 left-0 p-6 py-[130px] border-r border-gray-200 shadow-md transition-transform duration-300 z-50 '>
                <h2 className='text-xl font-bold flex items-center justify-center gap-2 text-gray-50 mb-6'><MdArrowBack     className="text-white" onClick={()=>navigate("/")} />Filter By Category</h2>
                 <form onSubmit={(e)=>{e.preventDefault()}} className='space-y-4 text-sm bg-gray-600 border-white text-white border p-[20px] rounded-2xl'>
                    <button className='px-[10px] py-[10px] bg-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer'>Search With AI <img className='h-6 w-6 object-cover rounded-full ' src={ai} alt="" /></button>

                     <label htmlFor="app" className='flex items-center gap-3 cursor-pointer transition hover:text-gray-200'>
                        <input id='app'  onChange={toggleCategory} value={"App Devlopment"} type="checkbox" className='w-4 h-4 accent-black rounded-md' /> App Devlopment
                     </label>
                     <label htmlFor="web" className='flex items-center gap-3 cursor-pointer transition hover:text-gray-200'>
                        <input id='web' onChange={toggleCategory} value={"Web Devlopment"}  type="checkbox" className='w-4 h-4 accent-black rounded-md' /> Web Devlopment
                     </label>
                     <label htmlFor="datasci" className='flex items-center gap-3 cursor-pointer transition hover:text-gray-200'>
                        <input  id='datasci' onChange={toggleCategory} value={"Data Science"}  type="checkbox" className='w-4 h-4 accent-black rounded-md' /> Data Science
                     </label>
                     <label htmlFor="dataanl" className='flex items-center gap-3 cursor-pointer transition hover:text-gray-200'>
                        <input id='dataanl' onChange={toggleCategory} value={"Data Analytics"}  type="checkbox" className='w-4 h-4 accent-black rounded-md' /> Data Analytics
                     </label>
                     <label htmlFor="ethical" className='flex items-center gap-3 cursor-pointer transition hover:text-gray-200'>
                        <input id='ethical' onChange={toggleCategory} value={"Ethical Hacking"}  type="checkbox" className='w-4 h-4 accent-black rounded-md' /> Ethical Hacking
                     </label>
                     <label htmlFor="Ai" className='flex items-center gap-3 cursor-pointer transition hover:text-gray-200'>
                        <input id='Ai' onChange={toggleCategory} value={"AI Tools"}  type="checkbox" className='w-4 h-4 accent-black rounded-md' /> AI Tools
                     </label>
                     <label htmlFor="Ml" className='flex items-center gap-3 cursor-pointer transition hover:text-gray-200'>
                        <input id='Ml' onChange={toggleCategory} value={"AI/ML"}  type="checkbox" className='w-4 h-4 accent-black rounded-md' /> AI/ML
                     </label>
                     <label htmlFor="ui" className='flex items-center gap-3 cursor-pointer transition hover:text-gray-200'>
                        <input id='ui' onChange={toggleCategory} value={"UI UX Designing"} type="checkbox" className='w-4 h-4 accent-black rounded-md' /> UI UX Designing
                     </label>
                     <label htmlFor="oth" className='flex items-center gap-3 cursor-pointer transition hover:text-gray-200'>
                        <input id='oth' onChange={toggleCategory} value={"Others"} type="checkbox" className='w-4 h-4 accent-black rounded-md' /> Others
                     </label>

                 </form>
            </aside>

        </div>
    )
}

export default AllCourses