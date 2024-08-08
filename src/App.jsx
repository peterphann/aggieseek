import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Signup from './pages/Signup'
import Login from './pages/Login.jsx'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import ForgotPassword from './pages/ForgotPassword'
import pyramids from "./assets/pyramids.svg"
import "./firebase"

function App() {

  return (
    <BrowserRouter>
    <Navbar></Navbar>
    <Routes>
      <Route index path="/" element={<Home></Home>}></Route>
      <Route path="home" element={<Home></Home>}></Route>
      <Route path="signup" element={<Signup></Signup>}></Route>
      <Route path="signin" element={<Login></Login>}></Route>
      <Route path="dashboard" element={<Dashboard></Dashboard>}></Route>
      <Route path="settings" element={<Settings></Settings>}></Route>
      <Route path="profile" element={<Profile></Profile>}></Route>
      <Route path="forgotpassword" element={<ForgotPassword></ForgotPassword>}></Route>

    </Routes>
    <img src={pyramids} alt="" className="fixed bottom-0 -z-10 w-screen"/>
    </BrowserRouter>
  )
}

export default App;
