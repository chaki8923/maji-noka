import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemDetail from "../components/ItemDetail";

const RouterConfig: React.FC =() => {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/item" element={<ItemDetail />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default RouterConfig;