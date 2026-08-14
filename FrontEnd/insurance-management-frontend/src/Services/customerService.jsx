import axios from "axios";

const BASE_URL = "https://insurancemanagment.onrender.com/api/customers";

const getAuthHeader = () => {

    return {

        headers: {

            Authorization: `Bearer ${localStorage.getItem("token")}`

        }

    };

};

const customerService = {

    getAllCustomers: async () => {

        const response = await axios.get(

            BASE_URL,

            getAuthHeader()

        );

        return response.data;

    },

    getCustomerById: async (id) => {

        const response = await axios.get(

            `${BASE_URL}/${id}`,

            getAuthHeader()

        );

        return response.data;

    },

    addCustomer: async (customer) => {

        const response = await axios.post(

            BASE_URL,

            customer,

            getAuthHeader()

        );

        return response.data;

    },

    updateCustomer: async (id, customer) => {

        const response = await axios.put(

            `${BASE_URL}/${id}`,

            customer,

            getAuthHeader()

        );

        return response.data;

    },

    deleteCustomer: async (id) => {

        const response = await axios.delete(

            `${BASE_URL}/${id}`,

            getAuthHeader()

        );

        return response.data;

    },
    getCustomersWithPagination: async (page, size) => {

    const response = await axios.get(

        `${BASE_URL}/pagination?page=${page}&size=${size}`,

        getAuthHeader()

    );

    return response.data;

},
searchCustomerByName: async (name) => {

    const response = await axios.get(

        `${BASE_URL}/search/name?name=${name}`,

        getAuthHeader()

    );

    return response.data;

},

};

export default customerService;