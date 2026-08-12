import { useNavigate } from "react-router-dom";

function CustomerForm({
  formData,

  setFormData,

  handleSubmit,

  buttonText,
}) {
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl">
        {/* Header */}

        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 px-8 py-6">
          <h1 className="text-3xl font-bold text-white">
            {buttonText === "Save Customer"
              ? "Add New Customer"
              : "Update Customer"}
          </h1>

          <p className="text-blue-100 mt-2">
            {buttonText === "Save Customer"
              ? "Register a new customer into the Insurance Management System."
              : "Update customer details."}
          </p>
        </div>

        {/* Form */}

        <div className="bg-white p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}

              <div>
                <label className="block font-semibold mb-2">
                  Customer Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter customer name"
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>

              {/* Email */}

              <div>
                <label className="block font-semibold mb-2">Email</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>

              {/* Phone */}

              <div>
                <label className="block font-semibold mb-2">Phone Number</label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>

              {/* DOB */}

              <div>
                <label className="block font-semibold mb-2">
                  Date of Birth
                </label>

                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
            </div>

            {/* Address */}

            <div>
              <label className="block font-semibold mb-2">Address</label>

              <textarea
                rows="4"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter customer address"
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none resize-none"
              />
            </div>

            {/* Buttons */}

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/customers")}
                className="px-6 py-3 rounded-xl bg-gray-500 hover:bg-gray-600 text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 text-white font-semibold hover:opacity-90"
              >
                {buttonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CustomerForm;
