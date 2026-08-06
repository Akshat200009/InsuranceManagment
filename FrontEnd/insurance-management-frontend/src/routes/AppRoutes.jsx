import { Routes, Route } from "react-router-dom";

import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Dashboard from "../Pages/Dashboard";
import ProtectedRoute from "../Components/ProtectedRoute";
import CustomerList from "../Components/customer/CustomerList";
import AddCustomer from "../Pages/Customer/AddCustomer";
import EditCustomer from "../Pages/Customer/EditCustomer";
import DashboardLayout from "../Layouts/DashboardLayout";
import CustomerProfile from "../Pages/Customer/CustomerProfile";
import PolicyList from "../Pages/Policy/PolicyList";
import AddPolicy from "../Pages/Policy/AddPolicy";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/customers"
        element={
          <ProtectedRoute>
            {" "}
            <DashboardLayout>
              <CustomerList />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/customers/add"
        element={
          <ProtectedRoute>
            {" "}
            <DashboardLayout>
              <AddCustomer />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/customers/edit/:id"
        element={
          <ProtectedRoute>
            {" "}
            <DashboardLayout>
              <EditCustomer />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/customers/view/:id"
        element={
          <ProtectedRoute>
            <CustomerProfile />
          </ProtectedRoute>
        }
      />
      
      Policy Routes
      <Route
        path="/policies"
        element={
          <ProtectedRoute>
            <PolicyList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/policies/add"
        element={
          <ProtectedRoute>
            <AddPolicy />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
