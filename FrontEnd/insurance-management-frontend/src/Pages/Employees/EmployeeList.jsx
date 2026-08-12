import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { FaPlus } from "react-icons/fa";

import Swal from "sweetalert2";

import toast from "react-hot-toast";

import DashboardLayout from "../../Layouts/DashboardLayout";

import EmployeeTable from "../../Components/employee/EmployeeTable";

import userService from "../../Services/userService";


function EmployeeList() {

    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);


    // ===============================
    // LOAD EMPLOYEES
    // ===============================

    useEffect(() => {

        loadEmployees();

    }, []);


    const loadEmployees = async () => {

        try {

            const response =
                await userService.getAllEmployees();

            setEmployees(response);

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Unable to load employees"
            );

        }

    };


    // ===============================
    // VIEW
    // ===============================

    const handleView = (id) => {

        navigate(`/employees/${id}`);

    };


    // ===============================
    // EDIT
    // ===============================

    const handleEdit = (id) => {

        navigate(`/employees/edit/${id}`);

    };


    // ===============================
    // DELETE
    // ===============================

    const handleDelete = async (employee) => {

        const result = await Swal.fire({

            title: "Delete Employee?",

            html: `
                <p>
                    Are you sure you want to delete
                    <br><br>
                    <b>${employee.fullname}</b>?
                </p>
            `,

            icon: "warning",

            showCancelButton: true,

            confirmButtonText: "Delete",

            cancelButtonText: "Cancel",

            confirmButtonColor: "#dc2626",

            cancelButtonColor: "#6b7280",

            reverseButtons: true

        });


        if (!result.isConfirmed) {

            return;

        }


        try {

            await userService.deleteEmployee(
                employee.id
            );


            setEmployees(prevEmployees =>
                prevEmployees.filter(
                    e => e.id !== employee.id
                )
            );


            Swal.fire({

                icon: "success",

                title: "Deleted!",

                text: "Employee deleted successfully.",

                timer: 1500,

                showConfirmButton: false

            });

        } catch (error) {

            console.log(error);

            Swal.fire({

                icon: "error",

                title: "Failed",

                text:
                    error.response?.data?.message ||
                    "Unable to delete employee"

            });

        }

    };


    return (

        <DashboardLayout>

            <div className="p-8">


                {/* ===============================
                    HEADER
                =============================== */}

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-3xl font-bold">

                            Employee Management

                        </h1>

                        <p className="text-gray-500 mt-2">

                            Manage insurance agents and employee accounts.

                        </p>

                    </div>


                    <button

                        onClick={() =>
                            navigate("/employees/add")
                        }

                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"

                    >

                        <FaPlus />

                        Add Employee

                    </button>

                </div>


                {/* ===============================
                    TABLE
                =============================== */}

                {employees.length === 0 ? (

                    <div className="bg-white rounded-2xl shadow-md p-16 text-center">

                        <h2 className="text-2xl font-bold text-slate-700">

                            No Employees Found

                        </h2>

                        <p className="text-gray-500 mt-3">

                            Add your first employee to get started.

                        </p>

                        <button

                            onClick={() =>
                                navigate("/employees/add")
                            }

                            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"

                        >

                            Add Employee

                        </button>

                    </div>

                ) : (

                    <EmployeeTable

                        employees={employees}

                        onView={handleView}

                        onEdit={handleEdit}

                        onDelete={handleDelete}

                    />

                )}


                {/* ===============================
                    COUNT
                =============================== */}

                <h2 className="text-2xl font-semibold mt-8 text-blue-600">

                    Employee Count : {employees.length}

                </h2>

            </div>

        </DashboardLayout>

    );

}

export default EmployeeList;