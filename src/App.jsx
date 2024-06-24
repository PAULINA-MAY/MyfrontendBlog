import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './features/login'
import Register from './features/register'

import Home from './features/home'
import Publishes from './features/publishes'

function App() {


  return (
    <>
         <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route> 
        <Route path='/Register' element={<Register />}></Route> 
        <Route path='/Home' element={<Home />}></Route> 
        <Route path='/Publishes' element = {<Publishes/>}></Route>
      </Routes>
    </BrowserRouter>
  
    </>
  )
}

export default App
