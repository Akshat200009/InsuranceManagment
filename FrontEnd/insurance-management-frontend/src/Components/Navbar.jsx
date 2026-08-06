import { FaBell, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";

function Navbar() {

    const { fullName, role } = useAuth();

    return (

        <div className="h-16 bg-white shadow-md flex items-center justify-between px-8">

            {/* Left */}

            <div>

                <h1 className="text-2xl font-bold text-slate-800">

                    Insurance Management System

                </h1>

            </div>

            {/* Right */}

            <div className="flex items-center gap-6">

                <button className="text-2xl text-slate-600 hover:text-blue-600">

                    <FaBell />

                </button>

                <div className="flex items-center gap-3">

                    <FaUserCircle className="text-4xl text-blue-600" />

                    <div>

                        <p className="font-semibold text-slate-800">

                            {fullName}

                        </p>

                        <p className="text-sm text-slate-500">

                            {role}

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Navbar;