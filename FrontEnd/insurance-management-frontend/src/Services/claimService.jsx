import axios from "axios";

const BASE_URL = "http://localhost:8090/api/claims";

const getAuthHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

const claimService = {

    // =====================================================
    // CUSTOMER
    // =====================================================

    // Submit Claim
    submitClaim: async (claim) => {

        const response = await axios.post(
            BASE_URL,
            claim,
            getAuthHeader()
        );

        return response.data;
    },

    // Get Logged-in Customer's Claims
    getMyClaims: async () => {

        const response = await axios.get(
            `${BASE_URL}/my`,
            getAuthHeader()
        );

        return response.data;
    },

    // Get Logged-in Customer's Claim By ID
    getMyClaimById: async (id) => {

        const response = await axios.get(
            `${BASE_URL}/my/${id}`,
            getAuthHeader()
        );

        return response.data;
    },


    // =====================================================
    // ADMIN / AGENT
    // =====================================================

    // Get Pending Claims
    getPendingClaims: async () => {

        const response = await axios.get(
            `${BASE_URL}/pending`,
            getAuthHeader()
        );

        return response.data;
    },

    // Approve Claim
    approveClaim: async (id) => {

        const response = await axios.put(
            `${BASE_URL}/${id}/approve`,
            {},
            getAuthHeader()
        );

        return response.data;
    },

    // Reject Claim
    rejectClaim: async (id) => {

        const response = await axios.put(
            `${BASE_URL}/${id}/reject`,
            {},
            getAuthHeader()
        );

        return response.data;
    },

    // Claim History By Policy
    getClaimHistory: async (policyId) => {

        const response = await axios.put(
            `${BASE_URL}/history/${policyId}`,
            {},
            getAuthHeader()
        );

        return response.data;
    },

    // Filter Claims By Status
    getClaimsByStatus: async (status) => {

        const response = await axios.get(
            `${BASE_URL}/status`,
            {
                ...getAuthHeader(),
                params: {
                    status: status,
                },
            }
        );

        return response.data;
    },

    // Get Claim By ID - Admin / Agent
    getClaimById: async (id) => {

        const response = await axios.get(
            `${BASE_URL}/${id}`,
            getAuthHeader()
        );

        return response.data;
    },

    // Get Claims Of Specific Customer - Admin / Agent
    getCustomerClaims: async (customerId) => {

        const response = await axios.get(
            `${BASE_URL}/customer/${customerId}`,
            getAuthHeader()
        );

        return response.data;
    },
    // =====================================================
// ADMIN - ASSIGN CLAIM
// =====================================================

assignClaim: async (claimId, agentId) => {

    const response = await axios.put(
        `${BASE_URL}/${claimId}/assign/${agentId}`,
        {},
        getAuthHeader()
    );

    return response.data;
},


// =====================================================
// AGENT - MY ASSIGNED CLAIMS
// =====================================================

getMyAssignedClaims: async () => {

    const response = await axios.get(
        `${BASE_URL}/my-assigned`,
        getAuthHeader()
    );

    return response.data;
},

};

export default claimService;