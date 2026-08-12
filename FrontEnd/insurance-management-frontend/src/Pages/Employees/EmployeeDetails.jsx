import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../Layouts/DashboardLayout";
import userService from "../../Services/userService";

function EmployeeDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [employee, setEmployee] = useState(null);


    useEffect(() => {

        loadEmployee();

    }, [id]);


    const loadEmployee = async () => {

        try {

            const response =
                await userService.getEmployeeById(id);

            setEmployee(response);

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Unable to load employee"
            );

        }

    };


    if (!employee) {

        return (

            <DashboardLayout>

                <div className="p-8 text-center text-gray-500">

                    Loading Employee...

                </div>

            </DashboardLayout>

        );

    }


    return (

        <DashboardLayout>

            <div className="p-8">

                {/* HEADER */}

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-3xl font-bold">

                            Employee Details

                        </h1>

                        <p className="text-gray-500 mt-2">

                            View employee information

                        </p>

                    </div>


                    <button
                        onClick={() =>
                            navigate(`/employees/edit/${employee.id}`)
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
                    >

                        Edit Employee

                    </button>

                </div>


                {/* DETAILS */}

                <div className="bg-white rounded-2xl shadow-md p-8 max-w-3xl">

                    <h2 className="text-2xl font-bold mb-8">

                        Employee Information

                    </h2>


                    <div className="grid md:grid-cols-2 gap-8">


                        {/* ID */}

                        <div>

                            <p className="text-gray-500">
                                Employee ID
                            </p>

                            <p className="font-semibold text-lg">
                                {employee.id}
                            </p>

                        </div>


                        {/* NAME */}

                        <div>

                            <p className="text-gray-500">
                                Full Name
                            </p>

                            <p className="font-semibold text-lg">
                                {employee.fullname}
                            </p>

                        </div>


                        {/* EMAIL */}

                        <div>

                            <p className="text-gray-500">
                                Email
                            </p>

                            <p className="font-semibold text-lg">
                                {employee.email}
                            </p>

                        </div>


                        {/* PHONE */}

                        <div>

                            <p className="text-gray-500">
                                Phone
                            </p>

                            <p className="font-semibold text-lg">
                                {employee.phone}
                            </p>

                        </div>


                        {/* ROLE */}

                        <div>

                            <p className="text-gray-500">
                                Role
                            </p>

                            <span className="inline-block mt-1 bg-blue-100 text-blue-700 px-4 py-1 rounded-full font-semibold">

                                {employee.role}

                            </span>

                        </div>

                    </div>


                    {/* BACK */}

                    <div className="mt-10">

                        <button
                            onClick={() =>
                                navigate("/employees")
                            }
                            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl"
                        >

                            Back to Employees

                        </button>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default EmployeeDetails;