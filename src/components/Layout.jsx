import { Outlet } from "react-router-dom";
import Sidebar from "../components/shared/Sidebar";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const Layout = () => {
    return (
        <div>
            <div className="flex flex-row min-h-screen bg-gray-100">
                 <Sidebar />
                 <div className="flex-1 flex flex-col">
                    <Navbar />
                     <main className="flex-1 overflow-y-auto p-6">
                        <Outlet /> 
                    </main>
                    <Footer />

                 </div>

            </div>
        </div>
    )
}

export default Layout
