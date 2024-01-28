import React, { useRef, useEffect, useState } from "react";
import { ItemsProps } from "../models/Items.model";
import axios from 'axios';
axios.defaults.baseURL = 'http://api-maji:3000';


const Items: React.FC = () => {
  const [items, setItems] = useState<ItemsProps[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/item/index');
        console.log(response.data);
        
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {

      }
    };

    fetchData();
  }, []);


  return <div>
    {items.map(item => <li key={item.id}>
      <span>{item.name}</span>
    </li>)}
  </div>
}

export default Items;