import { useEffect, useState } from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import ReportCard from "../../Components/reports/ReportCard";
import reportService from "../../Services/reportService";
import toast from "react-hot-toast";
import ClaimPieChart from "../../Components/reports/ClaimPieChart";

import BusinessBarChart from "../../Components/reports/BusinessBarChart";

function ReportsDashboard() {
  const [reports, setReports] = useState({
    activePolicies: 0,

    expiredPolicies: 0,

    premiumCollection: 0,

    customerGrowth: 0,

    monthlyBusiness: 0,
  });

  const [claimStats, setClaimStats] = useState({
    approvedClaims: 0,

    pendingClaims: 0,

    rejectedClaims: 0,
  });

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const [active, expired, premium, customer, monthly, claims] =
        await Promise.all([
          reportService.getActivePolicies(),

          reportService.getExpiredPolicies(),

          reportService.getPremiumCollection(),

          reportService.getCustomerGrowth(),

          reportService.getMonthlyBusiness(),

          reportService.getClaimStatistics(),
        ]);

      setReports({
        activePolicies: active.totalCount,

        expiredPolicies: expired.totalCount,

        premiumCollection: premium.totalCount,

        customerGrowth: customer.totalCount,

        monthlyBusiness: monthly.totalCount,
      });

      setClaimStats(claims);
    } catch (error) {
      console.log(error);

      toast.error("Unable to load reports");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Reports Dashboard</h1>

        {/* Summary Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <ReportCard
            title="Customer Growth"
            value={reports.customerGrowth}
            color="border-blue-600"
          />

          <ReportCard
            title="Active Policies"
            value={reports.activePolicies}
            color="border-green-600"
          />

          <ReportCard
            title="Expired Policies"
            value={reports.expiredPolicies}
            color="border-red-600"
          />

          <ReportCard
            title="Premium Collection"
            value={`₹${reports.premiumCollection.toLocaleString()}`}
            color="border-yellow-500"
          />

          <ReportCard
            title="Monthly Business"
            value={reports.monthlyBusiness}
            color="border-purple-600"
          />
        </div>
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <ClaimPieChart stats={claimStats} />

          <BusinessBarChart reports={reports} />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ReportsDashboard;
