import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../Layouts/DashboardLayout";
import PremiumStatusBadge from "../../Components/premium/PremiumStatusBadge";
import PremiumHistoryTable from "../../Components/premium/PremiumHistoryTable";
import premiumService from "../../Services/premiumService";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";

function PremiumDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [premium, setPremium] = useState(null);

  const [history, setHistory] = useState([]);

  const [duePremiums, setDuePremiums] = useState([]);

  const [overduePremiums, setOverduePremiums] = useState([]);

  useEffect(() => {
    loadPremium();
  }, []);

  const loadPremium = async () => {
    try {
      const response = await premiumService.getPremiumById(id);

      setPremium(response);

      loadHistory(response.policyId);

      loadDuePremiums();

      loadOverduePremiums();
    } catch (error) {
      console.log(error);

      toast.error("Unable to load premium details");
    }
  };

  const loadHistory = async (policyId) => {
    try {
      const response = await premiumService.getPaymentHistory(policyId);

      setHistory(response);
    } catch (error) {
      console.log(error);
    }
  };

  const loadDuePremiums = async () => {
    try {
      const response = await premiumService.getDuePremiums();

      setDuePremiums(response);
    } catch (error) {
      console.log(error);
    }
  };

  const loadOverduePremiums = async () => {
    try {
      const response = await premiumService.getOverduePremiums();

      setOverduePremiums(response);
    } catch (error) {
      console.log(error);
    }
  };

  if (!premium) {
    return (
      <DashboardLayout>
        <div className="text-center text-xl mt-20">Loading Premium...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <button
          onClick={() => navigate("/premiums")}
          className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 mb-8"
        >
          <FaArrowLeft />
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8">Premium Details</h1>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-500">Policy Number</p>

              <h3 className="text-xl font-semibold">{premium.policyNumber}</h3>
            </div>

            <div>
              <p className="text-gray-500">Amount</p>

              <h3 className="text-xl font-semibold">
                ₹{premium.amount.toLocaleString()}
              </h3>
            </div>

            <div>
              <p className="text-gray-500">Payment Date</p>

              <h3 className="text-xl font-semibold">{premium.paymentDate}</h3>
            </div>

            <div>
              <p className="text-gray-500">Payment Status</p>

              <PremiumStatusBadge status={premium.paymentStatus} />
            </div>
          </div>
        </div>
        {/* Payment History */}

        <div className="bg-white rounded-2xl shadow-md p-8 mt-8">
          <h2 className="text-2xl font-bold mb-6">Payment History</h2>

          {history.length === 0 ? (
            <p className="text-gray-500">No Payment History Found</p>
          ) : (
            <PremiumHistoryTable history={history} />
          )}
        </div>
        {/* Due Premiums */}

        <div className="bg-white rounded-2xl shadow-md p-8 mt-8">
          <h2 className="text-2xl font-bold mb-6">Due Premiums</h2>

          {duePremiums.length === 0 ? (
            <p className="text-green-600 font-semibold">No Due Premiums 🎉</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Policy</th>

                  <th className="p-3 text-left">Amount</th>

                  <th className="p-3 text-left">Payment Date</th>

                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {duePremiums.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-3">{item.policyNumber}</td>

                    <td className="p-3">₹{item.amount.toLocaleString()}</td>

                    <td className="p-3">{item.paymentDate}</td>

                    <td className="p-3">
                      <PremiumStatusBadge status={item.paymentStatus} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* Overdue Premium Alerts */}

        <div className="bg-white rounded-2xl shadow-md p-8 mt-8">
          <h2 className="text-2xl font-bold text-red-600 mb-6">
            Overdue Premium Alerts
          </h2>

          {overduePremiums.length === 0 ? (
            <p className="text-green-600 font-semibold">
              No Overdue Premiums 🎉
            </p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-red-50">
                  <th className="p-3 text-left">Policy</th>

                  <th className="p-3 text-left">Amount</th>

                  <th className="p-3 text-left">Payment Date</th>

                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {overduePremiums.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-3">{item.policyNumber}</td>

                    <td className="p-3">₹{item.amount.toLocaleString()}</td>

                    <td className="p-3">{item.paymentDate}</td>

                    <td className="p-3">
                      <PremiumStatusBadge status={item.paymentStatus} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="flex justify-start mt-8">
          <button
            onClick={() => navigate("/premiums")}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl"
          >
            Back to Premiums
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default PremiumDetails;
