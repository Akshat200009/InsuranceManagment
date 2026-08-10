import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function ClaimPieChart({ stats }) {

    const data = {

        labels: [

            "Approved",

            "Pending",

            "Rejected"

        ],

        datasets: [

            {

                data: [

                    stats.approvedClaims,

                    stats.pendingClaims,

                    stats.rejectedClaims

                ],

                backgroundColor: [

                    "#22c55e",

                    "#eab308",

                    "#ef4444"

                ],

                borderWidth: 1

            }

        ]

    };

    return (

        <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-xl font-bold mb-6">

                Claim Statistics

            </h2>

            <div className="max-w-sm mx-auto">

                <Pie data={data} />

            </div>

        </div>

    );

}

export default ClaimPieChart;