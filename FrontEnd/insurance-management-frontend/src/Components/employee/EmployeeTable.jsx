import EmployeeRow from "./EmployeeRow";

function EmployeeTable({
    employees,
    onView,
    onEdit,
    onDelete
}) {

    return (

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

            <table className="w-full">

                <thead>

                    <tr className="bg-gray-100">

                        <th className="p-4 text-left">
                            ID
                        </th>

                        <th className="p-4 text-left">
                            Employee Name
                        </th>

                        <th className="p-4 text-left">
                            Email
                        </th>

                        <th className="p-4 text-left">
                            Phone
                        </th>

                        <th className="p-4 text-left">
                            Role
                        </th>

                        <th className="p-4 text-center">
                            Actions
                        </th>

                    </tr>

                </thead>


                <tbody>

                    {employees.map((employee) => (

                        <EmployeeRow
                            key={employee.id}
                            employee={employee}
                            onView={onView}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default EmployeeTable;