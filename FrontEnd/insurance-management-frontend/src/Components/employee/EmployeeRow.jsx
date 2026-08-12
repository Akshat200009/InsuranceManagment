import {
    FaEye,
    FaEdit,
    FaTrash
} from "react-icons/fa";

function EmployeeRow({
    employee,
    onView,
    onEdit,
    onDelete
}) {

    return (

        <tr className="hover:bg-slate-50 transition">

            {/* ID */}

            <td className="px-6 py-4">
                {employee.id}
            </td>


            {/* NAME */}

            <td className="px-6 py-4 font-medium">
                {employee.fullname}
            </td>


            {/* EMAIL */}

            <td className="px-6 py-4">
                {employee.email}
            </td>


            {/* PHONE */}

            <td className="px-6 py-4">
                {employee.phone}
            </td>


            {/* ROLE */}

            <td className="px-6 py-4">

                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">

                    {employee.role}

                </span>

            </td>


            {/* ACTIONS */}

            <td className="px-6 py-4">

                <div className="flex justify-center gap-3">

                    {/* VIEW */}

                    <button
                        onClick={() => onView(employee.id)}
                        title="View Employee"
                        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition"
                    >

                        <FaEye />

                    </button>


                    {/* EDIT */}

                    <button
                        onClick={() => onEdit(employee.id)}
                        title="Edit Employee"
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition"
                    >

                        <FaEdit />

                    </button>


                    {/* DELETE */}

                    <button
                        onClick={() => onDelete(employee)}
                        title="Delete Employee"
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition"
                    >

                        <FaTrash />

                    </button>

                </div>

            </td>

        </tr>

    );

}

export default EmployeeRow;