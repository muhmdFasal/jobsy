import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';


export default function Sidebar() {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);


    useEffect(() => {
        fetch("http://localhost:5000/api/posts")
            .then((res) => res.json())
            .then((data) => setPosts(data))
            .catch((err) => {
                console.error("Failed to load posts:", err);
                toast.error("Failed to load posts");
            });
    }, []);


    const toggleMobileSidebar = () => {
        setMobileSidebarOpen(!mobileSidebarOpen);
    };


    const handleLogout = () => {
        localStorage.removeItem("token");
        toast.success("Logged out successfully");
        setTimeout(() => {
            window.location.href = "/";
        }, 1000);
    };


    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            {/* Mobile Toggle Button - Only show when sidebar is closed */}
            {!mobileSidebarOpen && (
                <button
                    onClick={toggleMobileSidebar}
                    className="md:hidden fixed top-4 left-2 z-50 p-2 bg-white border rounded-md shadow-md"
                    aria-label="Toggle sidebar"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            )}

            {/* Removed the black overlay - no more dark background */}

            {/* Desktop Sidebar */}
            <aside className="w-64 bg-white border-r p-4 hidden md:block">
                <div className="mb-4 text-center">
                    <img
                        src="https://i.pravatar.cc/100"
                        className="w-16 h-16 rounded-full mx-auto"
                        alt="Avatar"
                    />
                    <h3 className="font-semibold mt-2">Fasal Jr</h3>
                    <p className="text-sm text-gray-500">fasal@example.com</p>
                </div>


                <nav className="flex flex-col gap-2 text-sm">
                    <Link
                        to="/feed"
                        className="px-3 py-2 rounded hover:bg-yellow-100 transition-colors"
                    >
                        🏠 Home
                    </Link>
                    <Link
                        to="/feed/profile"
                        className="px-3 py-2 rounded hover:bg-yellow-100 transition-colors"
                    >
                        👤Profile
                    </Link>
                    <Link
                        to="/feed/applications"
                        className="px-3 py-2 rounded hover:bg-yellow-100 transition-colors"
                    >
                        📄 My Applications
                    </Link>
                    <Link
                        to="/feed/saved-jobs"
                        className="px-3 py-2 rounded hover:bg-yellow-100 transition-colors"
                    >
                        ⭐ Saved Jobs
                    </Link>
                    <Link
                        to="/feed/posts"
                        className="px-3 py-2 rounded hover:bg-yellow-100 transition-colors"
                    >
                        🧾 My Posts
                    </Link>

                    <button
                       onClick={handleLogout}
                        className="px-3 cursor-pointer py-2 rounded hover:bg-red-100 text-red-600 transition-colors text-left"
                    >
                        🚪 Logout
                    </button>
                </nav>

            </aside>

            {/* Mobile Sidebar */}
            {mobileSidebarOpen && (
                <aside className="fixed top-0 left-0 h-full w-64 bg-white border-r p-4 z-40 md:hidden transform transition-transform duration-300 ease-in-out">
                    {/* Close button for mobile */}
                    <button
                        onClick={toggleMobileSidebar}
                        className="absolute top-4 right-4 p-1 text-gray-500"
                        aria-label="Close sidebar"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    <div className="mb-4 text-center">
                        <img
                            src="https://i.pravatar.cc/100"
                            className="w-16 h-16 rounded-full mx-auto"
                            alt="Avatar"
                        />
                        <h3 className="font-semibold mt-2">Fasal Jr</h3>
                        <p className="text-sm text-gray-500">fasal@example.com</p>
                    </div>

                    <nav className="flex flex-col gap-3 text-sm">
                        <Link
                            to="feed"
                            className="px-3 py-2 rounded hover:bg-yellow-100 transition-colors"
                        >
                            🏠 Home
                        </Link>
                        <Link
                            to="/feed/applications"
                            className="px-3 py-2 rounded hover:bg-yellow-100 transition-colors"
                        >
                            📄 My Applications
                        </Link>
                        <Link
                            to="/feed/saved-jobs"
                            className="px-3 py-2 rounded hover:bg-yellow-100 transition-colors"
                        >
                            ⭐ Saved Jobs
                        </Link>
                        <Link
                            to="/feed/posts"
                            className="px-3 py-2 rounded hover:bg-yellow-100 transition-colors"
                        >
                            🧾 My Posts
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="px-3 py-2 rounded hover:bg-red-100 text-red-600 transition-colors text-left"
                        >
                            🚪 Logout
                        </button>
                    </nav>
                </aside>
            )}
        </>
    );
}