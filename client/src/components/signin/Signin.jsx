import React, { useState } from 'react'
import './Signin.css'
import { Button, Box, TextField } from '@mui/material'
import { Icon } from 'react-icons-kit'
import { cross } from 'react-icons-kit/icomoon/cross'
import { useNavigate } from 'react-router-dom';
import firebaseApp from './firebase_config'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast } from "react-hot-toast";
import axios from '../../helpers/axios'
import CircularProgress from '@mui/material/CircularProgress';

const auth = getAuth(firebaseApp);
const Signin = () => {
    const navigate = useNavigate()

    const [signInBtnActive, setSignInBtnActive] = useState(false)
    const [signInForm, setSignInForm] = useState({ email: '', password: '' })

    const postSignIn = async () => {
        setSignInBtnActive(true)
        if (!signInForm.email || !signInForm.password) {
            setSignInBtnActive(false)
            return toast.error('all the fields are mandatory')
        }
        await axios.post('/sign-in', signInForm)
            .then((res) => {
                console.log(res)
                if (res.data.message == 'Signin Successful') {
                    localStorage.setItem('token', res.data.token)
                    navigate('/dashboard-details')
                }
            })
            .catch((err) => {
                console.log(err)
                setSignInBtnActive(false)
            })
        setSignInBtnActive(false)
    }

    return (
        <div className='container signin-wrapper'>
            <h4>BUSINESS WITH HAYAT MART</h4>
            <h5>Sign In to access your Dashboard</h5>
            <div className='form-wrapper'>

                <Box className='mobilenobtn-wrapper'>
                    <input placeholder='Email' className='btn'
                        onChange={(e) => setSignInForm({ ...signInForm, email: e.target.value })} />
                </Box>
                <Box className='mobilenobtn-wrapper'>
                    <input placeholder='Password' className='btn'
                        onChange={(e) => setSignInForm({ ...signInForm, password: e.target.value })} />
                </Box>
                <Box className='googlesignin-wrapper'>
                    <button variant="contained" className='signin-submit-btn' disabled={signInBtnActive}
                        onClick={postSignIn}>
                        {signInBtnActive
                            ?
                            <CircularProgress color="inherit" />
                            :
                            <span>Sign in</span>}
                    </button>
                </Box>
                <p className='dont-have-account-option'>
                    dont have an account? <span style={{ color: 'red', fontWeight: '500', cursor: 'pointer' }}
                        onClick={() => navigate('register-new-user')}>register</span>
                </p>
            </div>
        </div>
    )
}

export default Signin