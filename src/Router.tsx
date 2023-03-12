import React, { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Welcome = lazy(() => import('./pages/Welcome'));

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/w" element={<Welcome />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
