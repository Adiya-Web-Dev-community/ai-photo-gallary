import './register-user.css'
import { useState } from "react"
import { Button, Box, TextField } from '@mui/material'
import axios from '../../helpers/axios'
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const RegisterUser = () => {
    const navigate = useNavigate()
    const [registerForm, setRegisterForm] = useState({ mobile: '', email: '', password: '', reEnterPassword: '' })
    const handleRegisterForm = (e) => {
        setRegisterForm({ ...registerForm, [e.target.name]: e.target.value })
        setErr({ email: false, mobile: false })
    }
    const [err, setErr] = useState({ email: false, mobile: false })
    const [token,setToken] = useState('')

    const postRegisterForm = async () => {
        if (!registerForm.email || !registerForm.mobile || !registerForm.password || !registerForm.reEnterPassword) {
            return toast.error('all the fields are mandatory')
        }
        else if (registerForm.password != registerForm.reEnterPassword) {
            return toast.error('both the passwords are different')
        }
        await axios.post('/user/register', registerForm)
            .then((res) => {
                console.log(res.data.token)
                setToken(res.data.token)
                if (res.data.message == "user found but not verified") {
                    setOtpBox(true)
                }
                if (res.data.success) {
                    setOtpBox(true)
                }
            })
            .catch((err) => {
                if (err.response.data.message == 'email already in use') {
                    setErr({ ...err, email: true })
                }
                else if (err.response.data.message == 'mobile number already in use') {
                    setErr({ ...err, mobile: true })
                }
                console.log(err.response.data.message)
            })
    }

    const [otp, setOtp] = useState(null)
    const [otpBox, setOtpBox] = useState(false)

    const submitOtp = () => {
        const data = { email: registerForm.email, otp: otp }
        axios.put('/user/verify-otp', data)
            .then((res) => {
                // console.log(res.data.success)
                if (res.data.success) {
                    toast.success('Email Verified Successfully!')
                    localStorage.setItem('token', res.data.token)
                    navigate(`/home-page`)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }


    return (
        <div className='container signin-wrapper'>
            <h4>BUSINESS WITH HAYAT MART</h4>
            <h5>Register to create your account</h5>
            <div className='form-wrapper'>

                <Box className='mobilenobtn-wrapper'>
                    <input name='mobile' type="tel" variant="contained" placeholder="Enter Mobile Number" className='btn' onChange={handleRegisterForm} />
                </Box>
                {err.email ? <p>email already in use</p> : null}

                <Box className='googlesignin-wrapper'>
                    <input name="email" type="email" variant="contained" placeholder="Enter Email Address" className='btn' onChange={handleRegisterForm} />
                </Box>
                {err.mobile ? <p>mobile number already in use</p> : null}

                <Box className='mobilenobtn-wrapper'>
                    <input name='password' type="password" variant="contained" placeholder="Set Password" className='btn' onChange={handleRegisterForm} />
                </Box>
                {err.email ? <p>email already in use</p> : null}

                <Box className='googlesignin-wrapper'>
                    <input name="reEnterPassword" type="password" variant="contained" placeholder="Re-enter Password" className='btn' onChange={handleRegisterForm} />
                </Box>

                <Button className='register-btn' onClick={postRegisterForm}>
                    NEXT
                </Button>

                {otpBox ?
                    <>
                        <p>
                            OTP sent to your email
                        </p>
                        <Box className='googlesignin-wrapper'>
                            <input name="email" type="text" variant="contained" placeholder="Enter OTP" className='btn' onChange={(e) => { setOtp(e.target.value) }} />
                        </Box>
                        <Button className='register-btn' onClick={submitOtp}>
                            SUBMIT
                        </Button>
                    </>
                    : null}

            </div>
        </div >
    )
}

export default RegisterUser