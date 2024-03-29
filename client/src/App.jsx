import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import ForgotPassword from './pages/ForgotPassword'
import pyramids from "./assets/pyramids.svg"

function App() {

  return (
    <BrowserRouter>
    <Navbar></Navbar>
    <Routes>
      <Route index path="/" element={<Home></Home>}></Route>
      <Route path="home" element={<Home></Home>}></Route>
      <Route path="signup" element={<Signup></Signup>}></Route>
      <Route path="signin" element={<Signin></Signin>}></Route>
      <Route path="dashboard" element={<Dashboard></Dashboard>}></Route>
      <Route path="settings" element={<Settings></Settings>}></Route>
      <Route path="profile" element={<Profile></Profile>}></Route>
      <Route path="forgotpassword" element={<ForgotPassword></ForgotPassword>}></Route>

    </Routes>
    <img src={pyramids} alt="" className="fixed bottom-0 -z-10" />
    </BrowserRouter>
  )
}

export default App;
