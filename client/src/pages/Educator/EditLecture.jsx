import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { IoMdArrowBack } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { ServerUrl } from '../../App';
import { TailSpin } from 'react-loader-spinner';

function EditLecture() {
    const navigate = useNavigate();
    const { lectureDetail, loading } = useSelector((state) => state.lecture);
    const { courseId, lectureId } = useParams();
    const [isPreviewFree, setIsPreviewFree] = useState(lectureDetail.find(l => l?._id == lectureId)?.isPreviewFree)
    const [lectureTitle, setLectureTitle] = useState(lectureDetail.find(l => l?._id == lectureId)?.lectureTitle);
    const [loading1, setLoading1] = useState(false);
    const [videoUrl, setVideoUrl] = useState(lectureDetail.find(l => l?._id == lectureId)?.videoUrl || null);
    const dispatch = useDispatch();

    const handleUpdate = async () => {
        setLoading1(true)
        if (!lectureTitle || videoUrl == null) {
            toast.error("All fields are required");
            setLoading1(false);
            return;
        }
        const formData = new FormData();
        formData.append("lectureTitle", lectureTitle);
        formData.append("videoUrl", videoUrl);
        formData.append("isPreviewFree", isPreviewFree);
        try {
            const response = await axios.post(`${ServerUrl}/lecture/editlecture/${courseId}/${lectureId}`, formData, { withCredentials: true });
            console.log(response.data);
            setLoading1(false);
            navigate(`/createlecture/${courseId}`)
            toast.success("Lecture Edited Successfully");
        } catch (error) {
            console.log("error in frontend update lecture", error);
            setLoading1(false)
        }
    }

    const handleRemove =async ()=>{
        try {
            const response = await axios.get(`${ServerUrl}/lecture/deletelecture/${courseId}/${lectureId}`,{ withCredentials: true });
            console.log(response.data);
            navigate(`/createlecture/${courseId}`)
            toast.success("Lecture deleted Successfully");
        } catch (error) {
            console.log("Error in frontend delete lecture", error);
        }
    }

    return (
        <div className='min-h-screen bg-gray-100 flex flex-col gap-4 items-center justify-center p-4'>
            <div className='bg-white shadow-xl rounded-xl w-full max-w-2xl p-6'>
                {/* header section */}

                <div className='space-y-2'>
                    <h1 className='flex gap-2 font-semibold text-xl '><IoMdArrowBack size={23} onClick={() => navigate(`/createlecture/${courseId}`)} />Update Your Lecture</h1>
                    <button onClick={handleRemove} className='px-4 py-2 bg-red-500 hover:bg-red-600 rounded-sm'>Remove Lecture</button>
                </div>
                <div className='w-full mt-4'>
                    <label className='font-semibold' htmlFor="title">Title</label>
                    <input id='title' value={lectureTitle} onChange={(e) => { setLectureTitle(e.target.value) }} className='w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black mb-4' type="text" placeholder='e.g introduction to html' />
                </div>

                <div className='w-full'>
                    <label className='font-semibold' htmlFor="video">Video*</label>
                    <input id='video' onChange={(e) => { setVideoUrl(e.target.files[0]) }} className='w-full border border-gray-300 rounded-md  file:bg-gray-700 file:text-white hover:file:bg-gray-500 file:py-2 file:px-4 file:rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black mb-4' type="file" placeholder='Choose Your Video' accept='video/*' />
                </div>

                <label className="flex gap-2 items-center">
                    <input
                        type="checkbox"
                        className="w-4 h-4 accent-black rounded-md"
                        checked={isPreviewFree}
                        onChange={(e) => {
                            setIsPreviewFree(e.target.checked);
                        }}
                    />
                    Is this video FREE
                </label>

                <button onClick={handleUpdate} disabled={loading1} className='mt-2 w-full rounded-sm text-white py-2 px-4 bg-black hover:bg-gray-700 flex items-center justify-center'>{loading1 ? <TailSpin
                    visible={true}
                    height="30"
                    width="30"
                    color="#4fa94d"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                /> : "Update Lecture"}</button>
            </div>
        </div>
    )
}

export default EditLecture