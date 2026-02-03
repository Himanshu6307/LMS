import React, { useEffect, useState } from 'react'
import { IoMdArrowBack } from 'react-icons/io'
import { TailSpin } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ServerUrl } from '../../App';
import { setLectureDetail, setLoading } from '../../Store/Slices/lecture.slice';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaEdit } from 'react-icons/fa';

function CreateLecture() {

    const navigate = useNavigate();
    const { lectureDetail, loading } = useSelector((state) => state.lecture);
    const { courseId } = useParams();
    const [lectureTitle, setLectureTitle] = useState("");
    const [loading1, setLoading1] = useState(false);
    const dispatch = useDispatch();

    const handleCreateLecture = async () => {
        setLoading1(true);
        if (!lectureTitle) {
            toast.error("Please enter lecture title");
            setLoading1(false);
            return;
        }
        try {

            const response = await axios.post(`${ServerUrl}/lecture/createlecture/${courseId}`, {
                lectureTitle
            }, { withCredentials: true });
            console.log(response.data);
            dispatch(setLectureDetail([...lectureDetail, response.data.lecture]));
            setLectureTitle("");
            setLoading1(false);
            toast.success("Lecture created successfully");
        } catch (error) {
            console.log("Error in Frontend create lecture", error);
            toast.error("Error in create Lecture");
            setLoading1(false)
        }
    }

    useEffect(() => {
        (async () => {
            try {
                dispatch(setLoading(true));
                const response = await axios.get(`${ServerUrl}/course/getcoursebyid/${courseId}`, { withCredentials: true });
                console.log(response.data.lectures)
                dispatch(setLectureDetail(response.data.lectures));
                dispatch(setLoading(false))
            } catch (error) {
                console.log("error in getting all lecture of course", error);
            }

        })()
    }, [dispatch])

    return (
        <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
            <div className='bg-white shadow-xl rounded-xl w-full max-w-2xl p-6'>

                {/* header */}

                <div className='mb-6'>
                    <h1 className='text-2xl font-semibold text-gray-800 mb-1'>Let's Add a Lecture.</h1>
                    <p className='text-sm text-gray-500'>Enter the title and add your video lecture to enhance your course content</p>


                </div>

                {/* input area */}

                <input onChange={(e) => { setLectureTitle(e.target.value) }} type="text" className='w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black mb-4' placeholder='e.g introduction to mern stack' value={lectureTitle} />

                {/* button */}

                <div className='flex gap-4 mb-6'>
                    <button onClick={() => navigate(`/editcourse/${courseId}`)} className='flex items-center gap-2 px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-sm font-medium'><IoMdArrowBack className=' w-[19px] h-[19px] cursor-pointer' />Back to Course</button>
                    <button disabled={loading1} onClick={handleCreateLecture} className='flex items-center gap-2 px-4 py-2 rounded-md bg-black hover:bg-gray-600 text-sm font-medium text-white'>{loading1 ? <TailSpin
                        visible={true}
                        height="25"
                        width="25"
                        color="#4fa94d"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                    /> : "+ Create Lecture"}</button>
                </div>
                <div className='flex flex-col items-center justify-center space-y-2'>
                    {loading ? <TailSpin
                        visible={true}
                        height="25"
                        width="25"
                        color="#4fa94d"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                    /> : lectureDetail?.length == 0 ? <h2 className=''>No lecture in this course yet</h2> : lectureDetail?.map((lecture, index) => {
                        return (
                            <div key={index} className='bg-gray-100 rounded-md flex justify-between items-center p-3 text-sm font-medium text-gray-700 w-full'>
                                <span className=''>Lecture{index + 1}:{lecture?.lectureTitle}</span>
                                <FaEdit onClick={() => navigate(`/editlecture/${lecture?._id}/${courseId}`)} className='text-gray-600 hover:text-blue-600 cursor-pointer' />
                            </div>
                        )
                    })}


                </div>



            </div>
        </div>
    )
}

export default CreateLecture