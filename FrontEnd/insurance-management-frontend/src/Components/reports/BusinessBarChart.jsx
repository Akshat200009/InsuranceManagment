import {

    Chart as ChartJS,

    CategoryScale,

    LinearScale,

    BarElement,

    Tooltip,

    Legend

} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(

    CategoryScale,

    LinearScale,

    BarElement,

    Tooltip,

    Legend

);

function BusinessBarChart({ reports }) {

    const data = {

        labels: [

            "Customers",

            "Active",

            "Expired",

            "Monthly"

        ],

        datasets: [

            {

                label: "Business Overview",

                data: [

                    reports.customerGrowth,

                    reports.activePolicies,

                    reports.expiredPolicies,

                    reports.monthlyBusiness

                ],

                backgroundColor: [

                    "#3b82f6",

                    "#22c55e",

                    "#ef4444",

                    "#8b5cf6"

                ]

            }

        ]

    };

    return (

        <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-xl font-bold mb-6">

                Business Overview

            </h2>

            <Bar data={data} />

        </div>

    );

}

export default BusinessBarChart;