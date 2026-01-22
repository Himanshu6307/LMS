import axios from "axios"
import { useEffect } from "react"
import { ServerUrl } from "../App"
import { useDispatch } from "react-redux"
import { setLoading, setUserDetail } from "../Store/Slices/user.slice"

const useGetCurrentUser = () => {
    const dispatch = useDispatch()
    useEffect(() => {

        (async () => {
            try {
                dispatch(setLoading(true))
                const response = await axios.get(`${ServerUrl}/user/getcurrentuser`, { withCredentials: true });
                console.log(response.data);
                dispatch(setLoading(false))
            } catch (error) {
              console.log("Error in GetCurrentUser hooks",error)
            }

        })()

    }, [dispatch])
}

export default useGetCurrentUser