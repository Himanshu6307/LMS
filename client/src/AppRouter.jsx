import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import { Toaster } from 'react-hot-toast'
import ForgotPassword from './pages/ForgotPassword'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Dashboard from './pages/Educator/Dashboard'
import { useSelector } from 'react-redux'
import Courses from './pages/Educator/Courses'
import CreateCourse from './pages/Educator/CreateCourse'
import EditCourse from './pages/Educator/EditCourse'
import CoursePage from './pages/CoursePage'
import AllCourses from './pages/AllCourses'

function AppRouter() {
        const { userDetail } = useSelector(state => state.user)

    return (
        <BrowserRouter>

            <Toaster position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toasterId="default"
                toastOptions={{
                    // Define default options
                    className: '',
                    duration: 5000,
                    removeDelay: 1000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },

                    // Default options for specific types
                    success: {
                        duration: 3000,
                        iconTheme: {
                            primary: 'green',
                            secondary: 'black',
                        },
                    },
                }}
            />

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signup' element={!userDetail?<SignUp />:<Navigate to={"/"}/>} />
                <Route path='/login' element={!userDetail?<Login />:<Navigate to={"/"}/>} />
                <Route path="/forgotpassword" element={userDetail?<ForgotPassword />:<Navigate to={"/signup"}/>} />
                <Route path="/profile" element={userDetail?<Profile />:<Navigate to={"/signup"}/>} />
                <Route path="/editprofile" element={userDetail?<EditProfile />:<Navigate to={"/signup"}/>} />
                <Route path="/dashboard" element={userDetail?.role==="educator"?<Dashboard />:<Navigate to={"/signup"}/>} />
                <Route path="/courses" element={userDetail?.role==="educator"?<Courses/>:<Navigate to={"/signup"}/>} />
                <Route path="/createcourse" element={userDetail?.role==="educator"?<CreateCourse />:<Navigate to={"/signup"}/>} />
                <Route path="/editcourse/:courseId" element={userDetail?.role==="educator"?<EditCourse />:<Navigate to={"/signup"}/>} />
                <Route path='/coursepage/:courseId' element={<CoursePage/>} />
                <Route path='/allcourse' element={<AllCourses/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter