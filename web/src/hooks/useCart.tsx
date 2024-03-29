// src/hooks/useCart.ts

import cookie from 'js-cookie';
import { useState, useEffect } from 'react';
import { CartItem } from '../types';
import { Items } from "../models/items"

export const useCart = () => {
  const currentCartJson = cookie.get('cart') || '[]';
  const [cart, setCart] = useState<CartItem[]>(JSON.parse(currentCartJson));
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
      setCart([...cart, { ...addedItem, quantity: 1 }]);
    }
  };

  /* カートから削除 */
  const removeCart = (removedItem: Items, quantity: number) => {
    if (!cartItemIds.includes(removedItem.id)) return;
    const newCart = cart
      .map((item) => {
        if (item.id === removedItem.id) {
          return {
            ...item,
            quantity: quantity
          };
        }
        return item;
      }).filter((item) => quantity);

    setCart(newCart);
  };

  useEffect(() => {
    cookie.set('cart', JSON.stringify(cart), { expires: 1 });
  }, [cart]);

  return {
    cart,
    addCart,
    removeCart,
  };
};
