import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import customerService from "../../Services/customerService";
import documentService from "../../Services/documentService";

function UploadDocumentModal({ onClose, onUpload }) {

    const [customers, setCustomers] = useState([]);

    const [formData, setFormData] = useState({

        customerId: "",

        documentType: "IDENTITY"

    });

    const [selectedFile, setSelectedFile] = useState(null);

    const [errors, setErrors] = useState({});

    useEffect(() => {

        loadCustomers();

    }, []);

    const loadCustomers = async () => {

        try {

            const response =
                await customerService.getAllCustomers();

            setCustomers(response);

        }

        catch (error) {

            console.log(error);

        }

    };

    const validate = () => {

        let newErrors = {};

        if (!formData.customerId)

            newErrors.customerId = "Customer is required";

        if (!selectedFile)

            newErrors.file = "Please choose a document";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validate()) return;

        try {

            if (formData.documentType === "IDENTITY") {

                await documentService.uploadIdentityDocument(

                    formData.customerId,

                    selectedFile

                );

            }

            else {

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

        }

        catch (error) {

            Swal.fire({

                icon: "error",

                title: "Upload Failed",

                text:

                    error.response?.data?.message ||

                    "Unable to upload document"

            });

        }

    };

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl">

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

                        <div>

                            <label>

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

                                {

                                    customers.map((customer) => (

                                        <option

                                            key={customer.id}

                                            value={customer.id}

                                        >

                                            {customer.name}

                                        </option>

                                    ))

                                }

                            </select>

                            <p className="text-red-500 text-sm">

                                {errors.customerId}

                            </p>

                        </div>

                        <div>

                            <label>

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

                        <div>

                            <label>

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

                            <p className="text-red-500 text-sm">

                                {errors.file}

                            </p>

                        </div>

                    </div>

                    <div className="flex justify-end gap-4 mt-8">

                        <button

                            type="button"

                            onClick={onClose}

                            className="bg-gray-500 text-white px-6 py-3 rounded-xl"

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