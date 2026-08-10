import axios from "axios";

const BASE_URL = "http://localhost:8090/api/reports";

const getAuthHeader = () => ({

    headers: {

        Authorization: `Bearer ${localStorage.getItem("token")}`

    }

});

const reportService = {

    getActivePolicies: async () => {

        const response = await axios.get(

            `${BASE_URL}/active-policies`,

            getAuthHeader()

        );

        return response.data;

    },

    getExpiredPolicies: async () => {

        const response = await axios.get(

            `${BASE_URL}/expired-policies`,

            getAuthHeader()

        );

        return response.data;

    },

    getClaimStatistics: async () => {

        const response = await axios.get(

            `${BASE_URL}/claim-statistics`,

            getAuthHeader()

        );

        return response.data;

    },

    getPremiumCollection: async () => {

        const response = await axios.get(

            `${BASE_URL}/premium-collection`,

            getAuthHeader()

        );

        return response.data;

    },

    getCustomerGrowth: async () => {

        const response = await axios.get(

            `${BASE_URL}/customer-growth`,

            getAuthHeader()

        );

        return response.data;

    },

    getMonthlyBusiness: async () => {

        const response = await axios.get(

            `${BASE_URL}/monthly-business`,

            getAuthHeader()

        );

        return response.data;

    }

};

export default reportService;