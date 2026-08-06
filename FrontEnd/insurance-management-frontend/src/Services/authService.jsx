import axios from "axios";

const BASE_URL = "http://localhost:8090/api/auth";

const authService = {

    login: async (loginData) => {

        const response = await axios.post(
            `${BASE_URL}/login`,
            loginData
        );

        return response.data;
    },

    register: async (registerData) => {

        const response = await axios.post(
            `${BASE_URL}/register`,
            registerData
        );

        return response.data;
    }

};

export default authService;