export const quickActions = {
  ADMIN: [
    {
      title: "Add Customer",
      color: "bg-blue-600 hover:bg-blue-700",
      path: "/customers/add",
    },

    {
      title: "Add Policy",
      color: "bg-green-600 hover:bg-green-700",
      path: "/policies/add",
    },

    {
      title: "Add Premium",
      color: "bg-yellow-500 hover:bg-yellow-600",
      path: "/premiums/add",
    },

    {
      title: "Approve Claims",
      color: "bg-red-600 hover:bg-red-700",
      path: "/claims",
    },
  ],
  AGENT: [
    {
      title: "Add Customer",
      color: "bg-blue-600 hover:bg-blue-700",
      path: "/customers/add",
    },

    {
      title: "Add Policy",
      color: "bg-green-600 hover:bg-green-700",
      path: "/policies/add",
    },

    {
      title: "Review Claims",
      color: "bg-red-600 hover:bg-red-700",
      path: "/claims",
    },

    {
      title: "Verify Documents",
      color: "bg-purple-600 hover:bg-purple-700",
      path: "/documents",
    },
  ],

  CUSTOMER: [
    {
      title: "Pay Premium",
      color: "bg-yellow-500 hover:bg-yellow-600",
      path: "/premiums",
    },

    {
      title: "Raise Claim",
      color: "bg-red-600 hover:bg-red-700",
      path: "/claims",
    },

    {
      title: "Upload Documents",
      color: "bg-purple-600 hover:bg-purple-700",
      path: "/documents",
    },
  ],
};
