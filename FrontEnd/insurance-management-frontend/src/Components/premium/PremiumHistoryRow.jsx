import PremiumStatusBadge from "./PremiumStatusBadge";

function PremiumHistoryRow({ premium }) {

    return (

        <tr className="border-b hover:bg-gray-50">

            <td className="p-3">

                {premium.paymentDate}

            </td>

            <td className="p-3">

                ₹{premium.amount.toLocaleString()}

            </td>

            <td className="p-3">

                <PremiumStatusBadge

                    status={premium.paymentStatus}

                />

            </td>

        </tr>

    );

}

export default PremiumHistoryRow;