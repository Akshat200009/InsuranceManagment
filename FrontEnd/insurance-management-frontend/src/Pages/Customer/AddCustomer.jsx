import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import customerService from "../../Services/customerService";
import CustomerForm from "../../Components/customer/CustomerForm";

function AddCustomer() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        name: "",

        email: "",

        phone: "",

        dob: "",

        address: ""

    });

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (formData.name.trim() === "") {

            toast.error("Customer Name is required");

            return;

        }

        if (formData.email.trim() === "") {

            toast.error("Email is required");

            return;

        }

        if (formData.phone.trim() === "") {

            toast.error("Phone Number is required");

            return;

        }

        if (formData.phone.length !== 10) {

            toast.error("Phone Number must be 10 digits");

            return;

        }

        if (formData.dob === "") {

            toast.error("Date of Birth is required");

            return;

        }

        if (formData.address.trim() === "") {

            toast.error("Address is required");

            return;

        }

        try {

            await customerService.addCustomer(formData);

            toast.success("Customer Added Successfully");

            navigate("/customers");

        }

        catch (error) {

            if (error.response?.data?.message) {

                toast.error(error.response.data.message);

            }

            else {

                toast.error("Unable to add customer");

            }

        }

    };

    return (

        <CustomerForm

            formData={formData}

            setFormData={setFormData}

            handleSubmit={handleSubmit}

            buttonText="Save Customer"

        />

    );

}

export default AddCustomer;