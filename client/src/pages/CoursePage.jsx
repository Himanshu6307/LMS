import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdArrowBack } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { ServerUrl } from '../App';
import { useSelector } from 'react-redux';
import emptyimg from "../assets/empty.jpg"
import { FaStar } from 'react-icons/fa';
import { MdOutlinePlayCircleFilled } from "react-icons/md";
import { IoLockClosed } from "react-icons/io5";
import Card from '../components/Card';

function CoursePage() {
    const navigate = useNavigate();
    const { courseDetail } = useSelector(state => state.course);
    const { courseId } = useParams();
    const [loading, setLoading] = useState(false);
    const [currentCourse, setCurrentCourse] = useState(null);
    const [currentLecture, setCurrentLecture] = useState(null)
    const [creator, setCreator] = useState(null)
    const [creatorCourse, setCreatorCourse] = useState([])


    const fetchCreator = () => {
        const course = courseDetail.find(c => c?._id === courseId);
        if (!course) return;

        setCreator(course.creator);

        const creatorCourses = courseDetail.filter(
            c =>
                c?.creator?._id === course?.creator?._id &&
                c?._id !== courseId
        );

        setCreatorCourse(creatorCourses);
    };


    useEffect(() => {
        fetchCreator();
        (async () => {
            setLoading(true)
            try {
                const response = await axios.get(`${ServerUrl}/course/getcoursebyid/${courseId}`, { withCredentials: true });
                setCurrentCourse(response.data);
                setLoading(false);

            } catch (error) {
                console.log("error in getting course by id", error);
                setLoading(false);
            }

        })()
    }, [courseDetail, courseId])


    useEffect(() => {
        setCurrentLecture(null);
        setCurrentCourse(null);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    }, [courseId]);




    return (
        <div className=' min-h-screen bg-gray-100 p-6'>
            <div className='max-w-8xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6 relative '>
                {/* top */}
                <div className='flex flex-col md:flex-row gap-6'>
                    {/* thumbnail */}
                    <div className='w-full md:w-1/2'>
                        <MdArrowBack size={30} onClick={() => { navigate("/") }} />
                        {currentCourse?.thumbnail ? <img src={currentCourse?.thumbnail} className='h-[45vh] border-1 border-gray-500 rounded-md object-cover w-full' alt="Not available" /> : <img src={emptyimg} className='rounded-xl w-full object-cover' alt="Not available" />}

                    </div>
                    {/* courseDetail */}

                    <div className='flex-1 space-y-2 mt-[20px] '>
                        <h2 className='text-2xl font-bold'>{currentCourse?.title}</h2>
                        <p className='text-gray-600'>{currentCourse?.subTitle}</p>
                        <div className='flex items-start justify-between flex-col'>

                            <div className='text-yellow-500 font-medium flex gap-2'>
                                <span className='flex items-center justify-start gap-1'><FaStar />{" "}5</span>
                                <span className='flex text-gray-400 items-center justify-start gap-1'>(1200 Reviews)</span>
                            </div>

                            <div className='text-lg font-semibold text-black flex gap-1'>
                                <span className='flex items-center justify-start text-lg font-semibold text-black'>${currentCourse?.price}</span>
                                <span className='flex line-through text-gray-400 items-center text-sm justify-start'>$70000</span>
                            </div>

                            <ul className='text-sm text-gray-700 space-y-1 pt-2'>
                                <li className=''>10+ hours of video course</li>
                                <li>Lifetime access to this material course</li>
                            </ul>

                            <button className='bg-black cursor-pointer py-2 px-6 text-white hover:bg-gray-700 mt-3'>Enroll Now</button>

                        </div>
                    </div>

                </div>

                <div className=''>
                    <h2 className='text-xl font-semibold mb-2'>What you will Learn</h2>
                    <ul className='list-disc pl-6 text-gray-700 space-y-1'>
                        <li>Learn {currentCourse?.category} from Beginning</li>
                    </ul>
                </div>

                <div>
                    <h2 className='text-xl font-semibold mb-2'>Who This Course is For</h2>
                    <p className='text-gray-700'>Begginers, aspiring developers and professionals looking to upgrade skills </p>
                </div>

                <div className='flex flex-col md:flex-row gap-6'>
                    <div className='bg-white w-full md:w-2/5 p-6 rounded-2xl shadow-lg border border-gray-200 '>
                        <h2 className='text-xl font-bold mb-1 text-gray-800'>Course Curriculum</h2>
                        <p className='text-gray-700 mb-4 text-sm '>{currentCourse?.lectures?.length} Lectures</p>
                        <div className='flex flex-col gap-3'>
                            {currentCourse?.lectures?.map((lecture, index) => {
                                return (<button disabled={!(lecture?.isPreviewFree)} onClick={
                                    () => {
                                        if (lecture?.isPreviewFree) { setCurrentLecture(lecture) }
                                    }}
                                    key={index} className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 text-left ${lecture?.isPreviewFree ? "hover:bg-gray-100 cursor-pointer border-gray-300 " : "cursor-not-allowed opacity-60 border-gray-200"} ${currentLecture?.lectureTitle === lecture?.lectureTitle ? "bg-gray-100 border-gray-400" : ""}`}>
                                    <span className='text-lg text-gray-700'>
                                        {lecture?.isPreviewFree ? <MdOutlinePlayCircleFilled /> : <IoLockClosed />}
                                    </span>
                                    <span className='text-sm font-medium'>Lecture-{index + 1} : {lecture?.lectureTitle}</span>

                                </button>)
                            })}
                        </div>
                    </div>

                    <div className='bg-white w-full md:w-3/5 p-6 rounded-2xl shadow-lg border border-gray-200'>
                        <div className='aspect-video w-full rounded-lg overflow-hidden mb-4 bg-black flex items-center justify-center'>
                            {currentLecture?.videoUrl ? <video controls src={currentLecture?.videoUrl} className='w-full h-full object-cover' /> : <span className='text-white text-sm'>Select a preview Lecture to watch</span>}
                        </div>
                    </div>

                </div>

                <div className='mt-8 border-t pt-6'>
                    <h2 className='text-xl font-semibold mb-2'>Write Reviews</h2>
                    <div className='mb-4'>
                        <div className='flex gap-1 mb-2'>
                            {[1, 2, 3, 4, 5].map((e, index) => {
                                return (<FaStar key={e} className='fill-amber-300' />)
                            })}
                        </div>
                    </div>
                    <textarea rows={3} className='w-full border border-gray-300 rounded-lg p-2' placeholder='Write Your Reviews...'>

                    </textarea>
                    <button className='bg-black py-3 px-4 rounded-md hover:bg-gray-800 text-white mt-3 '>Submit Review</button>
                </div>

                {/* for creator Information */}

                <div className='flex items-center gap-4 pt-4 border-t'>
                    {creator?.photoUrl ? <img className='w-16 h-16 rounded-full object-cover border-1 border-black' src={creator?.photoUrl} alt="" /> : <img className='w-16 h-16 rounded-full object-cover border-1 border-black' src={emptyimg} alt="" />}
                    <div>
                        <h2 className='text-xl font-semibold'>{creator?.name}</h2>
                        <p className='md:text-sm text-gray-600 text-[10px]'>{creator?.description}</p>
                        <p className='md:text-sm text-gray-600 text-[10px]'>{creator?.email}</p>
                    </div>
                </div>

                {/* publish course */}
                <div>
                    <p>Published Course By the Educator</p>
                </div>

                <div className='w-full transition-all duration-300 py-[20px] flex items-start justify-center lg:justify-start flex-wrap gap-6 lg:px-[80px]'>
                    {creatorCourse.length != 0 ? creatorCourse?.map((course, index) => {
                        return (<Card key={index} title={course?.title} category={course?.category} price={course?.price} thumbnail={course?.thumbnail} id={course?._id} />)
                    }) : <div>No Other courses Published</div>}
                </div>
            </div>

        </div>
    )
}

export default CoursePage