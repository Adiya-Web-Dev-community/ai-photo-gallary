import { useState } from 'react';
import './set-password.css'
import { toast } from "react-hot-toast";
import axios from '../../helpers/axios'

const SetPassword = () => {

    const [pass, setPass] = useState({ password: "", reEnterPassword: "" })

    const submitPassword = async () => {
        if (!pass.password || !pass.reEnterPassword) {
            return toast.error('both the password fields are mandatory')
        }
        else if (pass.password != pass.reEnterPassword) {
            return toast.error('both the passwords are different')
        }
        await axios.post('/set-password', pass)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    return (
        <div className='container signin-wrapper'>
            <h4>BUSINESS WITH HAYAT MART</h4>
            <h5>Set Password</h5>
            <div className='set-password-container'>
                <section>
                    <input className='set-password-ip' placeholder="set password"
                        onChange={(e) => setPass({ ...pass, password: e.target.value })} />
                </section>
                <section>
                    <input className='set-password-ip' placeholder="re-enter password"
                        onChange={(e) => setPass({ ...pass, reEnterPassword: e.target.value })} />
                </section>
                <section>
                    <button className='set-password-submit-btn' onClick={submitPassword}>
                        submit
                    </button>
                </section>
            </div>
        </div>
    )
}

export default SetPassword