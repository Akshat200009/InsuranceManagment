import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import policyService from "../../Services/policyService";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
  FaMapMarkerAlt,
  FaFileContract,
  FaClipboardList,
  FaMoneyBillWave,
  FaFolderOpen,
  FaArrowLeft,
  FaEdit,
  FaEye,
} from "react-icons/fa";

import DashboardLayout from "../../Layouts/DashboardLayout";
import customerService from "../../Services/customerService";
import claimService from "../../Services/claimService";
import toast from "react-hot-toast";

function CustomerProfile() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);

  const [policies, setPolicies] = useState([]);

  const [policyCount, setPolicyCount] = useState(0);

  const [totalPremium, setTotalPremium] = useState(0);
  const [claims, setClaims] = useState([]);

  const [claimCount, setClaimCount] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      await loadCustomer();
      await loadCustomerPolicies();
      await loadCustomerClaims();
    };
    loadData();
  }, []);

  const loadCustomerClaims = async () => {
    try {
      const response = await claimService.getCustomerClaims(id);

      setClaims(response);

      setClaimCount(response.length);
    } catch (error) {
      console.log(error);
    }
  };
  const loadCustomer = async () => {
    try {
      const response = await customerService.getCustomerById(id);

      setCustomer(response);
    } catch (error) {
      console.log(error);

      toast.error("Unable to load customer");
    }
  };
  const loadCustomerPolicies = async () => {
    try {
      const response = await policyService.getCustomerPolicies(id);

      setPolicies(response);

      setPolicyCount(response.length);

      const premium = response.reduce(
        (sum, policy) => sum + policy.premiumAmount,

        0,
      );

      setTotalPremium(premium);
    } catch (error) {
      console.log(error);
    }
  };

  if (!customer) {
    return (
      <DashboardLayout>
        <div className="text-center mt-20 text-xl">Loading Customer...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => navigate("/customers")}
          className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-5 py-3 rounded-xl"
        >
          <FaArrowLeft />
          Back
        </button>

        <button
          onClick={() => navigate(`/customers/edit/${customer.id}`)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
        >
          <FaEdit />
          Edit Customer
        </button>
      </div>

      {/* Customer Details */}

      <div className="bg-white rounded-2xl shadow-md p-8">
        <div className="flex items-center gap-5 mb-8">
          <div className="bg-blue-100 p-5 rounded-full">
            <FaUser className="text-4xl text-blue-700" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">{customer.name}</h1>

            <p className="text-gray-500">Customer ID : {customer.id}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex items-center gap-4">
            <FaEnvelope className="text-blue-600" />

            <span>{customer.email}</span>
          </div>

          <div className="flex items-center gap-4">
            <FaPhone className="text-green-600" />

            <span>{customer.phone}</span>
          </div>

          <div className="flex items-center gap-4">
            <FaBirthdayCake className="text-pink-600" />

            <span>{customer.dob}</span>
          </div>

          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-red-600" />

            <span>{customer.address}</span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
        <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-blue-600">
          <FaFileContract className="text-3xl text-blue-600 mb-3" />

          <h3 className="font-semibold">Policies</h3>

          <p className="text-3xl font-bold mt-2">{policyCount}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-green-600">
          <FaMoneyBillWave className="text-3xl text-green-600 mb-3" />

          <h3 className="font-semibold">Premiums</h3>

          <p className="text-3xl font-bold mt-2">
            ₹{totalPremium.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-red-600">
          <FaClipboardList className="text-3xl text-red-600 mb-3" />

          <h3 className="font-semibold">Claims</h3>

          <p className="text-3xl font-bold mt-2">{claimCount}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-yellow-500">
          <FaFolderOpen className="text-3xl text-yellow-500 mb-3" />

          <h3 className="font-semibold">Documents</h3>

          <p className="text-3xl font-bold mt-2">0</p>
        </div>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mt-8 w-full">
          <h2 className="text-2xl font-bold mb-6">Recent Claims</h2>

          {claims.length === 0 ? (
            <p className="text-gray-500">No Claims Found</p>
          ) : (
            <div className="overflow-x-auto">
    <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left px-5 py-4 font-semibold text-gray-700">Policy</th>

                  <th className="text-left px-5 py-4 font-semibold text-gray-700">Amount</th>

                  <th className="text-left px-5 py-4 font-semibold text-gray-700">Status</th>

                  <th className="text-left px-5 py-4 font-semibold text-gray-700">Date</th>

                  <th className="text-left px-5 py-4 font-semibold text-gray-700">Action</th>
                </tr>
              </thead>

              <tbody>
                {claims.map((claim) => (
                  <tr key={claim.id} className="border-b">
                    <td className="p-3">{claim.policyNumber}</td>

                    <td className="p-3">
                      ₹{claim.claimAmount.toLocaleString()}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm ${
                          claim.status === "APPROVED"
                            ? "bg-green-600"
                            : claim.status === "REJECTED"
                              ? "bg-red-600"
                              : "bg-yellow-500"
                        }`}
                      >
                        {claim.status}
                      </span>
                    </td>

                    <td className="p-3">{claim.submissionDate}</td>

                    <td className="text-center">
                      <button
                        onClick={() => navigate(`/claims/${claim.id}`)}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          )}
        </div>
    </DashboardLayout>
  );
}

export default CustomerProfile;
