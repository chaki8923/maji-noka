import React, { useRef, useEffect, useState } from "react";
import { ItemsProps } from "../models/Items.model";
import axios from 'axios';
axios.defaults.baseURL = 'http://api-maji:3000';


const ItemDetail: React.FC = () => {
  const itemId = 20;
  const [item, setItem] = useState<ItemsProps[]>([])
  return <div>
    <p>商品詳細</p>
  </div>
}

export default ItemDetail