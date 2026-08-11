import {
    FaEye,
    FaDownload
} from "react-icons/fa";

import claimDocumentService
    from "../../Services/claimDocumentService";

function ClaimDocumentRow({ document }) {

 const downloadDocument = async () => {

    try {

        const response =
            await claimDocumentService.downloadDocument(document.id);

        const contentType =
            response.headers["content-type"] || document.fileType;

        const blob = new Blob(
            [response.data],
            { type: contentType }
        );

        const url =
            window.URL.createObjectURL(blob);

        const link =
            window.document.createElement("a");

        link.href = url;
        link.download = document.fileName;

        window.document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);

    } catch (error) {

        console.log(error);

    }

};

 const viewDocument = async () => {

    try {

        const response =
            await claimDocumentService.downloadDocument(document.id);

        const contentType =
            response.headers["content-type"] || document.fileType;

        const blob = new Blob(
            [response.data],
            { type: contentType }
        );

        const url =
            window.URL.createObjectURL(blob);

        window.open(url, "_blank");

    } catch (error) {

        console.log(error);

    }

};

    return (

        <tr className="border-b hover:bg-gray-50">

            <td className="p-3">

                {document.fileName}

            </td>

            <td className="p-3">

                {

                    document.fileType.includes("pdf")

                        ? "PDF"

                        : "Image"

                }

            </td>

            <td className="p-3">

                {document.uploadDate}

            </td>

            <td className="text-center">

                <div className="flex justify-center gap-2">

                    <button

                        onClick={viewDocument}

                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"

                    >

                        <FaEye />

                    </button>

                    <button

                        onClick={downloadDocument}

                        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg"

                    >

                        <FaDownload />

                    </button>

                </div>

            </td>

        </tr>

    );

}

export default ClaimDocumentRow;