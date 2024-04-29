// src/hooks/useCart.ts

import cookie from 'js-cookie';
import { useState, useEffect } from 'react';
import { CartItem } from '../types';

export const useCart = () => {

  const [cart, setCart] = useState<CartItem[]>([]);
  useEffect(() => {
    const currentCartJson = cookie.get('cart') || '[]';
    console.log("currentCartJson", currentCartJson);
    
    setCart(JSON.parse(currentCartJson));
  }, []); // 

  const cartItemIds = cart.map((item) => item.id);
  
  /* カートへ追加 */
  const addCart = (addedItem: CartItem, quantity: number) => {
    if (cartItemIds.includes(addedItem.id)) {
      const newCart = cart.map((item) => {
        if (item.id === addedItem.id) {
          return {
            ...item,
            quantity: quantity
          };
        }
        return item;
      });
      setCart(newCart);
    } else {
      setCart([...cart, { ...addedItem, quantity: quantity }]);
    }
  };

  /* カートから削除 */
  const removeCart = (removedItem: CartItem) => {
    // if (!cartItemIds.includes(removedItem.id)) return;
    const newCart = cart.filter(item => item.id !== removedItem.id);

    setCart(newCart);
  };

  console.log("クッキー入れる前", cart);
  console.log("クッキー入れる前個数", cart.length);
  
  if(cart && JSON.stringify(cart).length !== 0){
  useEffect(() => {
      cookie.set('cart', JSON.stringify(cart), { expires: 3600 });
    }, [cart]);
  }


  return {
    cart,
    addCart,
    removeCart,
  };
};
