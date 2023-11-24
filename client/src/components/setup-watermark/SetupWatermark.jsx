import React from 'react'
import { useNavigate } from 'react-router-dom'


const SetupWatermark = () => {
    const navigate = useNavigate()
    const handleSave=()=>{
        navigate('/gallary')
    }
    
    return (
        <div>
            <h1>WATERMAP SETUP</h1>
            <button onClick={handleSave}>SAVE</button>
        </div>
    )
}

export default SetupWatermark