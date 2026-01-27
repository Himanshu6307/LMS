import React, { useState } from 'react'
import Navbar from '../components/Navbar'

function CoursePage() {
    const [slide, setSlide] = useState(false);
  return (
    <div className='flex min-h-screen bg-gray-50'>
        <Navbar/>

        {/* sidebar */}
        <aside className='w-[260px] h-screen overflow-y-auto bg-black fixed top-0 left-0 p-6 py-[130px] border-r border-gray-200 shadow-md transition-transform duration-300 z-50 '>
             <h2 className=''>Filter By Category</h2>
        </aside>

    </div>
  )
}

export default CoursePage