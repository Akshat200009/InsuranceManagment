import axios from "axios";

const BASE_URL = "https://insurancemanagment.onrender.com/api/dashboard";

const getAuthHeader = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
};

const dashboardService = {
  getDashboard: async () => {
    const response = await axios.get(BASE_URL, getAuthHeader());
    return response.data;
  },
};
export default dashboardService;
