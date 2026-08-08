import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

import customerService from "../../Services/customerService";
import policyService from "../../Services/policyService";
import PolicyForm from "../../Components/policy/PolicyForm";

function AddPolicy() {

    const navigate = useNavigate();

    const [customers, setCustomers] = useState([]);

    useEffect(() => {

        loadCustomers();

    }, []);

    const loadCustomers = async () => {

        try {

            const response = await customerService.getAllCustomers();

            setCustomers(response);

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to load customers");

        }

    };

    const handleSubmit = async (policyData) => {

        try {

            await policyService.createPolicy({

                ...policyData,

                status: "ACTIVE"

            });

            await Swal.fire({

                icon: "success",

                title: "Success",

                text: "Policy Created Successfully",

                confirmButtonColor: "#2563eb",

                timer: 1800,

                showConfirmButton: false

            });

            navigate("/policies");

        }

        catch (error) {

            Swal.fire({

                icon: "error",

                title: "Failed",

                text:

                    error.response?.data?.message ||

                    "Unable to create policy"

            });

        }

    };

    return (

        <div className="p-8">

            <PolicyForm

                customers={customers}

                onSubmit={handleSubmit}

                onCancel={() => navigate("/policies")}

            />

        </div>

    );

}

export default AddPolicy;