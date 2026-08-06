import {
    FaHome,
    FaUsers,
    FaFileContract,
    FaMoneyBillWave,
    FaClipboardList,
    FaFolderOpen,
    FaChartBar
} from "react-icons/fa";

export const sidebarMenu = {

    ADMIN: [

        {
            title: "Dashboard",
            path: "/dashboard",
            icon: <FaHome />
        },

        {
            title: "Customers",
            path: "/customers",
            icon: <FaUsers />
        },

        {
            title: "Policies",
            path: "/policies",
            icon: <FaFileContract />
        },

        {
            title: "Premiums",
            path: "/premiums",
            icon: <FaMoneyBillWave />
        },

        {
            title: "Claims",
            path: "/claims",
            icon: <FaClipboardList />
        },

        {
            title: "Documents",
            path: "/documents",
            icon: <FaFolderOpen />
        },

        {
            title: "Reports",
            path: "/reports",
            icon: <FaChartBar />
        }

    ],

    AGENT: [

        {
            title: "Dashboard",
            path: "/dashboard",
            icon: <FaHome />
        },

        {
            title: "Customers",
            path: "/customers",
            icon: <FaUsers />
        },

        {
            title: "Policies",
            path: "/policies",
            icon: <FaFileContract />
        },

        {
            title: "Claims",
            path: "/claims",
            icon: <FaClipboardList />
        },

        {
            title: "Documents",
            path: "/documents",
            icon: <FaFolderOpen />
        }

    ],

    CUSTOMER: [

        {
            title: "Dashboard",
            path: "/dashboard",
            icon: <FaHome />
        },

        {
            title: "My Policies",
            path: "/policies",
            icon: <FaFileContract />
        },

        {
            title: "My Premiums",
            path: "/premiums",
            icon: <FaMoneyBillWave />
        },

        {
            title: "My Claims",
            path: "/claims",
            icon: <FaClipboardList />
        },

        {
            title: "My Documents",
            path: "/documents",
            icon: <FaFolderOpen />
        }

    ]

};