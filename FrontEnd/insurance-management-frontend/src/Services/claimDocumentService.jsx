import axios from "axios";

const BASE_URL = "http://localhost:8090/api/claim-documents";

const getAuthHeader = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
};

const claimDocumentService = {
  uploadDocument: async (claimId, file) => {
    const formData = new FormData();

    formData.append("file", file);

    const response = await axios.post(
      `${BASE_URL}/upload/${claimId}`,

      formData,

      {
        ...getAuthHeader(),

        headers: {
          ...getAuthHeader().headers,

          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data;
  },
  getClaimDocuments: async (claimId) => {
    const response = await axios.get(
      `${BASE_URL}/${claimId}`,

      getAuthHeader(),
    );

    return response.data;
  },

  downloadDocument: async (documentId) => {
    return await axios.get(
      `${BASE_URL}/download/${documentId}`,

      {
        ...getAuthHeader(),
        responseType: "blob",
      },
    );
  },
};

export default claimDocumentService;
