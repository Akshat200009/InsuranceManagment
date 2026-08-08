import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import policyService from "../../Services/policyService";
import RenewPolicyModal from "../../Components/policy/RenewPolicyModal";

function PolicyDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [policy, setPolicy] = useState(null);

    const [showRenewModal, setShowRenewModal] = useState(false);

    useEffect(() => {

        loadPolicy();

    }, []);

    const loadPolicy = async () => {

        try {

            const response =
                await policyService.getPolicyById(id);

            setPolicy(response);

        }

        catch (error) {

            console.log(error);

        }

    };

    const renewPolicy = async (renewData) => {

        try {

            const updatedPolicy =
                await policyService.renewPolicy(

                    policy.id,

                    renewData

                );

            setPolicy(updatedPolicy);

            setShowRenewModal(false);

            Swal.fire({

                icon: "success",

                title: "Renewed!",

                text: "Policy Renewed Successfully",

                timer: 1500,

                showConfirmButton: false

            });

        }

        catch (error) {

            Swal.fire({

                icon: "error",

                title: "Failed",

                text:

                    error.response?.data?.message ||

                    "Unable to renew policy"

            });

        }

    };

    const cancelPolicy = async () => {

        const result = await Swal.fire({

            title: "Cancel Policy",

            text: "Are you sure?",

            icon: "warning",

            showCancelButton: true,

            confirmButtonText: "Yes",

            cancelButtonText: "No"

        });

        if (!result.isConfirmed) return;

        try {

            const updatedPolicy =
                await policyService.cancelPolicy(policy.id);

            setPolicy(updatedPolicy);

            Swal.fire({

                icon: "success",

                title: "Cancelled",

                timer: 1500,

                showConfirmButton: false

            });

        }

        catch (error) {

            Swal.fire({

                icon: "error",

                title: "Failed",

                text:

                    error.response?.data?.message ||

                    "Unable to cancel policy"

            });

        }

    };

    if (!policy)

        return <p className="p-8">Loading...</p>;

    return (

        <div className="max-w-5xl mx-auto py-8">

            <button

                onClick={() => navigate("/policies")}

                className="text-blue-600 font-semibold mb-6"

            >

                ← Back to Policies

            </button>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-6">

                    <h1 className="text-3xl font-bold">

                        Policy Details

                    </h1>

                    <p className="mt-2">

                        {policy.policyNumber}

                    </p>

                </div>

                <div className="grid grid-cols-2 gap-8 p-8">

                    <div>

                        <p className="text-gray-500">

                            Customer

                        </p>

                        <h3 className="font-semibold text-xl">

                            {policy.customerName}

                        </h3>

                    </div>

                    <div>

                        <p className="text-gray-500">

                            Policy Type

                        </p>

                        <h3 className="font-semibold text-xl">

                            {policy.policyType}

                        </h3>

                    </div>

                    <div>

                        <p className="text-gray-500">

                            Premium

                        </p>

                        <h3 className="font-semibold text-xl">

                            ₹ {policy.premiumAmount}

                        </h3>

                    </div>

                    <div>

                        <p className="text-gray-500">

                            Status

                        </p>

                        <span className={`px-4 py-1 rounded-full font-semibold ${

                            policy.status === "ACTIVE"

                                ? "bg-green-100 text-green-700"

                                : "bg-red-100 text-red-700"

                        }`}>

                            {policy.status}

                        </span>

                    </div>

                    <div>

                        <p className="text-gray-500">

                            Start Date

                        </p>

                        <h3 className="font-semibold">

                            {policy.startDate}

                        </h3>

                    </div>

                    <div>

                        <p className="text-gray-500">

                            End Date

                        </p>

                        <h3 className="font-semibold">

                            {policy.endDate}

                        </h3>

                    </div>

                </div>

                <div className="flex justify-end gap-4 border-t p-6">

                    {

                        policy.status === "CANCELLED"

                        &&

                        <button

                            onClick={() =>

                                setShowRenewModal(true)

                            }

                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"

                        >

                            Renew Policy

                        </button>

                    }

                    {

                        policy.status === "ACTIVE"

                        &&

                        <button

                            onClick={cancelPolicy}

                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"

                        >

                            Cancel Policy

                        </button>

                    }

                </div>

            </div>

            {

                showRenewModal &&

                <RenewPolicyModal

                    policy={policy}

                    onRenew={renewPolicy}

                    onClose={() =>

                        setShowRenewModal(false)

                    }

                />

            }

        </div>

    );

}

export default PolicyDetails;