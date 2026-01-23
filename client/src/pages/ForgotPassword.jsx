import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ServerUrl } from '../App';
import toast from 'react-hot-toast';
import axios from 'axios';
import { IoEyeSharp } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { InfinitySpin } from 'react-loader-spinner';


const ForgotPassword = () => {

    const URL_1 = `${ServerUrl}/user/forgotpass`;
    const URL_2 = `${ServerUrl}/user/verifyotp`;
    const URL_3 = `${ServerUrl}/user/setpassword`;

    const [step, setStep] = useState(1);   // start from step 1
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword_1, setShowPassword_1] = useState(false);

    const [clicked, setClicked] = useState({
        email: false,
        password: false,
        confirmPassword: false,
        otp: false
    });

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({
        email: "",
        otp: "",
        password: "",
        confirmPassword: ""
    });

    const handleInputChange = (e) => {
        setUserDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClicked = (e) =>
        setClicked((prev) => ({ ...prev, [e.target.id]: true }));


    // Send OTP
    const handleOtp = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                URL_1,
                userDetails,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            setLoading(false);
            console.log(response?.data);

            if (response?.data?.success) {
                toast.success("OTP Sent Successfully");
                setStep(2);
            } else {
                toast.error(response?.data?.message || "Failed to send OTP");
            }

        } catch (error) {
            setLoading(false);
            toast.error("Some Error Occurred");

            if (error.response) console.log("Error response:", error.response.data);
            else console.log("Error:", error.message);
        }
    };


    //  Verify OTP
    const verifyOtp = async () => {
        setLoading(true);

        try {
            const response = await axios.post(
                URL_2,
                userDetails,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            setLoading(false);
            console.log(response?.data);

            if (response?.data?.success) {
                toast.success("OTP Verified!");
                setStep(3);
            } else {
                toast.error(response?.data?.message || "Invalid OTP");
            }

        } catch (error) {
            setLoading(false);
            toast.error("Some Error Occurred");

            if (error.response) console.log("Error response:", error.response.data);
            else console.log("Error:", error.message);
        }
    };


    // Set New Password
    const setPassword = async () => {

        if (userDetails?.password !== userDetails?.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                URL_3,
                userDetails,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            setLoading(false);
            console.log(response?.data);

            if (response?.data?.success) {
                toast.success("Password Updated!");
                navigate('/login');
                setStep(1);
            } else {
                toast.error(response?.data?.message || "Could not update password");
            }

        } catch (error) {
            setLoading(false);
            toast.error("Some Error Occurred");

            if (error.response) console.log("Error response:", error.response.data);
            else console.log("Error:", error.message);
        }
    };


    return (
        <>


            {step === 1 && (
                <div className='bg-black h-screen w-full flex justify-center items-center'>
                    <div className='bg-white gap-2.5 rounded-2xl h-[300px] w-[95%] lg:max-w-[30%] flex flex-col justify-center items-center overflow-hidden border-2 border-[#1a1f23]'>

                        <h1 className='font-semibold text-2xl '>Forgot Password</h1>

                        <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black'
                            onClick={handleClicked}>
                            <label htmlFor="email"
                                className={`absolute left-5 ${clicked.email ? "top-[-14px]" : ""} bg-white`}>
                                Email
                            </label>

                            <input type="email" id="email" className='w-full h-full rounded-2xl border-0 outline-none p-[20px]'
                                onChange={handleInputChange} />
                        </div>

                        <button
                            onClick={handleOtp}
                            className='w-[90%] h-[50px] bg-black text-white rounded-2xl mt-[20px] font-semibold hover:bg-gray-800 transition-all duration-300 flex justify-center items-center'
                        >
                            {loading ? (
                                <InfinitySpin
                                    width="200"
                                    color="#4fa94d"
                                />
                            ) : (
                                "Send OTP"
                            )}
                        </button>

                    </div>
                </div>
            )}


            {step === 2 && (
                <div className='bg-black h-screen w-full flex justify-center items-center'>
                    <div className='bg-white gap-2.5 rounded-2xl h-[300px] w-[95%] lg:max-w-[30%] flex flex-col justify-center items-center overflow-hidden border-2 border-[#1a1f23]'>

                        <h1 className='font-semibold text-2xl '>Verify OTP</h1>

                        <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black'
                            onClick={handleClicked}>

                            <label htmlFor="otp"
                                className={`absolute left-5 ${clicked.otp ? "top-[-14px]" : ""} bg-white`}>
                                OTP
                            </label>

                            <input type="text" id="otp" className='w-full h-full rounded-2xl border-0 outline-none p-[20px]'
                                onChange={handleInputChange} />
                        </div>

                        <button
                            onClick={verifyOtp}
                            className='w-[90%] h-[50px] bg-black text-white rounded-2xl mt-[20px] font-semibold hover:bg-gray-800 transition-all duration-300 flex justify-center items-center'
                        >
                            {loading ? <InfinitySpin
                                width="200"
                                color="#4fa94d"
                            /> : "Verify OTP"}
                        </button>

                    </div>
                </div>
            )}

            {step === 3 && (
                <div className='bg-black h-screen w-full flex justify-center items-center'>
                    <div className='bg-white gap-2.5 rounded-2xl h-[450px] w-[95%] lg:max-w-[30%] flex flex-col justify-center items-center overflow-hidden border-2 border-[#1a1f23]'>

                        <h1 className='font-semibold text-2xl'>Set New Password</h1>

                        <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black'
                            onClick={handleClicked}>

                            <label htmlFor="password"
                                className={`absolute left-5 ${clicked.password ? "top-[-14px]" : ""} bg-white`}>
                                Password
                            </label>

                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className='w-full h-full rounded-2xl border-0 outline-none p-[20px]'
                                onChange={handleInputChange}
                            />

                            {!showPassword ?
                                <IoEyeSharp className='absolute right-5 cursor-pointer h-[25px] w-[25px]'
                                    onClick={() => setShowPassword(true)} />
                                :
                                <IoMdEyeOff className='absolute right-5 cursor-pointer h-[25px] w-[25px]'
                                    onClick={() => setShowPassword(false)} />
                            }

                        </div>


                        <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black'
                            onClick={handleClicked}>

                            <label htmlFor="confirmPassword"
                                className={`absolute left-5 ${clicked.confirmPassword ? "top-[-14px]" : ""} bg-white`}>
                                Confirm Password
                            </label>

                            <input
                                type={showPassword_1 ? "text" : "password"}
                                id="confirmPassword"
                                className='w-full h-full rounded-2xl border-0 outline-none p-[20px]'
                                onChange={handleInputChange}
                            />

                            {!showPassword_1 ?
                                <IoEyeSharp className='absolute right-5 cursor-pointer h-[25px] w-[25px]'
                                    onClick={() => setShowPassword_1(true)} />
                                :
                                <IoMdEyeOff className='absolute right-5 cursor-pointer h-[25px] w-[25px]'
                                    onClick={() => setShowPassword_1(false)} />
                            }

                        </div>


                        <button
                            onClick={setPassword}
                            className='w-[90%] h-[50px] bg-black text-white rounded-2xl mt-[20px] font-semibold hover:bg-gray-800 transition-all duration-300 flex justify-center items-center'
                        >
                            {loading ? <InfinitySpin
                                width="200"
                                color="#4fa94d"
                            /> : "Set New Password"}
                        </button>

                    </div>
                </div>
            )}

        </>
    );
};

export default ForgotPassword;
