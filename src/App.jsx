import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Inicio from './components/Inicio';
import MainNav from './common/MainNav';
import MainHeader from './common/MainHeader';
import MainFooter from './common/MainFooter';
import Producto from './components/Producto';
import Nosotros from './components/Nosotros';
import ProductoForm from './components/ProductoForm';

export default function App() {

  return (
  
    <>
    <Router>
    <MainHeader/>
    <MainNav/>
    <Routes>
      <Route path='/' element={<Inicio/>}/>
      <Route path='/producto' element={<Producto/>}/>
      <Route path='/nosotros' element={<Nosotros/>}/>
      <Route path='/registro' element={<ProductoForm/>}/>
    </Routes>
    <MainFooter/>
    </Router>
    </>
  )
}
