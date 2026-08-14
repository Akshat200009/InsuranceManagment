import axios from "axios";

const BASE_URL = "https://insurancemanagment.onrender.com/api/premiums";

const getAuthHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

const premiumService = {

    // Record Premium Payment
    recordPayment: async (data) => {

        const response = await axios.post(
            BASE_URL,
            data,
            getAuthHeader()
        );

        return response.data;
    },

    // ADMIN / AGENT - Get All Premiums
    getAllPremiums: async () => {

        const response = await axios.get(
            BASE_URL,
            getAuthHeader()
        );

        return response.data;
    },

    // ADMIN / AGENT - Get Premium By ID
    getPremiumById: async (id) => {

        const response = await axios.get(
            `${BASE_URL}/${id}`,
            getAuthHeader()
        );

        return response.data;
    },

    // CUSTOMER - Get My Premiums
    getMyPremiums: async () => {

        const response = await axios.get(
            `${BASE_URL}/my`,
            getAuthHeader()
        );

        return response.data;
    },

    // CUSTOMER - Get My Premium By ID
    getMyPremiumById: async (id) => {

        const response = await axios.get(
            `${BASE_URL}/my/${id}`,
            getAuthHeader()
        );

        return response.data;
    },

    // Payment History
    getPaymentHistory: async (policyId) => {

        const response = await axios.get(
            `${BASE_URL}/history/${policyId}`,
            getAuthHeader()
        );

        return response.data;
    },

    // Due Premiums
    getDuePremiums: async () => {

        const response = await axios.get(
            `${BASE_URL}/due`,
            getAuthHeader()
        );

        return response.data;
    },

    // Overdue Premiums
    getOverduePremiums: async () => {

        const response = await axios.get(
            `${BASE_URL}/overdue`,
            getAuthHeader()
        );

        return response.data;
    },

    // ADMIN / AGENT - Premium Statistics
    getPremiumStatistics: async () => {

        const response = await axios.get(
            `${BASE_URL}/statistics`,
            getAuthHeader()
        );

        return response.data;
    },
    payPremium: async (id) => {

    const response = await axios.put(
        `${BASE_URL}/my/${id}/pay`,
        {},
        getAuthHeader()
    );

    return response.data;
},

};

export default premiumService;