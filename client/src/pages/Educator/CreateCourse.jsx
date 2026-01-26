import React, { useState } from 'react'
import { IoMdArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCourseDetail } from '../../Store/Slices/course.slice.js';
import { useSelector } from 'react-redux';
import { ServerUrl } from '../../App.jsx';
import axios from 'axios';
import toast from 'react-hot-toast';
import { TailSpin } from 'react-loader-spinner';

function CreateCourse() {

    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { courseDetail } = useSelector((state) => state.course);
    const navigateTo = useNavigate();

    const handleSubmit = async () => {
        if (!title || (!category || category==="Select Category")) {
            toast.error("Please fill all the fields");
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post(`${ServerUrl}/course/createcourse`, {
                title,
                category
            }, {
                withCredentials: true
            });
            console.log(response.data)
            dispatch(setCourseDetail([...courseDetail, response.data]));
            toast.success("Course created successfully");
            setLoading(false);
            setTitle("");
            setCategory("");
            navigateTo("/courses");

        } catch (error) {
            console.log("Create course Error in frontend", error)
            toast.error("Error creating course");
            setLoading(false);
        }
    }

    return (
        <div className='w-[100vw] h-[100vh] flex items-center justify-center'>
            <div className='shadow-md max-w-[550px] w-full py-4 '>
                <div className='flex gap-32 w-[100%] items-center'>
                    <IoMdArrowBack size={30} onClick={() => navigate("/dashboard")} />
                    <h2 className='text-black text-2xl font-semibold'>Create Courses</h2>
                </div >

                <div className='flex gap-6 flex-col items-start justify-center w-full px-6 mt-6'>
                    <div className='w-full flex flex-col gap-1'><label htmlFor="title" className='text-xl'>Course Title</label>
                        <input value={title} onChange={(e) => { setTitle(e.target.value) }} type="text" id='title' placeholder='Enter Course Title' className='border border-gray-300   focus:outline-none focus:ring-2 focus:ring-black py-2 px-4 w-full text-[18px] rounded-md' />
                    </div>

                    <div className='w-full flex flex-col  gap-1'>
                        <label htmlFor="category" className='text-xl'>Course Category</label>
                        <select value={category} onChange={(e) => { setCategory(e.target.value) }} className='border border-gray-300   focus:outline-none focus:ring-2 focus:ring-black py-3 px-4 w-full text-[16px] rounded-md' id="category">
                            <option value="">Select Category</option>
                            <option value="App Devlopment">App Devlopment</option>
                            <option value="AI/ML">AI/ML</option>
                            <option value="AI Tools">AI Tools</option>
                            <option value="Data Analytics">Data Analytics</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Ethical Hacking">Ethical Hacking</option>
                            <option value="UI UX Designing">UI UX Designing</option>
                            <option value="Web Devlopment">Web Devlopment</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>


                    <button onClick={handleSubmit} className='w-full mt-6 px-4 py-3 bg-black text-white text-[18px] rounded-lg flex justify-center items-center'>{loading ? <TailSpin
                        visible={true}
                        height="40"
                        width="40"
                        color="#4fa94d"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                    /> : "Create Course"}</button>

                </div>
            </div>
        </div>
    )
}

export default CreateCourse