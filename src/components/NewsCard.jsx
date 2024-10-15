
// import React from 'react';
import { Card, CardContent,CardMedia,Typography, CardActionArea } from '@mui/material';

// eslint-disable-next-line react/prop-types
const NewsCard = ({ title, description, imageUrl, url }) => {
  
  return (
    <Card sx={{ maxWidth: 345, margin: '20px' }}>
      <CardActionArea href={url} target="_blank"> 
         <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default NewsCard;
