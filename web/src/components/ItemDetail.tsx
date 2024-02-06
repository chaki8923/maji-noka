import React, { useRef, useEffect, useState } from "react";
import { ItemsProps } from "../models/Items.model";
import axios from 'axios';
import { useParams } from "react-router-dom"
// axios.defaults.baseURL = 'http://api-maji:3000';
axios.defaults.baseURL = 'http://localhost:3003';


const ItemDetail: React.FC = (prop) => {
  console.log(useParams());
  
  const itemId = 20;
  const [item, setItem] = useState<ItemsProps[]>([])
  return <div>
    <p>商品詳細です</p>
  </div>
}

export default ItemDetail