import { useState } from "react";

function RenewPolicyModal({

    policy,

    onRenew,

    onClose

}) {

    const [formData, setFormData] = useState({

        premiumAmount: policy.premiumAmount,

        startDate: policy.startDate,

        endDate: policy.endDate

    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const validate = () => {

        let newErrors = {};

        if (!formData.premiumAmount)

            newErrors.premiumAmount = "Premium Amount is required";

        else if (Number(formData.premiumAmount) <= 0)

            newErrors.premiumAmount =
                "Premium Amount must be greater than zero";

        if (!formData.startDate)

            newErrors.startDate = "Start Date is required";

        if (!formData.endDate)

            newErrors.endDate = "End Date is required";

        if (

            formData.startDate &&

            formData.endDate &&

            new Date(formData.endDate) <= new Date(formData.startDate)

        ) {

            newErrors.endDate =
                "End Date must be after Start Date";

        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!validate()) return;

        onRenew(formData);

    };

    return (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl">

                <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white rounded-t-2xl p-6">

                    <h2 className="text-3xl font-bold">

                        Renew Policy

                    </h2>

                    <p className="mt-2">

                        {policy.policyNumber}

                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="p-8"
                >

                    <div className="grid grid-cols-2 gap-6">

                        <div>

                            <label className="font-semibold">

                                Premium Amount

                            </label>

                            <input

                                type="number"

                                name="premiumAmount"

                                value={formData.premiumAmount}

                                onChange={handleChange}

                                className="w-full border rounded-xl p-3 mt-2"

                            />

                            <p className="text-red-500 text-sm">

                                {errors.premiumAmount}

                            </p>

                        </div>

                        <div>

                            <label className="font-semibold">

                                Start Date

                            </label>

                            <input

                                type="date"

                                name="startDate"

                                value={formData.startDate}

                                onChange={handleChange}

                                className="w-full border rounded-xl p-3 mt-2"

                            />

                            <p className="text-red-500 text-sm">

                                {errors.startDate}

                            </p>

                        </div>

                        <div>

                            <label className="font-semibold">

                                End Date

                            </label>

                            <input

                                type="date"

                                name="endDate"

                                value={formData.endDate}

                                onChange={handleChange}

                                className="w-full border rounded-xl p-3 mt-2"

                            />

                            <p className="text-red-500 text-sm">

                                {errors.endDate}

                            </p>

                        </div>

                    </div>

                    <div className="flex justify-end gap-4 mt-8">

                        <button

                            type="button"

                            onClick={onClose}

                            className="px-6 py-3 bg-gray-500 text-white rounded-xl"

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"

                        >

                            Renew Policy

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default RenewPolicyModal;