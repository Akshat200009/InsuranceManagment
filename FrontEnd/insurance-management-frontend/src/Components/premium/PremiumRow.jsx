import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PremiumStatusBadge from "./PremiumStatusBadge";

function PremiumRow({ premium }) {

    const navigate = useNavigate();

    return (

        <tr className="border-b hover:bg-gray-50">

            <td className="p-4">

                {premium.policyNumber}

            </td>

            <td className="p-4">

                ₹{premium.amount.toLocaleString()}

            </td>

            <td className="p-4">

                {premium.paymentDate}

            </td>

            <td className="p-4">

                <PremiumStatusBadge

                    status={premium.paymentStatus}

                />

            </td>

            <td className="text-center">

                <button

                    onClick={() =>
                        navigate(`/premiums/${premium.id}`)
                    }

                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"

                >

                    <FaEye />

                </button>

            </td>

        </tr>

    );

}

export default PremiumRow;