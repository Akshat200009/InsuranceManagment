import {
    
    FaEye,

    FaEdit,

    FaTrash

} from "react-icons/fa";

const formatDate = (date) => {

    if (!date) return "-";

    return new Date(date).toLocaleDateString(

        "en-GB",

        {

            day: "2-digit",

            month: "short",

            year: "numeric"

        }

    );

};

const shortAddress = (address) => {

    if (!address) return "-";

    return address.length > 30

        ?

        address.substring(0, 30) + "..."

        :

        address;

};

function CustomerRow({

    customer,

    onView,

    onEdit,

    onDelete

}) {

    return (

        <tr className="hover:bg-slate-50 transition">

            <td className="px-6 py-4">

                {customer.id}

            </td>

            <td className="px-6 py-4 font-medium">

                {customer.name}

            </td>

            <td className="px-6 py-4">

                {customer.email}

            </td>

            <td className="px-6 py-4">

                {customer.phone}

            </td>

            <td className="px-6 py-4 whitespace-nowrap">

                {formatDate(customer.dob)}

            </td>

            <td

                className="px-6 py-4 max-w-xs truncate cursor-pointer"

                title={customer.address}

            >

                {shortAddress(customer.address)}

            </td>
              <td className="px-6 py-4">

    <div className="flex justify-center gap-3">

        <button

            onClick={() => onView(customer.id)}

            className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition"

        >

            <FaEye />

        </button>

        <button

            onClick={() => onEdit(customer.id)}

            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition"

        >

            <FaEdit />

        </button>

        <button

            onClick={() => onDelete(customer)}

            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition"

        >

            <FaTrash />

        </button>

    </div>

</td>


        </tr>

    );

}

export default CustomerRow;