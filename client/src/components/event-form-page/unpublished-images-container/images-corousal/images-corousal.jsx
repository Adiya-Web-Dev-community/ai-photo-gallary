import './images-corousal.css'

const ImagesCorousal = ({
    eventData,
    imageIndex,
    setImageIndex,
    getEventDetails,
    imagesCorousalArr,
    setImagesCorousalArr,
    handleCloseImagesCorousalModal }) => {

    // console.log('imageIndex =>', imageIndex)
    return (
        <>
            <p onClick={handleCloseImagesCorousalModal}>Cross</p>
            Images Corousal
        </>
    )
}

export default ImagesCorousal