import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { getPasswordResetToken } from '../services/operations/authApi'

const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false)
    const [email, setEmail] = useState("")
    const { loading } = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    const handleOnSubmit = (e) =>{
           e.preventDefault();
           dispatch(getPasswordResetToken(email, setEmailSent))
    }

    return (
        <div className='text-white'>
            {
                loading ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        <h1>
                            {
                                !emailSent ? "Reset Your Password" : "Check your email"
                            }
                        </h1>

                        <p>
                            {
                                !emailSent ? "Have no fear, we'll email you a link to reset your password. If you don't see the email, check your spam folder." : `We have sent the reset email to ${email}`
                            }
                        </p>

                        <form onSubmit={handleOnSubmit}>
                            {
                                !emailSent && (
                                    <label>
                                        <p>Email Address</p>
                                        <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='Enter your email address' />
                                    </label>
                                )
                            }

                            <button type='submit'>
                                {
                                    !emailSent ? "Reset Password" : "Resend Email"
                                }
                            </button>
                        </form>

                        <div>
                            <Link to = '/login'> 
                            <p>Back to Login</p>
                            </Link>
                        </div>



                    </div>
                )
            }
        </div>
    )
}

export default ForgotPassword
