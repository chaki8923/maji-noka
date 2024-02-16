import React, { useRef, useEffect, useState } from "react";
import { ItemsProps } from "../models/Items.model";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import axios from 'axios';
import { useParams } from 'react-router-dom';
// axios.defaults.baseURL = 'http://api-maji:3000';
axios.defaults.baseURL = 'http://localhost:3003';


const ItemDetail: React.FC = () => {
  console.log(useParams());
  const params = useParams();
  const itemId = params.id;
  
  const [item, setItem] = useState<ItemsProps>()
  const [imageLength, setImageLength] = useState(0)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/item/show/${itemId}`);
      
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {

      }
    };
    fetchData();
  }, []);
  useEffect(() => {
   if(item){
     setImageLength(item.image.length);
     console.log("imageLength",imageLength);
   }
   
 }, [item]);
   // imagesの変更を監視し、imageLengthを更新
   
   if(item === undefined){
     return <p>Loading.....</p>
    }
  const images = item.image
  return <Grid container spacing={4} mt={0} justifyContent="left">
    <Grid item xs={12} sm={6} md={4} key={item.id}>
      <Card variant="outlined" sx={{ maxWidth: 400, height: 408 }}>
      {images.map(image =>
        <CardMedia
          sx={{ height: 220 }}
          image={image}
          title="green iguana"
        />
      )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
</Grid>
}

export default ItemDetail