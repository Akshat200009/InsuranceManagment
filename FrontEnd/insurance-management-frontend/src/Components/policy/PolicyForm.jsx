import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

function PolicyForm({

    customers,

    onSubmit,

    onCancel

}) {
   const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({

        customerId: "",

        policyType: "",

        policyNumber: "",

        premiumAmount: "",

        startDate: "",

        endDate: "",

        status: "ACTIVE"

    });

    const validate = () => {

    let newErrors = {};

    if (!formData.customerId) {

        newErrors.customerId = "Customer is required";

    }

    if (!formData.policyType) {

        newErrors.policyType = "Policy Type is required";

    }
    if (
    policies.some(
        p =>
            p.policyNumber.toLowerCase() ===
            formData.policyNumber.trim().toLowerCase()
    )
) {
    newErrors.policyNumber = "Policy Number already exists";
}

    if (!formData.policyNumber.trim()) {

        newErrors.policyNumber = "Policy Number is required";

    }

    if (!formData.premiumAmount) {

        newErrors.premiumAmount = "Premium Amount is required";

    }

    else if (Number(formData.premiumAmount) <= 0) {

        newErrors.premiumAmount =
            "Premium Amount must be greater than zero";

    }

    if (!formData.startDate) {

        newErrors.startDate = "Start Date is required";

    }

    if (!formData.endDate) {

        newErrors.endDate = "End Date is required";

    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

};

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSubmit({

            ...formData,

            customerId: Number(formData.customerId),

            premiumAmount: Number(formData.premiumAmount)

        });

    };

    return (

        <div className="max-w-6xl mx-auto">

            {/* Back Button */}

            <button

                type="button"

                onClick={onCancel}

                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-5"

            >

                <FaArrowLeft />

                Back to Policies

            </button>

            <form

                onSubmit={handleSubmit}

                className="bg-white rounded-3xl shadow-xl overflow-hidden"

            >

                {/* Header */}

                <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white px-8 py-7">

                    <h1 className="text-4xl font-bold">

                        Add New Policy

                    </h1>

                    <p className="mt-2 text-blue-100">

                        Create a new insurance policy for an existing customer.

                    </p>

                </div>

                {/* Form */}

                <div className="p-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Customer */}

                        <div>

                            <label className="block font-semibold mb-2">

                                Customer

                            </label>

                            <select

                                name="customerId"

                                value={formData.customerId}

                                onChange={handleChange}

                                required

                                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"

                            >

                                <option value="">

                                    Select Customer

                                </option>

                                {

                                    customers.map((customer) => (

                                        <option

                                            key={customer.id}

                                            value={customer.id}

                                        >

                                            {customer.name}

                                        </option>

                                    ))

                                }

                            </select>

                        </div>

                        {/* Policy Type */}

                        <div>

                            <label className="block font-semibold mb-2">

                                Policy Type

                            </label>

                            <select

                                name="policyType"

                                value={formData.policyType}

                                onChange={handleChange}

                                required

                                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"

                            >

                                <option value="">

                                    Select Policy Type

                                </option>

                                <option value="Health Insurance">

                                    Health Insurance

                                </option>

                                <option value="Life Insurance">

                                    Life Insurance

                                </option>

                                <option value="Vehicle Insurance">

                                    Vehicle Insurance

                                </option>

                                <option value="Home Insurance">

                                    Home Insurance

                                </option>

                                <option value="Travel Insurance">

                                    Travel Insurance

                                </option>

                            </select>

                        </div>

                        {/* Policy Number */}

                        <div>

                            <label className="block font-semibold mb-2">

                                Policy Number

                            </label>

                            <input

                                type="text"

                                name="policyNumber"

                                value={formData.policyNumber}

                                onChange={handleChange}

                                placeholder="POL1001"

                                required

                                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"

                            />

                        </div>

                        {/* Premium */}

                        <div>

                            <label className="block font-semibold mb-2">

                                Premium Amount

                            </label>

                            <input

                                type="number"

                                name="premiumAmount"

                                value={formData.premiumAmount}

                                onChange={handleChange}

                                placeholder="15000"

                                required

                                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"

                            />

                        </div>

                        {/* Start Date */}

                        <div>

                            <label className="block font-semibold mb-2">

                                Start Date

                            </label>

                            <input

                                type="date"

                                name="startDate"

                                value={formData.startDate}

                                onChange={handleChange}

                                required

                                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"

                            />

                        </div>

                        {/* End Date */}

                        <div>

                            <label className="block font-semibold mb-2">

                                End Date

                            </label>

                            <input

                                type="date"

                                name="endDate"

                                value={formData.endDate}

                                onChange={handleChange}

                                required

                                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"

                            />

                        </div>

                        {/* Status */}

                        <div className="md:col-span-2">

                            
                        </div>

                    </div>

                    {/* Buttons */}

                    <div className="flex justify-end gap-4 mt-10 pt-6 border-t">

                        <button

                            type="button"

                            onClick={onCancel}

                            className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-xl font-semibold transition"

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            className="bg-gradient-to-r from-blue-700 to-indigo-700 hover:opacity-90 text-white px-8 py-3 rounded-xl font-semibold transition"

                        >

                            Save Policy

                        </button>

                    </div>

                </div>

            </form>

        </div>

    );

}

export default PolicyForm;