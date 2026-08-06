import CustomerRow from "./CustomerRow";

function CustomerTable({

    customers,

    onView,

    onEdit,

    onDelete

}) {

    return (

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

            <table className="w-full">

                <thead className="bg-slate-100">

                    <tr>

                        <th className="px-6 py-4 text-left">

                            ID

                        </th>

                        <th className="px-6 py-4 text-left">

                            Name

                        </th>

                        <th className="px-6 py-4 text-left">

                            Email

                        </th>

                        <th className="px-6 py-4 text-left">

                            Phone

                        </th>

                        <th className="px-6 py-4 text-left">

                            DOB

                        </th>

                        <th className="px-6 py-4 text-left w-72">

                            Address

                        </th>

                        <th className="px-6 py-4 text-center">

                            Actions

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        customers.length > 0

                            ?

                            customers.map((customer) => (

                                <CustomerRow

                                    key={customer.id}

                                    onView={onView}

                                    customer={customer}

                                    onEdit={onEdit}

                                    onDelete={onDelete}

                                />

                            ))

                            :

                            <tr>

                                <td

                                    colSpan="7"

                                    className="text-center py-8 text-gray-500"

                                >

                                    No Customers Found

                                </td>

                            </tr>

                    }

                </tbody>

            </table>

        </div>

    );

}

export default CustomerTable;