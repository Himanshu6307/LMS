import React from 'react'
import { IoMdArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom';
import empty from '../../assets/empty.jpg'
import { FaEdit } from 'react-icons/fa';
import { useSelector } from 'react-redux';

function Courses() {

    const navigate = useNavigate();
    const { courseDetail } = useSelector((state) => state.course);
    return (
        <div className='flex min-h-screen bg-gray-100 '>

            <div className='w-full px-4 min-h-screen sm:p-6 bg-gray-100'>
                <div className='w-full px-6 flex flex-col sm:flex-row justify-between items-start mb-6 gap-3 sm:items-center'>

                    <h1 className='text-xl font-semibold text-gray-800 flex justify-center items-center gap-2'><IoMdArrowBack size={30} onClick={() => navigate("/dashboard")} /><span>All Created Courses</span></h1>

                    <button onClick={() => navigate("/createcourse")} className='px-4 py-3 bg-black text-white text-[15px] rounded-lg'>Create Course</button>

                </div>

                {/* table for large device */}
                <div className='hidden md:block bg-white rounded-xl shadow p-4 overflow-x-auto'>
                    <table className='min-w-full text-sm'>
                        <thead className='border-b bg-gray-50'>
                            <tr>
                                <th className='text-left px-4 py-3'>Courses</th>
                                <th className='text-left px-4 py-3'>Price</th>
                                <th className='text-left px-4 py-3'>Status</th>
                                <th className='text-left px-4 py-3'>Action</th>
                            </tr>

                        </thead>

                        <tbody className=''>
                            {courseDetail?.length > 0 ?courseDetail?.map((course, index) => {
                                return (<tr key={index} className='border-b hover:bg-gray-100 transition  duration-200 cursor-pointer'>
                                    <td className='py-3 px-4 flex items-center gap-4'>{course?.thumbnail ?<img className='w-25 h-14 object-cover rounded-md' src={course?.thumbnail} alt="" />: <img className='w-25 h-14 object-cover rounded-md' src={empty} alt="" />}
                                        <span>{course?.title}</span>
                                    </td>
                                    <td className='py-3 px-4 '>{!course?.price ? "$ NA" : course?.price}</td>
                                    <td className='py-3 px-4 '><span className={`px-3 py-1 rounded-full text-xs ${!course?.isPublished?"bg-red-100 text-red-600":"bg-green-100 text-green-600"} `}>{course?.isPublished === true ? "Published" : "Draft"}</span></td>
                                    <td className='py-3 px-4 '><FaEdit onClick={()=>navigate(`/editcourse/${course?._id}`)} className='text-gray-600 hover:text-blue-600 cursor-pointer' /></td>
                                </tr>
                                )
                            }): <tr><td colSpan={4} className='text-center py-6'>No courses created yet.</td></tr>}
                        </tbody>
                    </table>
                    <p className='text-gray-400 mt-6 text-sm text-center'>A list of your courses</p>
                </div>

                {/* table for small device */}
                <div className='md:hidden space-y-4'>
                    <div className='bg-white rounded-lg flex flex-col gap-3 shadow p-4'>

                        {courseDetail?.length > 0 && courseDetail?.map((course, index) => {
                            return (
                                <div key={index}>
                                    <div className='flex gap-4 items-center'>
                                        {course?.thumbnail?<img className='w-16 h-16 object-cover rounded-md' src={course?.thumbnail} alt="" />:<img className='w-16 h-16 object-cover rounded-md' src={empty} alt="" />}
                                        <div className='flex-1 flex justify-between items-center px-6 gap-4'>
                                            <h2 className='font-medium text-xl'>{course?.title}</h2>
                                            <p className='text-gray-600 text-xl mt-1'>{!course?.price ? "$ NA" : course?.price}</p>
                                            <FaEdit onClick={()=>navigate(`/editcourse/${course?._id}`)} className='text-gray-600 hover:text-blue-600 cursor-pointer' />
                                        </div>
                                    </div>
                                    <span className={`w-fit px-3 py-1 text-xs rounded-full text-red-600 ${!course?.isPublished?"bg-red-100":"bg-green-100"}`}>{course?.isPublished === true ? "Published" : "Draft"}</span>
                                </div>
                            )
                        })}

                    </div>
                    <p className='text-center text-sm text-gray-400 mt-4 pl-[80px] '>A list of your recent courses</p>

                </div>

            </div>
        </div>
    )
}

export default Courses