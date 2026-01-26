import React, { useEffect, useState } from 'react'
import { FaRegStar } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import Card from './Card'

function CardPage() {

    const {courseDetail} = useSelector(state=>state.course)
    const [popularCourses,setPopularCourses] = useState([])

    useEffect(()=>{
        const popular = courseDetail?.filter(course=>course?.isPublished).slice(0,6);
        setPopularCourses(popular)
    },[courseDetail])

  return (
    <div className='relative flex items-center justify-center flex-col'>
       
        <h1 className='md:text-[45px] text-[30px] font-semibold text-center mt-[30px] px-[20px] '>
            Our Popular Course
        </h1>
        <span className='lg:w-[50%] md:w-[80%] text-[15px] text-center mt-[30px] mb-[30px] px-[20px]'>Explare top rated course designed to boost your skills ,enhance career and unlock oppurtunities in tech,AI,business,and Beyond. </span>

        <div className='w-[100%] min-h-[100vh] flex items-center justify-center flex-wrap gap-[50px] lg:p-[50px] md:p-[30px] p-[10px] mb-[40px]'>
            {popularCourses?.map((course,index)=>{
                return(
                  <Card key={index} title={course?.title} category={course?.category} price={course?.price} thumbnail={course?.thumbnail} id={course?._id}/> 
                )
            })}
        </div>
    </div>
  )
}

export default CardPage