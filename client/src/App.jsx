import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Navbar from './components/Navbar'
import NavbarGuest from './components/NavbarGuest'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import { useUser } from './hooks/useUser'

function App() {
  const key = useUser();

  return (
    <BrowserRouter>
    {key ? <Navbar></Navbar> : <NavbarGuest></NavbarGuest>}
    <Routes>
      <Route index path="/" element={<Home></Home>}></Route>
      <Route path="home" element={<Home></Home>}></Route>
      <Route path="signup" element={<Signup></Signup>}></Route>
      <Route path="signin" element={<Signin></Signin>}></Route>
      <Route path="about" element={<About></About>}></Route>
      <Route path="dashboard" element={<Dashboard></Dashboard>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App;
