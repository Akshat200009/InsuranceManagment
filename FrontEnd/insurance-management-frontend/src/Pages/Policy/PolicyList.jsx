import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

import policyService from "../../Services/policyService";
import PolicyTable from "../../Components/policy/PolicyTable";
import RenewPolicyModal from "../../Components/policy/RenewPolicyModal";

function PolicyList() {
  const navigate = useNavigate();

  const [policies, setPolicies] = useState([]);

  const [filter, setFilter] = useState("ALL");

  const [showRenewModal, setShowRenewModal] = useState(false);

const [selectedPolicy, setSelectedPolicy] = useState(null);

  useEffect(() => {
    loadPolicies();
  }, [filter]);

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
    } catch (error) {
      console.log(error);

      toast.error("Unable to load policies");
    }
  };
 
  const handleRenew = (policy) => {

    setSelectedPolicy(policy);

    setShowRenewModal(true);

};
const renewPolicy = async (renewData) => {

    try {

        const updatedPolicy =
            await policyService.renewPolicy(

                selectedPolicy.id,

                renewData

            );

        setPolicies((prev) =>

            prev.map((policy) =>

                policy.id === updatedPolicy.id

                    ? updatedPolicy

                    : policy

            )

        );

        setShowRenewModal(false);
        setSelectedPolicy(null);

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

  const handleCancel = async (policy) => {
    const result = await Swal.fire({
      title: "Cancel Policy",

      html: `
                <p style="font-size:16px">
                    Are you sure you want to cancel
                    <br><br>
                    <b>${policy.policyNumber}</b> ?
                </p>
            `,

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Yes, Cancel",

      cancelButtonText: "No",

      confirmButtonColor: "#dc2626",

      cancelButtonColor: "#6b7280",

      reverseButtons: true,
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const updatedPolicy = await policyService.cancelPolicy(policy.id);

      setPolicies((prevPolicies) =>
        prevPolicies.map((p) =>
          p.id === policy.id ? { ...p, status: updatedPolicy.status } : p,
        ),
      );

      await Swal.fire({
        icon: "success",

        title: "Cancelled!",

        text: "Policy cancelled successfully.",

        timer: 1500,

        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",

        title: "Failed",

        text: error.response?.data?.message || "Unable to cancel policy.",
      });
    }
  };

  return (
    <div className="p-8">
      {/* Heading */}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Policy Management</h1>

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
          className={`px-5 py-2 rounded-lg transition ${
            filter === "ALL"
              ? "bg-blue-600 text-white"
              : "border hover:bg-gray-100"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("ACTIVE")}
          className={`px-5 py-2 rounded-lg transition ${
            filter === "ACTIVE"
              ? "bg-green-600 text-white"
              : "border hover:bg-gray-100"
          }`}
        >
          Active
        </button>

        <button
          onClick={() => setFilter("EXPIRED")}
          className={`px-5 py-2 rounded-lg transition ${
            filter === "EXPIRED"
              ? "bg-yellow-500 text-white"
              : "border hover:bg-gray-100"
          }`}
        >
          Expired
        </button>

        <button
          onClick={() => setFilter("CANCELLED")}
          className={`px-5 py-2 rounded-lg transition ${
            filter === "CANCELLED"
              ? "bg-red-600 text-white"
              : "border hover:bg-gray-100"
          }`}
        >
          Cancelled
        </button>
      </div>

      {/* Table */}

      <PolicyTable
        policies={policies}
        onRenew={handleRenew}
        onCancel={handleCancel}
      />

      {/* Count */}

      <h2 className="text-red-500 text-2xl mt-8">
        Policy Count : {policies.length}
      </h2>

      {
    showRenewModal && selectedPolicy &&(

        <RenewPolicyModal

            policy={selectedPolicy}

            onRenew={renewPolicy}

            onClose={() => { setShowRenewModal(false);
                setSelectedPolicy(null);
            }}

        />

    )
}
    </div>
  );
}

export default PolicyList;
