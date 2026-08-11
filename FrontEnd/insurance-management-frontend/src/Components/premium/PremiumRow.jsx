import { FaEye, FaCreditCard } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import PremiumStatusBadge from "./PremiumStatusBadge";
import premiumService from "../../Services/premiumService";

function PremiumRow({ premium }) {

    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    const handlePay = async () => {

        const result = await Swal.fire({

            title: "Pay Premium?",

            html: `
                <div style="text-align:left; font-size:16px;">
                    <p><strong>Policy:</strong> ${premium.policyNumber}</p>
                    <p style="margin-top:8px;">
                        <strong>Amount:</strong>
                        ₹${premium.amount.toLocaleString("en-IN")}
                    </p>
                    <p style="margin-top:8px;">
                        <strong>Status:</strong> Pending
                    </p>
                </div>
            `,

            icon: "question",

            showCancelButton: true,

            confirmButtonText: "Confirm Payment",

            cancelButtonText: "Cancel",

            confirmButtonColor: "#16a34a",

            cancelButtonColor: "#6b7280",

            reverseButtons: true,

        });

        if (!result.isConfirmed) {
            return;
        }

        try {

            Swal.fire({

                title: "Processing Payment...",

                allowOutsideClick: false,

                allowEscapeKey: false,

                didOpen: () => {
                    Swal.showLoading();
                },

            });

            const updatedPremium =
                await premiumService.payPremium(premium.id);

            await Swal.fire({

                icon: "success",

                title: "Payment Successful!",

                html: `
                    <p>Premium payment has been completed successfully.</p>
                    <p style="margin-top:8px;">
                        <strong>Policy:</strong>
                        ${updatedPremium.policyNumber}
                    </p>
                `,

                timer: 1800,

                showConfirmButton: false,

            });

            // Refresh current page
            window.location.reload();

        } catch (error) {

            console.log(error);

            Swal.fire({

                icon: "error",

                title: "Payment Failed",

                text:
                    error.response?.data?.message ||
                    "Unable to process premium payment.",

            });

        }

    };

    return (

        <tr className="border-b hover:bg-gray-50">

            {/* Policy Number */}

            <td className="p-4">

                {premium.policyNumber}

            </td>


            {/* Amount */}

            <td className="p-4">

                ₹{premium.amount.toLocaleString("en-IN")}

            </td>


            {/* Payment Date */}

            <td className="p-4">

                {premium.paymentDate}

            </td>


            {/* Status */}

            <td className="p-4">

                <PremiumStatusBadge
                    status={premium.paymentStatus}
                />

            </td>


            {/* Actions */}

            <td className="p-4">

                <div className="flex justify-center items-center gap-3">

                    {/* View */}

                    <button

                        onClick={() =>
                            navigate(`/premiums/${premium.id}`)
                        }

                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition"

                        title="View Premium"

                    >

                        <FaEye />

                    </button>


                    {/* Customer - Pay Pending Premium */}

                    {role === "CUSTOMER" &&
                        premium.paymentStatus === "PENDING" && (

                            <button

                                onClick={handlePay}

                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition"

                                title="Pay Premium"

                            >

                                <FaCreditCard />

                                Pay Now

                            </button>

                    )}

                </div>

            </td>

        </tr>

    );

}

export default PremiumRow;