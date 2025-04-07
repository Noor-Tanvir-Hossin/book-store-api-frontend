import { Outlet } from "react-router-dom"
import Navbar from './Navbar';
import Footer from "../ui/Footer";

const MainLayout = () => {
  return (
    <div className="container w-[80%] mx-auto">
        <Navbar></Navbar>
        <div className="min-h-screen mt-12" >
            <Outlet/>
        </div>
        <Footer></Footer>
    </div>
  )
}

export default MainLayout