
'use client';
import React, { useState, useEffect } from 'react';
import { HiCheck } from "react-icons/hi";
import { TbShoppingCartPin } from "react-icons/tb";
import { Toast } from 'flowbite-react';
import styles from '../../../styles/fade.module.css';

interface FadeModalProps {
  isCart: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  closeModal: () => void;
  message: string;
}


const Component: React.FC<FadeModalProps> = ({ isCart, setIsVisible, closeModal, message }) => {
  const [isVisible, setIsVisibleLocal] = useState(false);
  useEffect(() => {
    // 親から渡された isCart の値が true の場合にローカルの isVisible も true に設定
    if (isCart) {
      setIsVisibleLocal(true);
      const fadeTimer = setTimeout(() => {
        // アニメーション終了後の処理（例えば、コンポーネントを完全に削除する）
        setIsVisibleLocal(false);
      }, 1000);
      const closeTimer = setTimeout(() => {
        closeModal(); 
      }, 1500); // アニメーションの継続時間と一致させる
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(closeTimer);
      };
    }
  }, [isCart]);

  return (
    <div className={`${styles.fadeOut} ${!isVisible ? styles.hide : ''}`}>
      <Toast className={styles.container}>
        <>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">{message}</div>
        </>
      </Toast>
    </div>
  );
}

export default Component;