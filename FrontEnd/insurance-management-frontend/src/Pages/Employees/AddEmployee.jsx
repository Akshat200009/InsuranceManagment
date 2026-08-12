import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import DashboardLayout from "../../Layouts/DashboardLayout";
import EmployeeForm from "../../Components/employee/EmployeeForm";
import userService from "../../Services/userService";


function AddEmployee() {

    const navigate = useNavigate();


    const handleSubmit = async (employeeData) => {

        try {

            await userService.addEmployee(employeeData);


            await Swal.fire({

                icon: "success",

                title: "Success",

                text: "Employee added successfully.",

                timer: 1500,

                showConfirmButton: false

            });


            navigate("/employees");

        } catch (error) {

            console.log(error);


            Swal.fire({

                icon: "error",

                title: "Failed",

                text:
                    error.response?.data?.message ||
                    error.response?.data ||
                    "Unable to add employee"

            });

        }

    };


    return (

        <DashboardLayout>

            <div className="p-8">

                <h1 className="text-3xl font-bold mb-8">

                    Add Employee

                </h1>


                <EmployeeForm
                    onSubmit={handleSubmit}
                    onCancel={() => navigate("/employees")}
                />

            </div>

        </DashboardLayout>

    );

}

export default AddEmployee;