import axios from "axios";
import authService from "./authService";

const BASE_URL = "http://localhost:8090/api/policies";

const getAuthHeader = () => ({

    headers: {

        Authorization: `Bearer ${localStorage.getItem("token")}`

    }

});

const policyService = {

    // Get All Policies
    getAllPolicies: async () => {

        const response = await axios.get(

            BASE_URL,

            getAuthHeader()

        );

        return response.data;

    },

    // Create Policy
    createPolicy: async (policyData) => {

        const response = await axios.post(

            BASE_URL,

            policyData,

            getAuthHeader()

        );

        return response.data;

    },

    // Active Policies
    getActivePolicies: async () => {

        const response = await axios.get(

            `${BASE_URL}/active`,

            getAuthHeader()

        );

        return response.data;

    },

    // Expired Policies
    getExpiredPolicies: async () => {

        const response = await axios.get(

            `${BASE_URL}/expired`,

            getAuthHeader()

        );

        return response.data;

    },

    // Status Filter
    getPoliciesByStatus: async (status) => {

        const response = await axios.get(

            `${BASE_URL}/status?status=${status}`,

            getAuthHeader()

        );

        return response.data;

    },

    // Renew Policy
    renewPolicy: async (id, renewData) => {

        const response = await axios.put(

            `${BASE_URL}/${id}/renew`,

            renewData,

            getAuthHeader()

        );

        return response.data;

    },

    // Cancel Policy
    cancelPolicy: async (id) => {

        const response = await axios.put(

            `${BASE_URL}/${id}/cancel`,

            {},

            getAuthHeader()

        );

        return response.data;

    }

};

export default policyService;