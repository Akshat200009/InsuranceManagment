import { FaCheck, FaTimes, FaEye, FaUserPlus } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function ClaimRow({ claim, onApprove, onReject, onAssign, isAdmin }) {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const isAgent = role === "AGENT";

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
    <tr className="border-b hover:bg-gray-50 transition">
      {/* Policy Number */}

      <td className="p-4 font-medium">{claim.policyNumber}</td>

      {/* Claim Amount */}

      <td className="p-4">₹{claim.claimAmount.toLocaleString("en-IN")}</td>

      {/* Reason */}

      <td className="p-4 max-w-[250px]">
        <span className="line-clamp-2" title={claim.reason}>
          {claim.reason}
        </span>
      </td>

      {/* Submission Date */}

      <td className="p-4 whitespace-nowrap">{claim.submissionDate}</td>

      {/* Status */}

      <td className="p-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor()}`}
        >
          {claim.status}
        </span>
      </td>

      <td className="p-4">
        {claim.assignedAgentName ? (
          <span className="text-sm font-medium text-slate-700">
            {claim.assignedAgentName}
          </span>
        ) : (
          <span className="text-gray-400">Not Assigned</span>
        )}
      </td>

      {/* Actions */}

      <td className="p-4">
        <div className="flex justify-center items-center gap-2">
          {/* View - Everyone */}

          <button
            onClick={() => navigate(`/claims/${claim.id}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition"
            title="View Claim"
          >
            <FaEye />
          </button>

          {isAdmin && claim.status === "PENDING" && !claim.assignedAgentId && (
            <button
              onClick={() => onAssign(claim)}
              className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition"
              title="Assign Claim"
            >
              <FaUserPlus />
            </button>
          )}

          {/* Admin / Agent Only */}

          {isAgent && claim.status === "PENDING" && (
            <>
              {/* Approve */}

              <button
                onClick={() => onApprove(claim)}
                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition"
                title="Approve Claim"
              >
                <FaCheck />
              </button>

              {/* Reject */}

              <button
                onClick={() => onReject(claim)}
                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition"
                title="Reject Claim"
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
