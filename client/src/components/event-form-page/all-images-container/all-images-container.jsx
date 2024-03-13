import { useState } from "react"

const AllImagesContainer = ({ eventData, setOpenImagesCorousalModal, imageIndex, setSelectedImage }) => {
    // console.log("AllImagesContainer => ", eventData?.eventImages)

    const handleImagesOnClick = (idx) => {
        setOpenImagesCorousalModal(true)
        setSelectedImage(idx)
    }
    return (
        <ul className='images-list' style={{height:'340px'}} style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)'}}>
            {eventData.map((item, idx) => {
                return (
                    <li key={idx}>
                        <div>
                            <img src={item} onClick={() => handleImagesOnClick(item)} />
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default AllImagesContainer