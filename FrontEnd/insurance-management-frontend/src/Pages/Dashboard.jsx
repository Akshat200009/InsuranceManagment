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
    FaClipboardList
} from "react-icons/fa";

function Dashboard() {

    const { fullName, role } = useAuth();

    const navigate = useNavigate();

    const actions = quickActions[role] || [];

    const [dashboard, setDashboard] = useState({

        customerCount: 0,

        policyCount: 0,

        claimCount: 0,

        totalPremium: 0

    });

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const response = await dashboardService.getDashboard();

            setDashboard(response);

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to load dashboard");

        }

    };

    return (

        <>

            {/* Welcome */}

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

            {/* Dashboard Cards */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

                <DashboardCard

                    title="Customers"

                    value={dashboard.customerCount}

                    color="border-blue-600"

                    icon={<FaUsers className="text-blue-600" />}

                />

                <DashboardCard

                    title="Policies"

                    value={dashboard.policyCount}

                    color="border-green-600"

                    icon={<FaFileContract className="text-green-600" />}

                />

                <DashboardCard

                    title="Claims"

                    value={dashboard.claimCount}

                    color="border-red-600"

                    icon={<FaClipboardList className="text-red-600" />}

                />

                <DashboardCard

                    title="Premium"

                    value={`₹${dashboard.totalPremium.toLocaleString()}`}

                    color="border-yellow-500"

                    icon={<FaMoneyBillWave className="text-yellow-500" />}

                />

            </div>

            {/* Recent Activities */}

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

            {/* Quick Actions */}

            <div className="bg-white rounded-2xl shadow-md mt-8 p-6">

                <h2 className="text-2xl font-bold mb-6">

                    Quick Actions

                </h2>

                <div className="flex flex-wrap gap-4">

                    {

                        actions.map((action) => (

                            <button

                                key={action.title}

                                onClick={() => navigate(action.path)}

                                className={`${action.color} text-white px-6 py-3 rounded-xl transition-all hover:opacity-90`}

                            >

                                {action.title}

                            </button>

                        ))

                    }

                </div>

            </div>

        </>

    );

}

export default Dashboard;