import axios from 'axios';
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { IoMdArrowBack } from 'react-icons/io';
import { TailSpin } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setCourseDetail } from '../../Store/Slices/course.slice';
import { ServerUrl } from '../../App';

function EditCourse() {
  const { courseId } = useParams();
  const { courseDetail } = useSelector((state) => state.course);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isPublished, setIsPublished] = useState(courseDetail?.find(course => course?._id === courseId)?.isPublished || false);
  const [title, setTitle] = useState(courseDetail?.find(course => course?._id === courseId)?.title || "");
  const [subTitle, setSubTitle] = useState(courseDetail?.find(course => course?._id === courseId)?.subTitle || "");
  const [description, setDescription] = useState(courseDetail?.find(course => course?._id === courseId)?.description || "");
  const [category, setCategory] = useState(courseDetail?.find(course => course?._id === courseId)?.category || "");
  const [level, setLevel] = useState(courseDetail?.find(course => course?._id === courseId)?.level || "");
  const [price, setPrice] = useState(courseDetail?.find(course => course?._id === courseId)?.price || "");
  const [thumbnail, setThumbnail] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2,setLoading2] = useState(false);
  const [frontendImage, setFrontendImage] = useState("");
  const thumbImage = useRef();

  const handleEditCourse = async () => {
    if (!isPublished || !description || !level || !price || !subTitle) {
      toast.error("Please fill all the course before saving changes");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("subTitle", subTitle);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("isPublished", isPublished);
    formData.append("level", level);
    formData.append("price", price);
    formData.append("thumbnail", thumbnail);
    setLoading(true);

    try {
      const response = await axios.post(`${ServerUrl}/course/editcourse/${courseId}`, formData, {
        withCredentials: true
      });
      console.log(response.data);
      const updatedCourses = courseDetail.map(course => course._id === courseId ? response.data : course);
      dispatch(setCourseDetail(updatedCourses));
      toast.success("Course edited successfully");
      setLoading(false);
      navigate("/courses");

    } catch (error) {
      console.log("Edit course Error in frontend", error);
      toast.error("Error editing course");
      setLoading(false);
    }
  }

  const handleRemoveCourse = async () => {
    setLoading2(true);
    try {
      const response = await axios.get(`${ServerUrl}/course/deletecourse/${courseId}`, {
        withCredentials: true
      });
      console.log(response.data);
      const updatedCourses = courseDetail.filter(course => course._id !== courseId);
      dispatch(setCourseDetail(updatedCourses));
      toast.success("Course removed successfully");
      setLoading2(false);
      navigate("/courses");
      
    } catch (error) {
      console.log("Remove course Error in frontend", error);
      toast.error("Error removing course");
      setLoading2(false);
    }
  }





  return (

    <div className='max-w-5xl mx-auto p-6 mt-10 bg-white shadow-md rounded-lg'>
      {/* topbar  */}

      <div className='flex items-center justify-center gap-[20px] md:justify-between flex-col md:flex-row mb-6 relative'>
        <IoMdArrowBack className='absolute top-[-20%] md:top-[20%] left-0 md:left-[2%] w-[22px] h-[22px] cursor-pointer' onClick={() => navigate("/courses")} />

        <h2 className='text-2xl font-semibold md:pl-[60px]'>
          Add detail Information regarding the Course.
        </h2>
        <div className='space-x-2 space-y-2'>
          <button onClick={()=>navigate(`/createlecture/${courseId}`)} className='text-white px-4 py-2 bg-black rounded-md'>Go to Lecture Page</button>
        </div>

      </div>

      {/* form detail */}

      <div className='bg-gray-50 p-6 rounded-md'>
        <h2 className='text-lg font-medium mb-4'>Basic Course Information</h2>
        <div className='space-x-2 space-y-2'>
          {!isPublished ? <button onClick={() => { setIsPublished((prev) => !prev) }} className='text-green-600 px-4 py-2 rounded-md border-1 bg-green-100'>Click To Publish</button> : <button onClick={() => { setIsPublished((prev) => !prev) }} className='text-red-600 px-4 py-2 rounded-md border-1 bg-red-100'>Click To UnPublish</button>}
          <button onClick={handleRemoveCourse} className='text-white px-4 py-2 rounded-md border-1 bg-red-600'>{loading2? <TailSpin
            visible={true}
            height="30"
            width="30"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          /> : "Remove Course"}</button>
        </div>

        <form className='space-y-6'>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="title">Title</label>
            <input value={title} onChange={(e) => { setTitle(e.target.value) }} id='title' type="text" className='w-full border px-4 py-2 rounded-md' placeholder='Enter Course Title' />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="Subtitle">SubTitle</label>
            <input value={subTitle} onChange={(e) => { setSubTitle(e.target.value) }} id='Subtitle' type="text" className='w-full border px-4 py-2 rounded-md' placeholder='Enter Course SubTitle' />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="dis">Description</label>
            <textarea value={description} onChange={(e) => { setDescription(e.target.value) }} id='dis' type="text" className='w-full border px-4 py-2 h-24 resize-none rounded-md' placeholder='Enter Course Description'></textarea>
          </div>

          <div className='flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0'>
            {/* for category */}
            <div className='flex-1'>

              <label htmlFor="cat" className='block text-sm font-medium text-gray-700 mb-1'>Course Category</label>
              <select value={category} onChange={(e) => { setCategory(e.target.value) }} name="" id="cat" className='border w-full px-4 py-2 rounded-md bg-white'>

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

            {/* for level */}
            <div className='flex-1'>

              <label htmlFor="lev" className='block text-sm font-medium text-gray-700 mb-1'>Course Level</label>
              <select value={level} onChange={(e) => { setLevel(e.target.value) }} name="" id="lev" className='border w-full px-4 py-2 rounded-md bg-white'>
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>

            </div>

            {/* for price */}
            <div className='flex-1'>

              <label htmlFor="price" className='block text-sm font-medium text-gray-700 mb-1'>Course Price</label>
              <input value={price} onChange={(e) => { setPrice(e.target.value) }} id='price' type="number" className='w-full border px-4 py-2 rounded-md' placeholder='Enter Course Price' />

            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="thumb">Set Thumbnail</label>
            <input ref={thumbImage} hidden onChange={(e) => { setThumbnail(e.target.files[0]); setFrontendImage(URL.createObjectURL(e.target.files[0])) }} id='thumb' type="file" />
            {frontendImage ? <img onClick={() => { thumbImage.current.click() }} className='w-56 h-32 object-cover rounded-md cursor-pointer' src={frontendImage} alt="thumbnail" /> : <div onClick={() => { thumbImage.current.click() }} className='w-56 h-32 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-md cursor-pointer'>
              <span className='text-gray-500'>Click to upload thumbnail</span>
            </div>}
          </div>


        </form>

        <div className='flex gap-3  items-center justify-start mt-5'>
          <button onClick={() => navigate("/courses")} className='text-black bg-[#e9e8e8] px-4 py-2 rounded-md border-1 hover:bg-red-200'>Cancel</button>
          <button onClick={handleEditCourse} className='text-white px-4 py-2 rounded-md border-1 bg-black'>{loading ? <TailSpin
            visible={true}
            height="40"
            width="40"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          /> : "Save Edit"}</button>
        </div>


      </div>

    </div>
  )
}

export default EditCourse