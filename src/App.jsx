import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import {Navigate} from "react-router-dom"

import Layout from './components/Layout/Layout';
import Loader from './components/Loader/Loader';


const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const CardsPage = lazy(() => import('./pages/CardsPage/CardsPage'));
const CardPage = lazy(() => import('./pages/CardPage/CardPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage/FavoritesPage'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));




function App() {


  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="cards" element={<CardsPage />} />
          <Route path="cards/:cardId" element={<CardPage />} />
             <Route path="favorites" element={<FavoritesPage />} />
       favorites
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
