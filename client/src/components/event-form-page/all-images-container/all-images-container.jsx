import { useState } from "react"

const AllImagesContainer = ({ eventData, setOpenImagesCorousalModal, imageIndex, setImageIndex }) => {
    // console.log("AllImagesContainer => ", eventData?.eventImages)

    const handleImagesOnClick = (idx) => {
        setOpenImagesCorousalModal(true)
        console.log("idx => ", idx)
        setImageIndex(idx)
    }
    return (
        <ul className='images-list'>
            {eventData?.eventImages?.map((item, idx) => {
                return (
                    <li key={idx}>
                        <div>
                            <img src={item.image} onClick={() => handleImagesOnClick(idx)} />
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default AllImagesContainer