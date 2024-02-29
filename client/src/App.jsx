import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Signup from './pages/Signup'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route index path="/" element={<Home></Home>}></Route>
      <Route path="signup" element={<Signup></Signup>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App;
