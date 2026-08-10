import PremiumRow from "./PremiumRow";

function PremiumTable({ premiums }) {

    return (

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

            <table className="w-full">

                <thead>

                    <tr className="bg-slate-100">

                        <th className="p-4 text-left">

                            Policy Number

                        </th>

                        <th className="p-4 text-left">

                            Amount

                        </th>

                        <th className="p-4 text-left">

                            Payment Date

                        </th>

                        <th className="p-4 text-left">

                            Status

                        </th>

                        <th className="p-4 text-center">

                            Action

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        premiums.map((premium) => (

                            <PremiumRow

                                key={premium.id}

                                premium={premium}

                            />

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default PremiumTable;