import PolicyRow from "./PolicyRow";

function PolicyTable({

    policies,

    onRenew,

    onCancel

}) {

    return (

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

            <table className="w-full">

                <thead className="bg-slate-100">

                    <tr>

                        <th className="px-6 py-4 text-left font-semibold">
                            Policy No
                        </th>

                        <th className="px-6 py-4 text-left font-semibold">
                            Customer
                        </th>

                        <th className="px-6 py-4 text-left font-semibold">
                            Policy Type
                        </th>

                        <th className="px-6 py-4 text-left font-semibold">
                            Premium
                        </th>

                        <th className="px-6 py-4 text-left font-semibold">
                            Start Date
                        </th>

                        <th className="px-6 py-4 text-left font-semibold">
                            End Date
                        </th>

                        <th className="px-6 py-4 text-center font-semibold">
                            Status
                        </th>

                        <th className="px-6 py-4 text-center font-semibold">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        policies.length > 0 ?

                            policies.map((policy) => (

                                <PolicyRow

                                    key={policy.id}

                                    policy={policy}

                                    onRenew={onRenew}

                                    onCancel={onCancel}

                                />

                            ))

                            :

                            <tr>

                                <td

                                    colSpan="8"

                                    className="py-12 text-center text-gray-500"

                                >

                                    No Policies Found

                                </td>

                            </tr>

                    }

                </tbody>

            </table>

        </div>

    );

}

export default PolicyTable;