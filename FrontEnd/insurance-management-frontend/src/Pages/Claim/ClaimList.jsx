import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

import DashboardLayout from "../../Layouts/DashboardLayout";
import claimService from "../../Services/claimService";
import ClaimTable from "../../Components/claim/ClaimTable";

function ClaimList() {

    const navigate = useNavigate();

    const [claims, setClaims] = useState([]);

    const [filter, setFilter] = useState("PENDING");

    useEffect(() => {

        loadClaims();

    }, [filter]);

    const loadClaims = async () => {

        try {

            let response;

            switch (filter) {

                case "APPROVED":

                    response =
                        await claimService.getClaimsByStatus("APPROVED");

                    break;

                case "REJECTED":

                    response =
                        await claimService.getClaimsByStatus("REJECTED");

                    break;

                default:

                    response =
                        await claimService.getPendingClaims();

            }

            setClaims(response);

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to load claims");

        }

    };

    const handleApprove = async (claim) => {

        const result = await Swal.fire({

            title: "Approve Claim",

            html: `
                <p>
                    Approve claim for
                    <br><br>
                    <b>${claim.policyNumber}</b> ?
                </p>
            `,

            icon: "question",

            showCancelButton: true,

            confirmButtonText: "Approve",

            cancelButtonText: "Cancel",

            confirmButtonColor: "#16a34a",

            cancelButtonColor: "#6b7280",

            reverseButtons: true

        });

        if (!result.isConfirmed) return;

        try {

            const updatedClaim =
                await claimService.approveClaim(claim.id);

            setClaims(prev =>
                prev.map(c =>
                    c.id === updatedClaim.id
                        ? updatedClaim
                        : c
                )
            );

            Swal.fire({

                icon: "success",

                title: "Approved!",

                text: "Claim approved successfully.",

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
                    "Unable to approve claim."

            });

        }

    };

    const handleReject = async (claim) => {

        const result = await Swal.fire({

            title: "Reject Claim",

            html: `
                <p>
                    Reject claim for
                    <br><br>
                    <b>${claim.policyNumber}</b> ?
                </p>
            `,

            icon: "warning",

            showCancelButton: true,

            confirmButtonText: "Reject",

            cancelButtonText: "Cancel",

            confirmButtonColor: "#dc2626",

            cancelButtonColor: "#6b7280",

            reverseButtons: true

        });

        if (!result.isConfirmed) return;

        try {

            const updatedClaim =
                await claimService.rejectClaim(claim.id);

            setClaims(prev =>
                prev.map(c =>
                    c.id === updatedClaim.id
                        ? updatedClaim
                        : c
                )
            );

            Swal.fire({

                icon: "success",

                title: "Rejected!",

                text: "Claim rejected successfully.",

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
                    "Unable to reject claim."

            });

        }

    };

    return (

        <DashboardLayout>

            <div className="p-8">

                {/* Heading */}

                <div className="flex justify-between items-center mb-8">

                    <h1 className="text-3xl font-bold">

                        Claim Management

                    </h1>

                    <button

                        onClick={() => navigate("/claims/add")}

                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"

                    >

                        <FaPlus />

                        Submit Claim

                    </button>

                </div>

                {/* Filters */}

                <div className="flex gap-4 mb-8">

                    <button

                        onClick={() => setFilter("PENDING")}

                        className={`px-5 py-2 rounded-lg transition ${
                            filter === "PENDING"
                                ? "bg-yellow-500 text-white"
                                : "border hover:bg-gray-100"
                        }`}

                    >

                        Pending

                    </button>

                    <button

                        onClick={() => setFilter("APPROVED")}

                        className={`px-5 py-2 rounded-lg transition ${
                            filter === "APPROVED"
                                ? "bg-green-600 text-white"
                                : "border hover:bg-gray-100"
                        }`}

                    >

                        Approved

                    </button>

                    <button

                        onClick={() => setFilter("REJECTED")}

                        className={`px-5 py-2 rounded-lg transition ${
                            filter === "REJECTED"
                                ? "bg-red-600 text-white"
                                : "border hover:bg-gray-100"
                        }`}

                    >

                        Rejected

                    </button>

                </div>

                {/* Table */}

                <ClaimTable

                    claims={claims}

                    onApprove={handleApprove}

                    onReject={handleReject}

                />

                {/* Count */}

                <h2 className="text-2xl font-semibold mt-8 text-red-500">

                    Claim Count : {claims.length}

                </h2>

            </div>

        </DashboardLayout>

    );

}

export default ClaimList;