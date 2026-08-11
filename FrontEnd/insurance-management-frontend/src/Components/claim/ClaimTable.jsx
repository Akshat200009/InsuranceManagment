import ClaimRow from "./ClaimRow";

function ClaimTable({
    claims,
    onApprove,
    onReject
}) {

    return (

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

            <div className="overflow-x-auto">

                <table className="w-full min-w-[800px]">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="text-left p-4">
                                Policy No
                            </th>

                            <th className="text-left p-4">
                                Claim Amount
                            </th>

                            <th className="text-left p-4">
                                Reason
                            </th>

                            <th className="text-left p-4">
                                Submission Date
                            </th>

                            <th className="text-left p-4">
                                Status
                            </th>

                            <th className="text-center p-4">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {claims.length > 0 ? (

                            claims.map((claim) => (

                                <ClaimRow
                                    key={claim.id}
                                    claim={claim}
                                    onApprove={onApprove}
                                    onReject={onReject}
                                />

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="text-center py-10 text-gray-500"
                                >
                                    No Claims Found
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );
}

export default ClaimTable;