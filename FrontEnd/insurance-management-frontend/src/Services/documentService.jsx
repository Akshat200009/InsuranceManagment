import axios from "axios";

const BASE_URL = "https://insurancemanagment.onrender.com/api/documents";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const documentService = {
  uploadIdentityDocument: async (customerId, file) => {
    const formData = new FormData();

    formData.append("file", file);

    const response = await axios.post(
      `${BASE_URL}/upload/${customerId}`,

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

  uploadPolicyDocument: async (customerId, file) => {
    const formData = new FormData();

    formData.append("file", file);

    const response = await axios.post(
      `${BASE_URL}/upload/policy/${customerId}`,

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

  getCustomerDocuments: async (customerId) => {
    const response = await axios.get(
      `${BASE_URL}/customer/${customerId}`,

      getAuthHeader(),
    );

    return response.data;
  },

  downloadDocument: async (documentId) => {
    const response = await axios.get(
      `${BASE_URL}/download/${documentId}`,

      {
        ...getAuthHeader(),
        responseType: "blob",
      },
    );

    return response;
  }, // Get All Documents
  getAllDocuments: async () => {
    const response = await axios.get(
      BASE_URL,

      getAuthHeader(),
    );

    return response.data;
  },
  getMyDocuments: async () => {
    const response = await axios.get(`${BASE_URL}/my`, getAuthHeader());

    return response.data;
  },
  viewDocument: async (documentId) => {
    const response = await axios.get(`${BASE_URL}/view/${documentId}`, {
      ...getAuthHeader(),
      responseType: "blob",
    });

    return response;
  },
  verifyDocument: async (documentId) => {
    const response = await axios.put(
      `${BASE_URL}/${documentId}/verify`,
      {},
      getAuthHeader(),
    );

    return response.data;
  },
  rejectDocument: async (documentId) => {

    const response = await axios.put(
        `${BASE_URL}/${documentId}/reject`,
        {},
        getAuthHeader()
    );

    return response.data;
},
};

export default documentService;
