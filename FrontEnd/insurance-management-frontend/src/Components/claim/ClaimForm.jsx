import { useState } from "react";
import { FaArrowLeft, FaSave, FaTimes } from "react-icons/fa";

function ClaimForm({
  policies,

  onSubmit,

  onCancel,
}) {
  const [formData, setFormData] = useState({
    policyId: "",

    claimAmount: "",

    reason: "",

    submissionDate: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,

      [e.target.name]: "",
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.policyId) newErrors.policyId = "Policy is required";

    if (!formData.claimAmount)
      newErrors.claimAmount = "Claim Amount is required";
    else if (Number(formData.claimAmount) <= 0)
      newErrors.claimAmount = "Claim Amount must be greater than zero";

    if (!formData.reason.trim()) newErrors.reason = "Reason is required";

    if (!formData.submissionDate)
      newErrors.submissionDate = "Submission Date is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const result = await onSubmit({
      ...formData,

      policyId: Number(formData.policyId),

      claimAmount: Number(formData.claimAmount),
    });

    if (result) {
      setErrors(result);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}

      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white px-8 py-6">
        <h2 className="text-3xl font-bold">Submit Insurance Claim</h2>

        <p className="mt-2 text-blue-100">Fill all required information.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Policy */}

          <div>
            <label className="block font-semibold mb-2">Select Policy *</label>

            <select
              name="policyId"
              value={formData.policyId}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Active Policy</option>

              {policies.map((policy) => (
                <option key={policy.id} value={policy.id}>
                  {policy.policyNumber} - {policy.policyType}
                </option>
              ))}
            </select>

            <p className="text-red-500 text-sm mt-1">{errors.policyId}</p>
          </div>

          {/* Claim Amount */}

          <div>
            <label className="block font-semibold mb-2">Claim Amount *</label>

            <input
              type="number"
              name="claimAmount"
              value={formData.claimAmount}
              onChange={handleChange}
              placeholder="Enter Claim Amount"
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <p className="text-red-500 text-sm mt-1">{errors.claimAmount}</p>
          </div>

          {/* Submission Date */}

          <div>
            <label className="block font-semibold mb-2">
              Submission Date *
            </label>

            <input
              type="date"
              name="submissionDate"
              value={formData.submissionDate}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <p className="text-red-500 text-sm mt-1">{errors.submissionDate}</p>
          </div>

          {/* Reason */}

          <div className="md:col-span-2">
            <label className="block font-semibold mb-2">Reason *</label>

            <textarea
              rows="5"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Enter claim reason"
              className="w-full border rounded-xl px-4 py-3 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <p className="text-red-500 text-sm mt-1">{errors.reason}</p>
          </div>
        </div>

        {/* Buttons */}

        <div className="flex justify-between mt-10">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl"
          >
            <FaArrowLeft />
            Back to Claims
          </button>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl"
            >
              <FaTimes />
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
            >
              <FaSave />
              Submit Claim
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ClaimForm;
