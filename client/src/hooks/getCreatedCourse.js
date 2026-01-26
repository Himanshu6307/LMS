import axios from "axios"
import { useEffect } from "react"
import { ServerUrl } from "../App"
import { useDispatch, useSelector } from "react-redux"
import {setLoading,setCourseDetail } from "../Store/Slices/course.slice"

const useGetCreatedCourse = () => {
    const dispatch = useDispatch()
    useEffect(() => {

        (async () => {
            try {
                dispatch(setLoading(true))
                const response = await axios.get(`${ServerUrl}/course/getcreatedcourse`, { withCredentials: true });
                // console.log(response.data);
                dispatch(setCourseDetail(response.data))
                dispatch(setLoading(false))
            } catch (error) {
              console.log("Error in GetCurrentUser hooks",error)
              dispatch(setLoading(false))
            }

        })()

    }, [dispatch])
}

export default useGetCreatedCourse