import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Navbar from "./components/common/Navbar"
import ForgotPassword from "./pages/ForgotPassword"
import OpenRoute from "./components/core/Auth/OpenRoute"
import UpdatePassword from "./pages/UpdatePassword"
import VerifyEmail from "./pages/VerifyEmail"
import ProfileDropdown from "./components/core/Auth/ProfileDropdown"

const App = () => {
  return (
    <div className="w-full min-h-screen bg-richblack-900 flex flex-col font-inter" >
      <Navbar/>
      <Routes>
        <Route path = "/" element = {<Home/>} />

        <Route path="signup" element = {
          <OpenRoute>  
          <Signup/>
          </OpenRoute>
          } />

        <Route path="login" element = {
          <OpenRoute>  
          <Login/>
          </OpenRoute>
          } />

        <Route path="forgot-password" element = {
          <OpenRoute>  
          <ForgotPassword/>
          </OpenRoute>
          } />

        <Route path="update-password/:id" element = {
          <OpenRoute>  
          <UpdatePassword/>
          </OpenRoute>
          } />

        <Route path="verify-email" element = {
          <OpenRoute>  
          <VerifyEmail/>
          </OpenRoute>
          } />
         
      </Routes>

    </div>

  )
}

export default App
