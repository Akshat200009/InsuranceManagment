import axios from "axios";
const BASE_URL = "https://insurancemanagment.onrender.com/api/users";

const getAuthHeader=()=>
{
    return{
        headers:{
            Authorization : `Bearer ${localStorage.getItem("token")}`
        },
    };
};

const userService = {

   //Get All Employees
  
   getAllEmployees : async()=>{
    const response = await axios.get(`${BASE_URL}/employees`, getAuthHeader());
    return response.data;
   },

   //Get Employee By Id

   getEmployeeById : async(id)=>
   {
    const response = await axios.get(`${BASE_URL}/employees/${id}`,getAuthHeader());
    return response.data;
   },
   
   // Add Employees

   addEmployee : async(employee)=> 
   {
    const response = await axios.post(`${BASE_URL}/employees`,employee, getAuthHeader());
    response.data;
   },

   //Update Employee

   updateEmployee :async (id,employeeData)=>
   {
      const response = await axios.put(`${BASE_URL}/employees/${id}`,employeeData ,getAuthHeader());
      response.data;
   },
   //Delete Employee

   deleteEmployee : async (id)=>
   {
    const response = await axios.delete(`${BASE_URL}/employees/${id}`,getAuthHeader());
    response.data;
   },
    getAllAgents: async () => {

    const response = await axios.get(
        `${BASE_URL}/employees`,
        getAuthHeader()
    );

    return response.data;
},
}

export default userService;