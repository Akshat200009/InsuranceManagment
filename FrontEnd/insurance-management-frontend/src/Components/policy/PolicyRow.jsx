import { FaRedo, FaBan, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getStatusColor = (status) => {
  switch (status) {
    case "ACTIVE":
      return "bg-green-100 text-green-700";

    case "EXPIRED":
      return "bg-yellow-100 text-yellow-700";

    case "CANCELLED":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

function PolicyRow({
  policy,
  onRenew,
  onCancel,
}) {

  const role = localStorage.getItem("role");

  const navigate = useNavigate();

  return (

    <tr className="border-b hover:bg-gray-50">

      <td className="px-6 py-4 font-medium">
        {policy.policyNumber}
      </td>

      {role !== "CUSTOMER" && (
        <td className="px-6 py-4">
          {policy.customerName}
        </td>
      )}

      <td className="px-6 py-4">
        {policy.policyType}
      </td>

      <td className="px-6 py-4">
        ₹ {policy.premiumAmount.toLocaleString("en-IN")}
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        {formatDate(policy.startDate)}
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        {formatDate(policy.endDate)}
      </td>

      <td className="px-6 py-4 text-center">
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(policy.status)}`}
        >
          {policy.status}
        </span>
      </td>

      <td className="px-6 py-4">

        <div className="flex justify-center gap-3">

          {/* CUSTOMER */}

          {role === "CUSTOMER" && (

            <button
              onClick={() => navigate(`/policies/${policy.id}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
              title="View Policy"
            >
              <FaEye />
            </button>

          )}

          {/* ADMIN / AGENT */}

          {role !== "CUSTOMER" && (
            <>
              {policy.status === "EXPIRED" && (
                <button
                  onClick={() => onRenew(policy)}
                  className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg"
                  title="Renew Policy"
                >
                  <FaRedo />
                </button>
              )}

              {policy.status === "ACTIVE" && (
                <button
                  onClick={() => onCancel(policy)}
                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
                  title="Cancel Policy"
                >
                  <FaBan />
                </button>
              )}

              {policy.status === "CANCELLED" && (
                <button
                  onClick={() => onRenew(policy)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
                >
                  Renew
                </button>
              )}
            </>
          )}

        </div>

      </td>

    </tr>

  );
}

export default PolicyRow;