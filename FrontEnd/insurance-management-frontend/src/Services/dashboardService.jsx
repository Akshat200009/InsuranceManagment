import axios from "axios";

const BASE_URL = "http://localhost:8090/api/dashboard";

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
