import React, { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, signUp } from  '../services/operations/authApi';
import { Link, useNavigate } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";


const VerifyEmail = () => {
    const { signupData, loading } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [otp, setOtp] = useState("")

    useEffect(() => {
        if (!signupData) {
            navigate('/signup')
        }
    })
    const handleOnSubmit = (e) => {
        e.preventDefault();

        const { accountType, firstName, lastName, email, password, confirmPassword } = signupData
        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate))
    }
    return (
        <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
            {
                loading ? (
                    <div>Loading...</div>
                ) :

                    (
                        <div className="max-w-125 p-4 lg:p-8">

                            <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-9.5">
                                Verify Email
                            </h1>
                            <p className="text-[1.125rem] leading-6.5 my-4 text-richblack-100">
                                A verification code has been sent to you. Enter the code below</p>

                            <form onSubmit={handleOnSubmit} >

                                <OtpInput
                                    value={otp} onChange={setOtp} numInputs={6}
                                    x style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    containerStyle={{
                                        justifyContent: "space-between",
                                        gap: "0 10px",

                                    }}

                                    renderInput={(props) => <input placeholder='-'  {...props} className="w-12 lg:w-15 border-0 bg-richblack-800 text-2xl placeholder:text-white py-2 px-2   rounded-lg text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                                    />}
                                />

                                <button className="w-full bg-yellow-50 py-3 px-3 rounded-lg mt-6 font-medium text-richblack-900"
                                    type='submit'>Verify Email</button>

                            </form>

                            <div className="mt-6 flex items-center justify-between">
                                <Link to="/signup">
                                    <p className="text-richblack-5 flex items-center gap-x-2">
                                        <BiArrowBack /> Back To Signup
                                    </p>
                                </Link>
                                <button
                                    className="flex items-center text-blue-100 gap-x-2"
                                    onClick={() => dispatch(sendOtp(signupData.email, navigate))}
                                >
                                    <RxCountdownTimer />
                                    Resend it
                                </button>
                            </div>


                        </div>
                    )
            }
        </div>
    )
}

export default VerifyEmail
