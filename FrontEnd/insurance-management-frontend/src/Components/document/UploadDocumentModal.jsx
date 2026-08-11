import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import customerService from "../../Services/customerService";
import documentService from "../../Services/documentService";

function UploadDocumentModal({ onClose, onUpload }) {

    const role = localStorage.getItem("role");

    const isAdmin = role === "ADMIN";
    const isCustomer = role === "CUSTOMER";

    const [customers, setCustomers] = useState([]);

    const [formData, setFormData] = useState({
        customerId: "",
        documentType: "IDENTITY"
    });

    const [selectedFile, setSelectedFile] = useState(null);

    const [errors, setErrors] = useState({});


    // ==========================================
    // LOAD CUSTOMERS - ONLY FOR ADMIN
    // ==========================================

    useEffect(() => {

        if (isAdmin) {
            loadCustomers();
        }

        if (isCustomer) {

            const customerId =
                localStorage.getItem("customerId");

            setFormData(prev => ({
                ...prev,
                customerId: customerId || ""
            }));
        }

    }, [isAdmin, isCustomer]);


    const loadCustomers = async () => {

        try {

            const response =
                await customerService.getMyCustomers();

            setCustomers(response);

        } catch (error) {

            console.log("CUSTOMER LOAD ERROR:", error);

            Swal.fire({
                icon: "error",
                title: "Unable to load customers",
                text: "Customers could not be loaded."
            });

        }

    };


    // ==========================================
    // VALIDATION
    // ==========================================

    const validate = () => {

        let newErrors = {};

        if (!formData.customerId) {
            newErrors.customerId = "Customer is required";
        }

        if (!selectedFile) {
            newErrors.file = "Please choose a document";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    // ==========================================
    // UPLOAD
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validate()) {
            return;
        }

        try {

            if (formData.documentType === "IDENTITY") {

                await documentService.uploadIdentityDocument(
                    formData.customerId,
                    selectedFile
                );

            } else {

                await documentService.uploadPolicyDocument(
                    formData.customerId,
                    selectedFile
                );

            }


            Swal.fire({
                icon: "success",
                title: "Uploaded",
                text: "Document Uploaded Successfully",
                timer: 1500,
                showConfirmButton: false
            });


            onUpload();

        } catch (error) {

            console.log("UPLOAD ERROR:", error);

            Swal.fire({
                icon: "error",
                title: "Upload Failed",
                text:
                    error.response?.data?.message ||
                    error.response?.data ||
                    "Unable to upload document"
            });

        }

    };


    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl">


                {/* HEADER */}

                <div className="bg-blue-700 text-white p-6 rounded-t-2xl">

                    <h2 className="text-3xl font-bold">
                        Upload Document
                    </h2>

                </div>


                <form
                    onSubmit={handleSubmit}
                    className="p-8"
                >

                    <div className="space-y-5">


                        {/* ==========================================
                            CUSTOMER - ADMIN ONLY
                        ========================================== */}

                        {isAdmin && (

                            <div>

                                <label className="block font-medium">
                                    Customer
                                </label>

                                <select
                                    value={formData.customerId}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            customerId: e.target.value
                                        })
                                    }
                                    className="w-full border rounded-xl p-3 mt-2"
                                >

                                    <option value="">
                                        Select Customer
                                    </option>

                                    {customers.map((customer) => (

                                        <option
                                            key={customer.id}
                                            value={customer.id}
                                        >
                                            {customer.name}
                                        </option>

                                    ))}

                                </select>

                                {errors.customerId && (

                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.customerId}
                                    </p>

                                )}

                            </div>

                        )}


                        {/* ==========================================
                            CUSTOMER LOGIN
                            No Customer Dropdown
                        ========================================== */}

                        {isCustomer && !formData.customerId && (

                            <p className="text-red-500 text-sm">
                                Customer information not found. Please login again.
                            </p>

                        )}


                        {/* ==========================================
                            DOCUMENT TYPE
                        ========================================== */}

                        <div>

                            <label className="block font-medium">
                                Document Type
                            </label>

                            <select
                                value={formData.documentType}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        documentType: e.target.value
                                    })
                                }
                                className="w-full border rounded-xl p-3 mt-2"
                            >

                                <option value="IDENTITY">
                                    Identity Document
                                </option>

                                <option value="POLICY">
                                    Policy Document
                                </option>

                            </select>

                        </div>


                        {/* ==========================================
                            FILE
                        ========================================== */}

                        <div>

                            <label className="block font-medium">
                                Select File
                            </label>

                            <input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) =>
                                    setSelectedFile(
                                        e.target.files[0]
                                    )
                                }
                                className="w-full border rounded-xl p-3 mt-2"
                            />

                            {selectedFile && (

                                <p className="text-gray-600 text-sm mt-2">
                                    Selected: {selectedFile.name}
                                </p>

                            )}

                            {errors.file && (

                                <p className="text-red-500 text-sm mt-1">
                                    {errors.file}
                                </p>

                            )}

                        </div>

                    </div>


                    {/* ==========================================
                        BUTTONS
                    ========================================== */}

                    <div className="flex justify-end gap-4 mt-8">

                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl"
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
                        >
                            Upload
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default UploadDocumentModal;