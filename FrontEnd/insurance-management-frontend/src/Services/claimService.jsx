import axios from "axios";

const BASE_URL = "http://localhost:8090/api/claims";

const getAuthHeader = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
};

const claimService = {
  // Submit Claim
  submitClaim: async (claim) => {
    const response = await axios.post(
      BASE_URL,

      claim,

      getAuthHeader(),
    );

    return response.data;
  },

  // Pending Claims
  getPendingClaims: async () => {
    const response = await axios.get(
      `${BASE_URL}/pending`,

      getAuthHeader(),
    );

    return response.data;
  },

  // Approve Claim
  approveClaim: async (id) => {
    const response = await axios.put(
      `${BASE_URL}/${id}/approve`,

      {},

      getAuthHeader(),
    );

    return response.data;
  },

  // Reject Claim
  rejectClaim: async (id) => {
    const response = await axios.put(
      `${BASE_URL}/${id}/reject`,

      {},

      getAuthHeader(),
    );

    return response.data;
  },

  // Claim History
  getClaimHistory: async (policyId) => {
    const response = await axios.put(
      `${BASE_URL}/history/${policyId}`,

      {},

      getAuthHeader(),
    );

    return response.data;
  },

  // Filter By Status
  getClaimsByStatus: async (status) => {
    const response = await axios.get(
      `${BASE_URL}/status?status=${status}`,

      getAuthHeader(),
    );

    return response.data;
  },
  // Get Claim By Id
  getClaimById: async (id) => {
    const response = await axios.get(
      `${BASE_URL}/${id}`,

      getAuthHeader(),
    );

    return response.data;
  },
  // Customer Claims
  getCustomerClaims: async (customerId) => {
    const response = await axios.get(
      `${BASE_URL}/customer/${customerId}`,

      getAuthHeader(),
    );

    return response.data;
  },
};

export default claimService;
