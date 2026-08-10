import axios from "axios";

const BASE_URL = "http://localhost:8090/api/premiums";

const getAuthHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

const premiumService = {

    recordPayment: async (data) => {

        const response = await axios.post(

            BASE_URL,

            data,

            getAuthHeader()

        );

        return response.data;

    },

    getAllPremiums: async () => {

        const response = await axios.get(

            BASE_URL,

            getAuthHeader()

        );

        return response.data;

    },

    getPremiumById: async (id) => {

        const response = await axios.get(

            `${BASE_URL}/${id}`,

            getAuthHeader()

        );

        return response.data;

    },

    getPaymentHistory: async (policyId) => {

        const response = await axios.get(

            `${BASE_URL}/history/${policyId}`,

            getAuthHeader()

        );

        return response.data;

    },

    getDuePremiums: async () => {

        const response = await axios.get(

            `${BASE_URL}/due`,

            getAuthHeader()

        );

        return response.data;

    },

    getOverduePremiums: async () => {

        const response = await axios.get(

            `${BASE_URL}/overdue`,

            getAuthHeader()

        );

        return response.data;

    },

    getPremiumStatistics: async () => {

        const response = await axios.get(

            `${BASE_URL}/statistics`,

            getAuthHeader()

        );

        return response.data;

    }

};

export default premiumService;