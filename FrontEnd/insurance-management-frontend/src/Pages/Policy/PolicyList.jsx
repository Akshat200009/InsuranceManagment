import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";

import policyService from "../../Services/policyService";
import PolicyTable from "../../Components/policy/PolicyTable";

function PolicyList() {

    const navigate = useNavigate();

    const [policies, setPolicies] = useState([]);

    const [filter, setFilter] = useState("ALL");

    const loadPolicies = async () => {

        try {

            let response;

            switch (filter) {

                case "ACTIVE":

                    response = await policyService.getActivePolicies();

                    break;

                case "EXPIRED":

                    response = await policyService.getExpiredPolicies();

                    break;

                case "CANCELLED":

                    response = await policyService.getPoliciesByStatus("CANCELLED");

                    break;

                default:

                    response = await policyService.getAllPolicies();

            }

            setPolicies(response);

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to load policies");

        }

    };

    useEffect(() => {

        loadPolicies();

    }, [filter]);

    return (

        <div className="p-8">

            {/* Heading */}

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-3xl font-bold">

                    Policy Management

                </h1>

                <button

                    onClick={() => navigate("/policies/add")}

                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"

                >

                    <FaPlus />

                    Add Policy

                </button>

            </div>

            {/* Filters */}

            <div className="flex gap-4 mb-8">

                <button

                    onClick={() => setFilter("ALL")}

                    className={`px-4 py-2 rounded-lg ${
                        filter === "ALL"
                            ? "bg-blue-600 text-white"
                            : "border"
                    }`}

                >

                    All

                </button>

                <button

                    onClick={() => setFilter("ACTIVE")}

                    className={`px-4 py-2 rounded-lg ${
                        filter === "ACTIVE"
                            ? "bg-green-600 text-white"
                            : "border"
                    }`}

                >

                    Active

                </button>

                <button

                    onClick={() => setFilter("EXPIRED")}

                    className={`px-4 py-2 rounded-lg ${
                        filter === "EXPIRED"
                            ? "bg-yellow-500 text-white"
                            : "border"
                    }`}

                >

                    Expired

                </button>

                <button

                    onClick={() => setFilter("CANCELLED")}

                    className={`px-4 py-2 rounded-lg ${
                        filter === "CANCELLED"
                            ? "bg-red-600 text-white"
                            : "border"
                    }`}

                >

                    Cancelled

                </button>

            </div>

            {/* Table */}

            <PolicyTable

                policies={policies}

            />

            <h2 className="text-red-500 text-2xl mt-8">

                Policy Count : {policies.length}

            </h2>

        </div>

    );

}

export default PolicyList;