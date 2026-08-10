import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../Layouts/DashboardLayout";
import premiumService from "../../Services/premiumService";
import policyService from "../../Services/policyService";
import Swal from "sweetalert2";

function AddPremium() {

    const navigate = useNavigate();

    const [policies, setPolicies] = useState([]);

    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({

        policyId: "",

        amount: "",

        paymentDate: "",

        paymentStatus: "PAID"

    });

    useEffect(() => {

        loadPolicies();

    }, []);

    const loadPolicies = async () => {

        try {

            const response = await policyService.getAllPolicies();

            setPolicies(response);

        }

        catch (error) {

            console.log(error);

        }

    };

    const validate = () => {

        let newErrors = {};

        if (!formData.policyId)
            newErrors.policyId = "Policy is required";

        if (!formData.amount)
            newErrors.amount = "Amount is required";

        else if (formData.amount <= 0)
            newErrors.amount = "Amount must be greater than zero";

        if (!formData.paymentDate)
            newErrors.paymentDate = "Payment Date is required";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validate()) return;

        try {

            await premiumService.recordPayment(formData);

            Swal.fire({

                icon: "success",

                title: "Success",

                text: "Premium Recorded Successfully",

                timer: 1500,

                showConfirmButton: false

            });

            navigate("/premiums");

        }

        catch (error) {

            Swal.fire({

                icon: "error",

                title: "Failed",

                text:

                    error.response?.data?.message ||

                    "Unable to record payment"

            });

        }

    };

    return (

        <DashboardLayout>

            <div className="bg-white rounded-2xl shadow-md p-8 max-w-3xl mx-auto">

                <h1 className="text-3xl font-bold mb-8">

                    Record Premium Payment

                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    <div>

                        <label className="font-semibold">

                            Policy

                        </label>

                        <select

                            value={formData.policyId}

                            onChange={(e) =>
                                setFormData({

                                    ...formData,

                                    policyId: e.target.value

                                })
                            }

                            className="w-full border rounded-xl p-3 mt-2"

                        >

                            <option value="">

                                Select Policy

                            </option>

                            {

                                policies.map(policy => (

                                    <option

                                        key={policy.id}

                                        value={policy.id}

                                    >

                                        {policy.policyNumber}

                                    </option>

                                ))

                            }

                        </select>

                        <p className="text-red-500 text-sm">

                            {errors.policyId}

                        </p>

                    </div>

                    <div>

                        <label className="font-semibold">

                            Amount

                        </label>

                        <input

                            type="number"

                            value={formData.amount}

                            onChange={(e) =>
                                setFormData({

                                    ...formData,

                                    amount: e.target.value

                                })
                            }

                            className="w-full border rounded-xl p-3 mt-2"

                        />

                        <p className="text-red-500 text-sm">

                            {errors.amount}

                        </p>

                    </div>

                    <div>

                        <label className="font-semibold">

                            Payment Date

                        </label>

                        <input

                            type="date"

                            value={formData.paymentDate}

                            onChange={(e) =>
                                setFormData({

                                    ...formData,

                                    paymentDate: e.target.value

                                })
                            }

                            className="w-full border rounded-xl p-3 mt-2"

                        />

                        <p className="text-red-500 text-sm">

                            {errors.paymentDate}

                        </p>

                    </div>

                    <div>

                        <label className="font-semibold">

                            Payment Status

                        </label>

                        <select

                            value={formData.paymentStatus}

                            onChange={(e) =>
                                setFormData({

                                    ...formData,

                                    paymentStatus: e.target.value

                                })
                            }

                            className="w-full border rounded-xl p-3 mt-2"

                        >

                            <option value="PAID">

                                PAID

                            </option>

                            <option value="PENDING">

                                PENDING

                            </option>

                        </select>

                    </div>

                    <div className="flex justify-end gap-4 pt-6">

                        <button

                            type="button"

                            onClick={() => navigate("/premiums")}

                            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl"

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"

                        >

                            Save Payment

                        </button>

                    </div>

                </form>

            </div>

        </DashboardLayout>

    );

}

export default AddPremium;