import axios from "axios";

const BASE_URL = "http://localhost:8090/api/policies";

const getAuthHeader = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
};

const policyService = {
  // Get All Policies
  getAllPolicies: async () => {
    const response = await axios.get(
      BASE_URL,

      getAuthHeader(),
    );

    return response.data;
  },

  // Add Policy
  createPolicy: async (policy) => {
    const response = await axios.post(
      BASE_URL,

      policy,

      getAuthHeader(),
    );

    return response.data;
  },

  // Active Policies
  getActivePolicies: async () => {
    const response = await axios.get(
      `${BASE_URL}/active`,

      getAuthHeader(),
    );

    return response.data;
  },

  // Expired Policies
  getExpiredPolicies: async () => {
    const response = await axios.get(
      `${BASE_URL}/expired`,

      getAuthHeader(),
    );

    return response.data;
  },

  // Filter by Status
  getPoliciesByStatus: async (status) => {
    const response = await axios.get(
      `${BASE_URL}/status?status=${status}`,

      getAuthHeader(),
    );

    return response.data;
  },

  // Renew Policy
  renewPolicy: async (id, renewRequest) => {
    const response = await axios.put(
      `${BASE_URL}/${id}/renew`,

      renewRequest,

      getAuthHeader(),
    );

    return response.data;
  },

  // Cancel Policy
  cancelPolicy: async (id) => {
    const response = await axios.put(
      `${BASE_URL}/${id}/cancel`,

      {},

      getAuthHeader(),
    );

    return response.data;
  },
  // Expiring Policies
  getExpiringPolicies: async () => {
    const response = await axios.get(`${BASE_URL}/expiring`, getAuthHeader());
    return response.data;
  },
  // Get Policy By Id
  getPolicyById: async (id) => {
    const response = await axios.get(
      `${BASE_URL}/${id}`,

      getAuthHeader(),
    );

    return response.data;
  },
  // Get Customer Policies by ID
   getCustomerPolicies: async (customerId) => {

        const response = await axios.get(

            `${BASE_URL}/customer/${customerId}`,

            getAuthHeader()

        );

        return response.data;

    }

};

export default policyService;
