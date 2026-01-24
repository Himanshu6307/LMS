import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaCircleUser } from "react-icons/fa6";
import { MdArrowBack } from "react-icons/md";
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ServerUrl } from '../App';
import { setUserDetail } from '../Store/Slices/user.slice';
import toast from 'react-hot-toast';
import { TailSpin } from 'react-loader-spinner';

function EditProfile() {
    const { userDetail } = useSelector(state => state.user);
    const navigate = useNavigate()
    const photo = useRef();
    const [name, setName] = useState(userDetail?.name);
    const [description, setDescription] = useState(userDetail?.description);
    const [frontendURL, setFrontendURL] = useState(null);
    const [backendURL, setBackendURL] = useState(null);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

    const handleImageInput = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setBackendURL(file);
        const previewURL = URL.createObjectURL(file);
        setFrontendURL(previewURL);
    };

    const handleUpdate = async () => {
        setLoading(true)
        const form = new FormData()
        form.append("name", name)
        form.append("description", description)
        form.append("photoUrl", backendURL)
        try {
            const response = await axios.post(`${ServerUrl}/user/updateprofile`, form, { withCredentials: true })
            console.log(response.data);
            setLoading(false);
            dispatch(setUserDetail(response.data));
            toast.success("Profile Updated");
            navigate("/profile")

        } catch (error) {
            console.log("Error in frontend update", error);
            setLoading(false);
            toast.error("Error Occured");
        }
    }


    return (
        <div className='w-screen h-screen bg-gray-100 flex justify-center items-center '>
            <div className='bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full relative flex flex-col gap-3'>
                <div onClick={() => { navigate("/profile") }}>
                    <MdArrowBack size={30} />
                </div>
                <div>
                    <label htmlFor="name" className='font-semibold'>Name</label>
                    <input className='border-1 w-[100%] h-[55px] rounded-xl border-[#e7e6e6] text-[15px] px-[20px] py-4' onChange={(e) => { setName(e.target.value) }} id='name' type="text" placeholder='Enter Your name' value={name} />
                </div>
                <div>
                    <label htmlFor="description" className='font-semibold'>Description</label>
                    <input className='border-1 w-[100%] h-[55px] rounded-xl border-[#e7e6e6] text-[15px] px-[20px] py-4' onChange={(e) => { setDescription(e.target.value) }} id='description' type="text" placeholder='Enter Your description' value={description} />
                </div>
                <div className='flex flex-col justify-center items-center gap-2'>
                    <input hidden id='image' ref={photo} type="file" accept="image/*" onChange={handleImageInput} />

                    {!frontendURL && <div onClick={() => { photo.current.click() }} className='h-[160px] w-[160px] rounded-full'><FaCircleUser className='h-[100%] w-[100%]' /></div>}
                    {frontendURL && <div className='border-2 border-black h-[160px] w-[160px] rounded-full overflow-hidden'>
                        <img src={frontendURL} alt="" className='h-full w-full object-cover' />
                    </div>}

                    <label htmlFor="image" className='font-semibold'>Choose Profile Photo</label>
                </div>

                <button onClick={handleUpdate} className='flex justify-center items-center px-7 py-4 text-xl bg-black rounded-xl text-white'>{loading ? <TailSpin
                    visible={true}
                    height="40"
                    width="40"
                    color="#4fa94d"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                /> : "Save Profile"}</button>
            </div>
        </div>
    )
}

export default EditProfile