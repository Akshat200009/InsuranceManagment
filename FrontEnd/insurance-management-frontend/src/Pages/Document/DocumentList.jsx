import { useEffect, useState } from "react";

import DashboardLayout from "../../Layouts/DashboardLayout";

import UploadDocumentModal from "../../Components/document/UploadDocumentModal";

import DocumentTable from "../../Components/document/DocumentTable";

import documentService from "../../Services/documentService";

import toast from "react-hot-toast";


function DocumentList() {

    const [documents, setDocuments] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const role = localStorage.getItem("role");

    const isCustomer = role === "CUSTOMER";

    const isAgent = role === "AGENT";


    // ===============================
    // LOAD DOCUMENTS
    // ===============================

    useEffect(() => {

        loadDocuments();

    }, []);


    const loadDocuments = async () => {

        try {

            let response;


            // ===============================
            // CUSTOMER
            // ===============================

            if (isCustomer) {

                response =
                    await documentService.getMyDocuments();

            }

            // ===============================
            // AGENT
            // ===============================

            else if (isAgent) {

                response =
                    await documentService.getAllDocuments();

            }

            // ===============================
            // ADMIN
            // ===============================

            else {

                response =
                    await documentService.getAllDocuments();

            }


            setDocuments(response);

        } catch (error) {

            console.log(error);

            toast.error("Unable to load documents");

        }

    };


    // ===============================
    // UPDATE DOCUMENT IN SAME ROW
    // ===============================

    const handleDocumentUpdate = (updatedDocument) => {

        setDocuments(prevDocuments =>

            prevDocuments.map(document =>

                document.id === updatedDocument.id

                    ? updatedDocument

                    : document

            )

        );

    };


    // ===============================
    // OPEN UPLOAD MODAL
    // ===============================

    const openUploadModal = () => {

        setShowModal(true);

    };


    return (

        <DashboardLayout>

            <div className="p-8">


                {/* ===============================
                    HEADER
                =============================== */}

                <div className="flex justify-between items-center mb-8">

                    <h1 className="text-3xl font-bold">

                        Document Management

                    </h1>


                    {/* CUSTOMER ONLY */}

                    {isCustomer && (

                        <button

                            onClick={openUploadModal}

                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"

                        >

                            Upload Document

                        </button>

                    )}

                </div>


                {/* ===============================
                    DESCRIPTION
                =============================== */}

                <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

                    <h2 className="text-xl font-semibold mb-2">

                        Manage Documents

                    </h2>


                    {/* CUSTOMER DESCRIPTION */}

                    {isCustomer && (

                        <p className="text-gray-600">

                            Upload customer identity documents and policy
                            documents. View and download uploaded files anytime.

                        </p>

                    )}


                    {/* AGENT DESCRIPTION */}

                    {isAgent && (

                        <p className="text-gray-600">

                            Verify customer identity documents and policy
                            documents. View and download uploaded files anytime.

                        </p>

                    )}


                    {/* ADMIN DESCRIPTION */}

                    {!isCustomer && !isAgent && (

                        <p className="text-gray-600">

                            View and manage customer identity and policy
                            documents.

                        </p>

                    )}

                </div>


                {/* ===============================
                    DOCUMENTS
                =============================== */}

                {documents.length === 0 ? (

                    <div className="bg-white rounded-2xl shadow-md p-16 text-center">

                        <h2 className="text-2xl font-bold text-slate-700">

                            No Documents Available

                        </h2>


                        {/* CUSTOMER */}

                        {isCustomer && (

                            <>

                                <p className="text-gray-500 mt-3">

                                    Upload your first Identity or Policy
                                    document.

                                </p>


                                <button

                                    onClick={openUploadModal}

                                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl mt-5"

                                >

                                    Upload Document

                                </button>

                            </>

                        )}


                        {/* AGENT */}

                        {isAgent && (

                            <p className="text-gray-500 mt-3">

                                No customer documents are available for
                                verification.

                            </p>

                        )}

                    </div>

                ) : (

                    <DocumentTable

                        documents={documents}

                        onDocumentUpdate={handleDocumentUpdate}

                    />

                )}


            </div>


            {/* ===============================
                UPLOAD MODAL
            =============================== */}

            {showModal && (

                <UploadDocumentModal

                    onClose={() => setShowModal(false)}

                    onUpload={async () => {

                        await loadDocuments();

                        setShowModal(false);

                    }}

                />

            )}

        </DashboardLayout>

    );

}


export default DocumentList;