import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Navbar from "./components/common/Navbar"

const App = () => {
  return (
    <div className="w-full min-h-screen bg-richblack-900 flex flex-col font-inter" >
      <Navbar/>
      <Routes>
        <Route path = "/" element = {<Home/>} />
        <Route path="signup" element = {<Signup/>} />
        <Route path="login" element = {<Login/>} />
      </Routes>

    </div>

  )
}

export default App
