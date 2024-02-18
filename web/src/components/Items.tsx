import React, { useRef, useEffect, useState } from "react";
import { ItemsProps } from "../models/Items.model";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom"
axios.defaults.baseURL = 'http://api-maji:3000';
// axios.defaults.baseURL = 'http://localhost:3003';


const Items: React.FC = () => {
  const [items, setItems] = useState<ItemsProps[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/item/index');
        console.log("response", response);
        
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {

      }
    };
    fetchData();
  }, []);

  return <Grid container spacing={4} mt={0} justifyContent="left">
      {items.map(item =>
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <Card variant="outlined" sx={{ maxWidth: 400, height: 408 }}>
            <CardMedia
              sx={{ height: 220 }}
              image={item.image[0]}
              title="green iguana"
            />
            <Link to={`/item/${item.id}`}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.name}
              </Typography>
            </CardContent>
            </Link>
          </Card>
        </Grid>
      )}
    </Grid>
}

export default Items;