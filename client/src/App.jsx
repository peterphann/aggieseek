import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Signup from './pages/Signup'
import Signin from './pages/Signin'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route index path="/" element={<Home></Home>}></Route>
      <Route path="signup" element={<Signup></Signup>}></Route>
      <Route path="signup" element={<Signin></Signin>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App;
