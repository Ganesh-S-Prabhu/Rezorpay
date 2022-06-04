import { useState } from 'react'
import { Navbar } from './components/navbar/navbar'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import {Homepage} from './components/homepage/homepage'
import {Cartpage} from './components/cart/cart'
import {ItemDisplay} from './components/items/items'

function App() {
  

  return (
    <div className="App">
      <Navbar/>
     <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/cartPage" element={<Cartpage />}></Route>
        <Route path='/item/:id' element={<ItemDisplay/>}></Route>
      </Routes>
    </div>
  )
}

export default App
