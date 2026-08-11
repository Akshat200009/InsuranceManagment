import {
    FaEye,
    FaDownload,
    FaCheck,
    FaTimes
} from "react-icons/fa";

import Swal from "sweetalert2";

import documentService from "../../Services/documentService";

function DocumentRow({ document, onDocumentUpdate }) {

    const role = localStorage.getItem("role");

    const isAgent = role === "AGENT";


    // ===============================
    // VIEW DOCUMENT
    // ===============================

    const handleView = async () => {

        try {

            const response =
                await documentService.viewDocument(
                    document.id
                );

            const fileURL =
                URL.createObjectURL(response.data);

            window.open(fileURL, "_blank");

        } catch (error) {

            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Unable to view document"
            });

        }

    };


    // ===============================
    // DOWNLOAD DOCUMENT
    // ===============================

    const handleDownload = async () => {

        try {

            const response =
                await documentService.downloadDocument(
                    document.id
                );

            const url =
                URL.createObjectURL(response.data);

            const link =
                window.document.createElement("a");

            link.href = url;

            link.download = document.fileName;

            window.document.body.appendChild(link);

            link.click();

            window.document.body.removeChild(link);

            URL.revokeObjectURL(url);

        } catch (error) {

            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Unable to download document"
            });

        }

    };


    // ===============================
    // VERIFY DOCUMENT
    // ===============================

    const handleVerify = async () => {

        const result = await Swal.fire({

            title: "Verify Document?",

            text: "Are you sure this document is valid?",

            icon: "question",

            showCancelButton: true,

            confirmButtonText: "Verify",

            cancelButtonText: "Cancel",

            confirmButtonColor: "#16a34a",

            cancelButtonColor: "#6b7280",

            reverseButtons: true

        });


        if (!result.isConfirmed) {
            return;
        }


        try {

            const updatedDocument =
                await documentService.verifyDocument(
                    document.id
                );


            // Update same row
            onDocumentUpdate(updatedDocument);


            await Swal.fire({

                icon: "success",

                title: "Verified!",

                text: "Document verified successfully.",

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
                    "Unable to verify document"

            });

        }

    };


    // ===============================
    // REJECT DOCUMENT
    // ===============================

    const handleReject = async () => {

        const result = await Swal.fire({

            title: "Reject Document?",

            text: "Are you sure this document is invalid?",

            icon: "warning",

            showCancelButton: true,

            confirmButtonText: "Reject",

            cancelButtonText: "Cancel",

            confirmButtonColor: "#dc2626",

            cancelButtonColor: "#6b7280",

            reverseButtons: true

        });


        if (!result.isConfirmed) {
            return;
        }


        try {

            const updatedDocument =
                await documentService.rejectDocument(
                    document.id
                );


            // Update same row
            onDocumentUpdate(updatedDocument);


            await Swal.fire({

                icon: "success",

                title: "Rejected!",

                text: "Document rejected successfully.",

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
                    "Unable to reject document"

            });

        }

    };


    // ===============================
    // STATUS STYLE
    // ===============================

    const getStatusClass = () => {

        if (document.status === "VERIFIED") {

            return "bg-green-100 text-green-700";

        }

        if (document.status === "REJECTED") {

            return "bg-red-100 text-red-700";

        }

        return "bg-yellow-100 text-yellow-700";

    };


    return (

        <tr className="border-t hover:bg-slate-50 transition">

            {/* CUSTOMER */}

            <td className="px-4 py-4">
                {document.customerName}
            </td>


            {/* FILE NAME */}

            <td className="px-4 py-4 font-medium">
                {document.fileName}
            </td>


            {/* DOCUMENT TYPE */}

            <td className="px-4 py-4">
                {document.documentType}
            </td>


            {/* UPLOADED DATE */}

            <td className="px-4 py-4">

                {document.uploadedAt

                    ? new Date(
                        document.uploadedAt
                    ).toLocaleDateString("en-GB")

                    : "-"

                }

            </td>


            {/* STATUS */}

            <td className="px-4 py-4">

                <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusClass()}`}
                >

                    {document.status || "PENDING"}

                </span>

            </td>


            {/* ACTIONS */}

            <td className="px-4 py-4">

                <div className="flex justify-center gap-2">

                    {/* VIEW */}

                    <button
                        onClick={handleView}
                        title="View Document"
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition"
                    >
                        <FaEye />
                    </button>


                    {/* DOWNLOAD */}

                    <button
                        onClick={handleDownload}
                        title="Download Document"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg transition"
                    >
                        <FaDownload />
                    </button>


                    {/* VERIFY + REJECT */}

                    {isAgent &&
                        document.status === "PENDING" && (

                            <>

                                <button
                                    onClick={handleVerify}
                                    title="Verify Document"
                                    className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition"
                                >
                                    <FaCheck />
                                </button>


                                <button
                                    onClick={handleReject}
                                    title="Reject Document"
                                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition"
                                >
                                    <FaTimes />
                                </button>

                            </>

                        )}

                </div>

            </td>

        </tr>

    );
}

export default DocumentRow;