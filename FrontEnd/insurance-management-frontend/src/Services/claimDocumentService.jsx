import axios from "axios";

const BASE_URL =
    "http://localhost:8090/api/claim-documents";

const getAuthHeader = () => ({
    headers: {
        Authorization:
            `Bearer ${localStorage.getItem("token")}`,
    },
});

const claimDocumentService = {

    // ===============================
    // UPLOAD DOCUMENT
    // ===============================

    uploadDocument: async (claimId, file) => {

        const formData = new FormData();

        formData.append("file", file);

        const response = await axios.post(
            `${BASE_URL}/upload/${claimId}`,
            formData,
            getAuthHeader()
        );

        return response.data;
    },


    // ===============================
    // GET CLAIM DOCUMENTS
    // ===============================

    getClaimDocuments: async (claimId) => {

        const response = await axios.get(
            `${BASE_URL}/${claimId}`,
            getAuthHeader()
        );

        return response.data;
    },


    // ===============================
    // DOWNLOAD / VIEW DOCUMENT
    // ===============================

    downloadDocument: async (documentId) => {

        return await axios.get(
            `${BASE_URL}/download/${documentId}`,
            {
                ...getAuthHeader(),
                responseType: "blob",
            }
        );
    },

};

export default claimDocumentService;