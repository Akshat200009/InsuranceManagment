import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";

import DashboardLayout from "../../Layouts/DashboardLayout";
import DashboardCard from "../../Components/DashboardCard";
import PremiumTable from "../../Components/premium/PremiumTable";
import premiumService from "../../Services/premiumService";

function PremiumList() {

    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    const [premiums, setPremiums] = useState([]);

    const [statistics, setStatistics] = useState({

        paidPremiums: 0,

        pendingPremiums: 0,

        overduePremiums: 0,

        totalCollection: 0

    });

    useEffect(() => {

        loadPremiums();

        // Statistics only for Admin
        if (role === "ADMIN") {
            loadStatistics();
        }

    }, []);

    const loadPremiums = async () => {

        try {

            let response;

            if (role === "CUSTOMER") {

                response = await premiumService.getMyPremiums();

            } else {

                response = await premiumService.getAllPremiums();

            }

            setPremiums(response);

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to load premium records");

        }

    };

    const loadStatistics = async () => {

        try {

            const response =
                await premiumService.getPremiumStatistics();

            setStatistics(response);

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <DashboardLayout>

            <div className="p-8">

                {/* Header */}

                <div className="flex justify-between items-center mb-8">

                    <h1 className="text-3xl font-bold">

                        {role === "CUSTOMER"
                            ? "My Premiums"
                            : "Premium Management"}

                    </h1>

                    {/* Record Payment */}

                    {role !== "CUSTOMER" && (

                        <button

                            onClick={() =>
                                navigate("/premiums/add")
                            }

                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"

                        >

                            <FaPlus />

                            Record Payment

                        </button>

                    )}

                </div>

                {/* Statistics */}

                {role !== "CUSTOMER" && (

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

                        <DashboardCard

                            title="Total Collection"

                            value={`₹${statistics.totalCollection.toLocaleString("en-IN")}`}

                            color="border-yellow-500"

                        />

                        <DashboardCard

                            title="Paid"

                            value={statistics.paidPremiums}

                            color="border-green-600"

                        />

                        <DashboardCard

                            title="Pending"

                            value={statistics.pendingPremiums}

                            color="border-blue-600"

                        />

                        <DashboardCard

                            title="Overdue"

                            value={statistics.overduePremiums}

                            color="border-red-600"

                        />

                    </div>

                )}

                {/* Premium Table */}

                {

                    premiums.length === 0 ?

                        (

                            <div className="bg-white rounded-2xl shadow-md p-12 text-center">

                                <h2 className="text-2xl font-semibold">

                                    {role === "CUSTOMER"
                                        ? "No Premium Records Found"
                                        : "No Premium Records Found"}

                                </h2>

                                <p className="text-gray-500 mt-2">

                                    {role === "CUSTOMER"
                                        ? "Your premium payment records will appear here."
                                        : "Premium payment records will appear here."}

                                </p>

                            </div>

                        )

                        :

                        (

                            <PremiumTable

                                premiums={premiums}

                            />

                        )

                }

            </div>

        </DashboardLayout>

    );

}

export default PremiumList;