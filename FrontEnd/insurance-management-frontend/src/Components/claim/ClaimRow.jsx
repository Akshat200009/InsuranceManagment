import { FaCheck, FaTimes, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ClaimRow({
  claim,

  onApprove,

  onReject,
}) {
  const navigate = useNavigate();
  const getStatusColor = () => {
    switch (claim.status) {
      case "APPROVED":
        return "bg-green-100 text-green-700";

      case "REJECTED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-4">{claim.policyNumber}</td>

      <td className="p-4">₹{claim.claimAmount.toLocaleString()}</td>

      <td className="p-4">{claim.reason}</td>

      <td className="p-4">{claim.submissionDate}</td>

      <td className="p-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor()}`}
        >
          {claim.status}
        </span>
      </td>

      <td className="p-4 text-center">
        <div className="flex justify-center gap-2">
          <button
            onClick={() => navigate(`/claims/${claim.id}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
          >
            <FaEye />
          </button>

          {claim.status === "PENDING" && (
            <>
              <button
                onClick={() => onApprove(claim)}
                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg"
              >
                <FaCheck />
              </button>

              <button
                onClick={() => onReject(claim)}
                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
              >
                <FaTimes />
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

export default ClaimRow;
