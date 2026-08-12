import { NavLink, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

import { sidebarMenu } from "../data/sidebarMenu";
import { useAuth } from "../Context/AuthContext";

function Sidebar() {

    const { role, logout } = useAuth();

    const navigate = useNavigate();

    const menuItems = sidebarMenu[role] || [];


    return (

        <div className="w-64 bg-slate-900 text-white flex flex-col justify-between min-h-screen">

            {/* ========================= */}
            {/* LOGO */}
            {/* ========================= */}

            <div>

                <div className="p-7 border-b border-slate-700">

                    <h1 className="text-3xl font-bold">
                        Insurance
                    </h1>

                </div>


                {/* ========================= */}
                {/* MENU */}
                {/* ========================= */}

                <div className="mt-6 px-3">

                    {menuItems.map((item) => (

                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-4 px-4 py-3 rounded-xl mb-2 transition-all duration-300
                                ${
                                    isActive
                                        ? "bg-blue-600 text-white shadow-lg"
                                        : "hover:bg-slate-800 text-slate-300"
                                }`
                            }
                        >

                            <span className="text-lg">
                                {item.icon}
                            </span>

                            <span>
                                {item.title}
                            </span>

                        </NavLink>

                    ))}

                </div>

            </div>


            {/* ========================= */}
            {/* LOGOUT */}
            {/* ========================= */}

            <div className="p-4 border-t border-slate-700">

                <button
                    onClick={() => {

                        logout();

                        navigate("/");

                    }}
                    className="flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 w-full py-3 rounded-xl transition-all"
                >

                    <FaSignOutAlt />

                    Logout

                </button>

            </div>

        </div>

    );

}

export default Sidebar;