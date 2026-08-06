import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import CustomerForm from "../../Components/customer/CustomerForm";

import customerService from "../../Services/customerService";

function EditCustomer() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({

        name: "",

        email: "",

        phone: "",

        dob: "",

        address: ""

    });

    useEffect(() => {

        loadCustomer();

    }, []);

    const loadCustomer = async () => {

        try {

            const response = await customerService.getCustomerById(id);

            setFormData({

                name: response.name || "",

                email: response.email || "",

                phone: response.phone || "",

                dob: response.dob || "",

                address: response.address || ""

            });

        }

        catch (error) {

            toast.error("Unable to load customer");

            navigate("/customers");

        }

        finally {

            setLoading(false);

        }

    };

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

            await customerService.updateCustomer(id, formData);

            toast.success("Customer Updated Successfully");

            navigate("/customers");

        }

        catch (error) {

            if (error.response?.data?.message) {

                toast.error(error.response.data.message);

            }

            else {

                toast.error("Unable to update customer");

            }

        }

    };

    if (loading) {

        return (

            <div className="p-10 text-center text-xl">

                Loading Customer...

            </div>

        );

    }

    return (

        <CustomerForm

            formData={formData}

            setFormData={setFormData}

            handleSubmit={handleSubmit}

            buttonText="Update Customer"

        />

    );

}

export default EditCustomer;