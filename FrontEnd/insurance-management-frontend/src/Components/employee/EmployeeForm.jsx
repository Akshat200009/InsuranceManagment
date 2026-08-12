import { useState } from "react";

function EmployeeForm({
    employee = null,
    onSubmit,
    onCancel
}) {

    const [formData, setFormData] = useState({

        fullname: employee?.fullname || "",
        email: employee?.email || "",
        password: "",
        phone: employee?.phone || "",
        role: employee?.role || "AGENT"

    });


    const [errors, setErrors] = useState({});


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

    };


    const validate = () => {

        const newErrors = {};


        if (!formData.fullname.trim()) {
            newErrors.fullname = "Full name is required";
        }


        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        }


        if (!formData.phone.trim()) {
            newErrors.phone = "Phone is required";
        }


        if (!employee && !formData.password.trim()) {
            newErrors.password = "Password is required";
        }


        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };


    const handleSubmit = (e) => {

        e.preventDefault();

        if (!validate()) {
            return;
        }


        onSubmit(formData);

    };


    return (

        <div className="bg-white rounded-2xl shadow-md p-8 max-w-3xl">

            <h2 className="text-2xl font-bold text-slate-800 mb-8">

                {employee
                    ? "Update Employee"
                    : "Add Employee"
                }

            </h2>


            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                {/* FULL NAME */}

                <div>

                    <label className="block font-semibold mb-2">

                        Full Name

                    </label>

                    <input
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        placeholder="Enter employee name"
                        className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {errors.fullname && (

                        <p className="text-red-500 text-sm mt-1">

                            {errors.fullname}

                        </p>

                    )}

                </div>


                {/* EMAIL */}

                <div>

                    <label className="block font-semibold mb-2">

                        Email

                    </label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter employee email"
                        className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {errors.email && (

                        <p className="text-red-500 text-sm mt-1">

                            {errors.email}

                        </p>

                    )}

                </div>


                {/* PHONE */}

                <div>

                    <label className="block font-semibold mb-2">

                        Phone

                    </label>

                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {errors.phone && (

                        <p className="text-red-500 text-sm mt-1">

                            {errors.phone}

                        </p>

                    )}

                </div>


                {/* PASSWORD */}

                {!employee && (

                    <div>

                        <label className="block font-semibold mb-2">

                            Password

                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {errors.password && (

                            <p className="text-red-500 text-sm mt-1">

                                {errors.password}

                            </p>

                        )}

                    </div>

                )}


                {/* ROLE */}

                <div>

                    <label className="block font-semibold mb-2">

                        Role

                    </label>

                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >

                        <option value="AGENT">
                            Agent
                        </option>

                    </select>

                </div>


                {/* BUTTONS */}

                <div className="flex gap-4 pt-4">

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
                    >

                        {employee
                            ? "Update Employee"
                            : "Add Employee"
                        }

                    </button>


                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl"
                    >

                        Cancel

                    </button>

                </div>

            </form>

        </div>

    );

}

export default EmployeeForm;