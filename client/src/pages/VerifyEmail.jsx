import React, { useEffect } from 'react'
import OtpInput from 'react-otp-input';
import { useDispatch } from 'react-redux';
import { signUp } from '../services/operations/authApi';
import { useNavigate } from 'react-router-dom';


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
        <div className='text-white'>
            {
                loading ? (
                    <div>Loading...</div>
                ) :

                    (
                        <div>
                            <h1>Verify Email</h1>
                            <p>A verification code has been sent to you. Enter the code below</p>

                            <form onSubmit={handleOnSubmit} >

                                <OtpInput
                                    value={otp} onChange={setOtp} numInputs={6}
                                    renderInput={(props) => <input {...props} />}
                                />

                                <button type='submit'>Verify Email</button>

                            </form>


                            <div>
                                <div className='mt-4 flex font-inter gap-2 items-center text-richblack-5 '>
                                    <FaLongArrowAltLeft />
                                    <Link to='/login'>
                                        <p>Back to Login</p>
                                    </Link>
                                </div>

                                <button onClick={() => dispatch(sendOtp(signupData.email))}> Resend it</button>


                            </div>


                        </div>
                    )
            }
        </div>
    )
}

export default VerifyEmail
