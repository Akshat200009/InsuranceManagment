import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import DashboardCard from "../Components/DashboardCard";
import { quickActions } from "../data/quickActions";
import dashboardService from "../Services/dashboardService";
import toast from "react-hot-toast";

import {
    FaUsers,
    FaFileContract,
    FaMoneyBillWave,
    FaClipboardList,
    FaFolderOpen
} from "react-icons/fa";

function Dashboard() {

    const { fullName, role } = useAuth();

    const navigate = useNavigate();

    const actions = quickActions[role] || [];

    const [dashboard, setDashboard] = useState({
        customerCount: 0,
        policyCount: 0,
        claimCount: 0,
        totalPremium: 0,
        documentCount: 0
    });

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const response =
                await dashboardService.getDashboard();

            setDashboard(response);

        }
        catch (error) {

            console.log(error);

            toast.error("Unable to load dashboard");

        }

    };

    return (

        <>

            {/* ========================= */}
            {/* WELCOME */}
            {/* ========================= */}

            <h1 className="text-3xl font-bold text-slate-800">

                Welcome,

                <span className="text-blue-700">

                    {" "}

                    {fullName}

                </span>

                👋

            </h1>

            <p className="text-slate-500 mt-3">

                Welcome to Insurance Management Dashboard.

            </p>


            {/* ================================================= */}
            {/* CUSTOMER DASHBOARD */}
            {/* ================================================= */}

            {role === "CUSTOMER" && (

                <>

                    {/* Customer Cards */}

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

                        <DashboardCard
                            title="My Policies"
                            value={dashboard.policyCount}
                            color="border-green-600"
                            icon={
                                <FaFileContract
                                    className="text-green-600"
                                />
                            }
                        />

                        <DashboardCard
                            title="My Claims"
                            value={dashboard.claimCount}
                            color="border-red-600"
                            icon={
                                <FaClipboardList
                                    className="text-red-600"
                                />
                            }
                        />

                        <DashboardCard
                            title="Total Premium"
                            value={`₹${dashboard.totalPremium?.toLocaleString("en-IN")}`}
                            color="border-yellow-500"
                            icon={
                                <FaMoneyBillWave
                                    className="text-yellow-500"
                                />
                            }
                        />

                        <DashboardCard
                            title="My Documents"
                            value={dashboard.documentCount}
                            color="border-blue-600"
                            icon={
                                <FaFolderOpen
                                    className="text-blue-600"
                                />
                            }
                        />

                    </div>


                    {/* Customer Activities */}

                    <div className="bg-white rounded-2xl shadow-md mt-8 p-6">

                        <h2 className="text-2xl font-bold text-slate-800 mb-5">

                            Recent Activities

                        </h2>

                        <ul className="space-y-4">

                            <li className="border-b pb-3">

                                📄 My Policies

                                <span className="text-gray-500 ml-2">

                                    — View and manage your insurance policies

                                </span>

                            </li>

                            <li className="border-b pb-3">

                                💰 Premium

                                <span className="text-gray-500 ml-2">

                                    — Check your premium information

                                </span>

                            </li>

                            <li className="border-b pb-3">

                                🚗 My Claims

                                <span className="text-gray-500 ml-2">

                                    — Track your submitted claims

                                </span>

                            </li>

                            <li>

                                📁 My Documents

                                <span className="text-gray-500 ml-2">

                                    — View your uploaded documents

                                </span>

                            </li>

                        </ul>

                    </div>

                </>

            )}


            {/* ================================================= */}
            {/* AGENT DASHBOARD */}
            {/* ================================================= */}

            {role === "AGENT" && (

                <>

                    {/* Agent Cards */}

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

                        <DashboardCard
                            title="Customers"
                            value={dashboard.customerCount}
                            color="border-blue-600"
                            icon={
                                <FaUsers
                                    className="text-blue-600"
                                />
                            }
                        />

                        <DashboardCard
                            title="Policies"
                            value={dashboard.policyCount}
                            color="border-green-600"
                            icon={
                                <FaFileContract
                                    className="text-green-600"
                                />
                            }
                        />

                        <DashboardCard
                            title="Claims"
                            value={dashboard.claimCount}
                            color="border-red-600"
                            icon={
                                <FaClipboardList
                                    className="text-red-600"
                                />
                            }
                        />

                        <DashboardCard
                            title="Documents"
                            value={dashboard.documentCount}
                            color="border-purple-600"
                            icon={
                                <FaFolderOpen
                                    className="text-purple-600"
                                />
                            }
                        />

                    </div>


                    {/* Agent Recent Activities */}

                    <div className="bg-white rounded-2xl shadow-md mt-8 p-6">

                        <h2 className="text-2xl font-bold text-slate-800 mb-5">

                            Recent Activities

                        </h2>

                        <ul className="space-y-4">

                            <li className="border-b pb-3">

                                ✅ New Customer Registered

                            </li>

                            <li className="border-b pb-3">

                                📄 New Policy Created

                            </li>

                            <li className="border-b pb-3">

                                📁 Customer Document Uploaded

                            </li>

                            <li>

                                🚗 Claim Submitted for Review

                            </li>

                        </ul>

                    </div>

                </>

            )}


            {/* ================================================= */}
            {/* ADMIN DASHBOARD */}
            {/* ================================================= */}

            {role === "ADMIN" && (

                <>

                    {/* Admin Cards */}

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

                        <DashboardCard
                            title="Customers"
                            value={dashboard.customerCount}
                            color="border-blue-600"
                            icon={
                                <FaUsers
                                    className="text-blue-600"
                                />
                            }
                        />

                        <DashboardCard
                            title="Policies"
                            value={dashboard.policyCount}
                            color="border-green-600"
                            icon={
                                <FaFileContract
                                    className="text-green-600"
                                />
                            }
                        />

                        <DashboardCard
                            title="Claims"
                            value={dashboard.claimCount}
                            color="border-red-600"
                            icon={
                                <FaClipboardList
                                    className="text-red-600"
                                />
                            }
                        />

                        <DashboardCard
                            title="Premium"
                            value={`₹${dashboard.totalPremium?.toLocaleString("en-IN")}`}
                            color="border-yellow-500"
                            icon={
                                <FaMoneyBillWave
                                    className="text-yellow-500"
                                />
                            }
                        />

                    </div>


                    {/* Admin Recent Activities */}

                    <div className="bg-white rounded-2xl shadow-md mt-8 p-6">

                        <h2 className="text-2xl font-bold text-slate-800 mb-5">

                            Recent Activities

                        </h2>

                        <ul className="space-y-4">

                            <li className="border-b pb-3">

                                ✅ New Customer Registered

                            </li>

                            <li className="border-b pb-3">

                                💰 Premium Received

                            </li>

                            <li className="border-b pb-3">

                                📄 Policy Approved

                            </li>

                            <li>

                                🚗 Claim Request Submitted

                            </li>

                        </ul>

                    </div>

                </>

            )}


            {/* ================================================= */}
            {/* QUICK ACTIONS */}
            {/* ================================================= */}

            <div className="bg-white rounded-2xl shadow-md mt-8 p-6">

                <h2 className="text-2xl font-bold mb-6">

                    Quick Actions

                </h2>

                <div className="flex flex-wrap gap-4">

                    {actions.map((action) => (

                        <button
                            key={action.title}
                            onClick={() => navigate(action.path)}
                            className={`${action.color} text-white px-6 py-3 rounded-xl transition-all hover:opacity-90`}
                        >

                            {action.title}

                        </button>

                    ))}

                </div>

            </div>

        </>

    );

}

export default Dashboard;