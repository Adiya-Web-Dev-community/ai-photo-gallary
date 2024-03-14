import './all-videos-container.css'
import { BiLink } from 'react-icons/bi';
import { ImBin } from 'react-icons/im';
import axios from '../../../helpers/axios'
import { toast } from "react-hot-toast";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';

const AllVideosContainer = ({ eventData, getEventDetails,onClick }) => {
  const {eventId} = useParams()
    const deleteVideoLink = (id) => {
        const token = localStorage.getItem('token')
        console.log('ekjbf')
      
        axios.delete(`/event/${eventId}/youtube-links/${id}`, {
            headers: {
                authorization: token
            }
        })
            .then((res) => {
                if (res.data) {
                    toast.success("video link deleted succcessfully!");
                    getEventDetails();
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }


    return (
        <div  style={{padding:'5px',overflowY:'scroll',height:'350px'}}>
          
                    {eventData?.map((el, idx) => {
                        return  <Card key={idx} sx={{marginTop:'10px',padding:'5px',display:'flex',
                        justifyContent:'space-between', border:'1px solid #D3D3D3'

                        }}>
                          <img
                            src={el.thumbnail}
                            style={{backgroundImage:`url(${el.thumbnail})`,height:'150px',width:'150px',
                            border:'1px solid'
                        }}
                            />
                          <div>
                          <p variant="h5" component="div">
        <strong>Title</strong> {el.title}
      </p>
      <p >
        <strong>Description</strong> {el.description?.length > 40 ? el.description.substring(0, 40) + '...' : el.description}
      </p>
      <a href={el.link} style={{ marginBottom: '5px', display: 'block' }}>
        <strong>Link</strong> 

        {el.link?.length > 40 ? el.link.substring(0, 40) + '...' : el.description}
      </a>
                          <Button size='small' variant='outlined' sx={{margin:'0px 5px 0px 0px'}}
                          onClick={()=>{deleteVideoLink(el._id)}}
                          >Delete</Button>
                          <Button size='small' variant='outlined'
                          onClick={()=>onClick(el)} 
                          >Edit</Button>
                          </div>
                      </Card>
                    })}
                {/* </tbody>
            </table> */}
        </div>
    )
}

export default AllVideosContainer