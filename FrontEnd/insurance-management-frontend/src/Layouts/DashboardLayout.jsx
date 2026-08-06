import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";

function DashboardLayout({ children }) {

    return (

        <div className="flex h-screen bg-slate-100">

            {/* Sidebar */}

            <Sidebar />

            {/* Right Side */}

            <div className="flex flex-col flex-1">

                {/* Navbar */}

                <Navbar />

                {/* Main Content */}

                <div className="flex-1 p-6 overflow-y-auto">

                    {children}

                </div>

            </div>

        </div>

    );

}

export default DashboardLayout;