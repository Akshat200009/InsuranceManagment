import { useEffect, useState } from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { FaUpload } from "react-icons/fa";
import UploadDocumentModal from "../../Components/document/UploadDocumentModal";
import DocumentTable from "../../Components/document/DocumentTable";
import documentService from "../../Services/documentService";
import toast from "react-hot-toast";

function DocumentList() {

    const [documents, setDocuments] = useState([]);

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {

        loadDocuments();

    }, []);

    const loadDocuments = async () => {

        try {

            const response =
                await documentService.getAllDocuments();

            setDocuments(response);

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to load documents");

        }

    };

    return (

        <DashboardLayout>

            <div className="p-8">

                {/* Header */}

                <div className="flex justify-between items-center mb-8">

                    <h1 className="text-3xl font-bold">

                        Document Management

                    </h1>

                    <button

                        onClick={() => setShowModal(true)}

                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition"

                    >

                        <FaUpload />

                        Upload Document

                    </button>

                </div>

                {/* Description */}

                <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

                    <h2 className="text-xl font-semibold mb-2">

                        Manage Documents

                    </h2>

                    <p className="text-gray-600">

                        Upload customer identity documents and policy documents.
                        View and download uploaded files anytime.

                    </p>

                </div>

                {/* Documents */}

                {

                    documents.length === 0 ?

                    (

                        <div className="bg-white rounded-2xl shadow-md p-16 text-center">

                            <h2 className="text-2xl font-bold text-slate-700">

                                No Documents Available

                            </h2>

                            <p className="text-gray-500 mt-3">

                                Upload your first Identity or Policy document.

                            </p>

                            <button

                                onClick={() => setShowModal(true)}

                                className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"

                            >

                                Upload Document

                            </button>

                        </div>

                    )

                    :

                    (

                        <DocumentTable

                            documents={documents}

                        />

                    )

                }

            </div>

            {

                showModal &&

                <UploadDocumentModal

                    onClose={() => setShowModal(false)}

                    onUpload={() => {

                        loadDocuments();

                        setShowModal(false);

                    }}

                />

            }

        </DashboardLayout>

    );

}

export default DocumentList;