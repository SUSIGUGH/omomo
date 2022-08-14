import './App.css';
import Header from './pages/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Checkout from './pages/Checkout';
import {useState} from 'react'
import RegisterUser from './pages/RegisterUser';

function App() {
  const token=localStorage.getItem('status');
  if(!token === 'success') {
    return <Login />
  }
  return (
  
  
    <Router>
      <Header />
      <div>
        <Routes>
          <Route path='/' element={ <Home />} />
          <Route path='/cart' element={ <Cart />} />
          <Route path='/checkout' element={ <Checkout />} />  
          <Route path='/login' element={ <Login />} />  
          <Route path='/register' element={ <RegisterUser />} />     
        </Routes>
      </div>
    </Router>
   
  );
}

export default App;
