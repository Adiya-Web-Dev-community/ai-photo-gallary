import './all-videos-container.css'
import { BiLink } from 'react-icons/bi';
import { ImBin } from 'react-icons/im';
import axios from '../../../helpers/axios'
import { toast } from "react-hot-toast";

const AllVideosContainer = ({ eventData, getEventDetails }) => {
    const deleteVideoLink = (array, idx) => {
        //     console.log(array)
        //     console.log(idx)
        const newArray = array.filter((item, index) => {
            if (index != idx) {
                return item
            }
        })
        console.log("newArray => ", newArray)
        axios.patch(`/update-video-links/${eventData._id}`, newArray)
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    toast.success("video link deleted succcessfully!");
                    getEventDetails();
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='all-videos-container'>
            <table>
                <thead>
                    <th><BiLink /></th>
                    <th></th>
                </thead>
                <tbody>
                    {eventData?.eventVideoLinks?.map((videoLink, idx) => {
                        return (
                            <tr>
                                <td>
                                    {videoLink}
                                </td>
                                <td>
                                    <button className='delete-video-link-btn'>
                                        <ImBin onClick={() => deleteVideoLink(eventData.eventVideoLinks, idx)} />
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default AllVideosContainer