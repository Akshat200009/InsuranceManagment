import PremiumHistoryRow from "./PremiumHistoryRow";

function PremiumHistoryTable({ history }) {

    return (

        <table className="w-full mt-5">

            <thead>

                <tr className="bg-gray-100">

                    <th className="text-left p-3">

                        Payment Date

                    </th>

                    <th className="text-left p-3">

                        Amount

                    </th>

                    <th className="text-left p-3">

                        Status

                    </th>

                </tr>

            </thead>

            <tbody>

                {

                    history.map(item => (

                        <PremiumHistoryRow

                            key={item.id}

                            premium={item}

                        />

                    ))

                }

            </tbody>

        </table>

    );

}

export default PremiumHistoryTable;