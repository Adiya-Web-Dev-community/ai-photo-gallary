import './unpublished-images-container.css'
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import axios from '../../../helpers/axios'
import { toast } from 'react-hot-toast';

const UnpublishedImagesContainer = ({ eventData, getEventDetails }) => {
    // console.log("UnpublishedImagesContainer => ", eventData?.eventImages)

    const publishImage = (idx) => {
        console.log(eventData?.eventImages)
        console.log(idx)
        const publishedImagesArr = eventData?.eventImages.filter((item, index) => {
            if (index == idx) {
                item.published = true
                console.log(item.published)
            }
            return item
        })
        console.log(publishedImagesArr)
        axios.patch(`/update-event-images/${eventData._id}`, publishedImagesArr)
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    toast.success('image updated to be published')
                    getEventDetails();
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <ul className='images-list'>
            {eventData?.eventImages?.map((item, idx) => {
                return (
                    <li key={idx}>
                        {!item.published == true ?
                            <div>
                                <img src={item.image} />
                                <p className='publish-delete-image'>
                                    <p>
                                        <button onClick={() => publishImage(idx)}>
                                            publish
                                        </button>
                                    </p>
                                    <p>
                                        <button>
                                            delete
                                        </button>
                                    </p>
                                </p>
                            </div>
                            : null}
                    </li>
                )
            })}
        </ul >
    )
}

export default UnpublishedImagesContainer