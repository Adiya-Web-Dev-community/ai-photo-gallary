

import { useNavigate } from 'react-router-dom';
import './eventCard.css'

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const EventCard = ({ event }) => {
    const navigate  = useNavigate()
    return (
        <Card sx={{ maxWidth: 345,borderRadius:'15px',padding:'10px',width:'280px',border:'1px solid',
        borderColor:'rgb(187, 187, 187)'
        }} onClick={() => {navigate(`/event-form-page/${event.eventName}/${event._id}`);}}>
      <CardMedia
        sx={{ height: 100,width:100,margin:'auto' }}
        image={event.qrCode}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {event.eventName}
        </Typography>
        <Typography variant="body2" color="text.secondary">

        </Typography>
        <p>
            {new Date(event.eventDate).toDateString()}
        </p>
      </CardContent>
      <CardActions>
        <Button size="small" sx={{
            color:event.status==='unpublished'?'orange':'green',
            borderColor:event.status==='unpublished'?'orange':'green'
        }}
        variant={'outlined'}
        onClick={() => {navigate(`/event-form-page/${event.eventName}/${event._id}`);}}
        >{event.status==='unpublished'?'Unpublished':'Published'}</Button>
      </CardActions>
    </Card>
    )
}

export default EventCard