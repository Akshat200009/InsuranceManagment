import React from "react";

function DashboardCard({

    title,

    value,

    color,

    icon

}) {

    return (

        <div
            className={`bg-white rounded-2xl shadow-md p-6 border-l-4 ${color} hover:shadow-xl transition-all`}
        >

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-gray-500 text-sm">

                        {title}

                    </p>

                    <h2 className="text-3xl font-bold mt-2">

                        {value}

                    </h2>

                </div>

                <div className="text-4xl">

                    {icon}

                </div>

            </div>

        </div>

    );

}

export default DashboardCard;