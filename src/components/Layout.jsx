import { Outlet } from "react-router-dom";
import Sidebar from "../components/shared/Sidebar";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import PostFeed from "./PostFeed";

const Layout = () => {
    return (
        <div>
            <div className="flex flex-row min-h-screen  bg-white">
                 <Sidebar />
                 <div className="flex-1 flex flex-col md:ml-64">
                    <Navbar />
                     <main className="flex-1 overflow-y-auto p-6 justify-center items-center">
                        <Outlet /> 
                    </main>
                    <Footer />

                 </div>

            </div>
        </div>
    )
}

export default Layout
