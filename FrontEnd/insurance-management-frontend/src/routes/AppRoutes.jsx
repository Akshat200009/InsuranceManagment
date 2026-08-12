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
import PolicyDetails from "../Pages/Policy/PolicyDetails";
import ClaimList from "../Pages/Claim/ClaimList";
import AddClaim from "../Pages/Claim/AddClaim";
import ClaimDetails from "../Pages/Claim/ClaimDetails";
import DocumentList from "../Pages/Document/DocumentList";
import PremiumList from "../Pages/Premium/PremiumList";
import AddPremium from "../Pages/Premium/AddPremium";
import PremiumDetails from "../Pages/Premium/PremiumDetails";
import ReportsDashboard from "../Pages/Reports/ReportsDashboard";
import EmployeeList from "../Pages/Employees/EmployeeList";
import AddEmployee from "../Pages/Employees/AddEmployee";
import EmployeeDetails from "../Pages/Employees/EmployeeDetails";
import EditEmployee from "../Pages/Employees/EditEmployee";

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
      <Route
        path="/policies"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <PolicyList />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/policies/add"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <AddPolicy />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/policies/:id"
        element={
          <DashboardLayout>
            <PolicyDetails />
          </DashboardLayout>
        }
      />

      <Route path="/claims" element={<ClaimList />} />

      <Route
        path="/claims/add"
        element={
          <DashboardLayout>
            <AddClaim />
          </DashboardLayout>
        }
      />

      <Route path="/claims/:id" element={<ClaimDetails />} />

      <Route path="/documents" element={<DocumentList />} />

      <Route path="/premiums" element={<PremiumList />} />

      <Route path="/premiums/add" element={<AddPremium />} />

      <Route path="/premiums/:id" element={<PremiumDetails />} />

      <Route path="/reports" element={<ReportsDashboard />} />

      <Route path="/employees" element={<EmployeeList />} />

      <Route path="/employees/add" element={<AddEmployee />} />

      <Route path="/employees/:id" element={<EmployeeDetails />} />

      <Route path="/employees/edit/:id" element={<EditEmployee />} />

    </Routes>
  );
}

export default AppRoutes;
