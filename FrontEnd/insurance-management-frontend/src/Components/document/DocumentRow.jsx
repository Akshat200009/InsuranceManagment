import { FaDownload } from "react-icons/fa";
import documentService from "../../Services/documentService";

function DocumentRow({ document }) {

    const handleDownload = async () => {

        const response =
            await documentService.downloadDocument(document.id);

        const url = window.URL.createObjectURL(

            new Blob([response.data])

        );

        const link = window.document.createElement("a");

        link.href = url;

        link.download = document.fileName;

        link.click();

    };

    return (

        <tr className="border-b hover:bg-gray-50">

            <td className="p-4">

                {document.customerName}

            </td>

            <td className="p-4">

                {document.fileName}

            </td>

            <td className="p-4">

                {document.documentType}

            </td>

            <td className="p-4">

                {new Date(document.uploadedAt).toLocaleDateString()}

            </td>

            <td className="text-center">

                <button

                    onClick={handleDownload}

                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"

                >

                    <FaDownload />

                </button>

            </td>

        </tr>

    );

}

export default DocumentRow;