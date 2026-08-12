import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";
import toast from "react-hot-toast";

import DashboardLayout from "../../Layouts/DashboardLayout";
import EmployeeForm from "../../Components/employee/EmployeeForm";
import userService from "../../Services/userService";


function EditEmployee() {

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


    const handleSubmit = async (employeeData) => {

        try {

            await userService.updateEmployee(
                id,
                employeeData
            );


            await Swal.fire({

                icon: "success",

                title: "Updated!",

                text: "Employee updated successfully.",

                timer: 1500,

                showConfirmButton: false

            });


            navigate("/employees");

        } catch (error) {

            console.log(error);

            Swal.fire({

                icon: "error",

                title: "Update Failed",

                text:
                    error.response?.data?.message ||
                    error.response?.data ||
                    "Unable to update employee"

            });

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

                <h1 className="text-3xl font-bold mb-8">

                    Edit Employee

                </h1>


                <EmployeeForm
                    employee={employee}
                    onSubmit={handleSubmit}
                    onCancel={() =>
                        navigate("/employees")
                    }
                />

            </div>

        </DashboardLayout>

    );

}

export default EditEmployee;