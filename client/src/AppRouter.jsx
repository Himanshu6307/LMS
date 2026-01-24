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
                <Route path='/signup' element={<SignUp />} />
                <Route path='/login' element={<Login />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/editprofile" element={<EditProfile />} />
                <Route path="/dashboard" element={userDetail?.role==="educator"?<Dashboard />:<Navigate to={"/signup"}/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter