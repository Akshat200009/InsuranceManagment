import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

import CustomerTable from "../../Components/customer/CustomerTable";
import customerService from "../../Services/customerService";

function CustomerList() {

    const navigate = useNavigate();
    
    const [page, setPage] = useState(0);


    const [customers, setCustomers] = useState([]);

    const [size] = useState(5);

     const [totalPages, setTotalPages] = useState(0);


    const [search, setSearch] = useState("");

    useEffect(() => {

        loadCustomers();

    }, [page]);

    useEffect(() => {

    const timer = setTimeout(() => {

        searchCustomers();

    }, 500);

    return () => clearTimeout(timer);

}, [search]);

const loadCustomers = async () => {

    try {

        const response = await customerService.getCustomersWithPagination(

            page,

            size

        );

        setCustomers(response.content);

        setTotalPages(response.totalPages);

    }

    catch (error) {

        console.log(error);

        toast.error("Unable to load customers");

    }

};
 const searchCustomers = async () => {

    try {

        if (search.trim() === "") {

            loadCustomers();

            return;

        }

        const response = await customerService.searchCustomerByName(search);

        setCustomers(response);

    }

    catch (error) {

        console.log(error);

        toast.error("Search failed");

    }

};
const handleView = (id) => {

    navigate(`/customers/view/${id}`);

};

    const handleEdit = (id) => {

        navigate(`/customers/edit/${id}`);

    };

    const handleDelete = async (customer) => {

        const result = await Swal.fire({

            title: "Delete Customer",

            html: `
                <p style="font-size:16px">
                    Are you sure you want to delete
                    <br><br>
                    <b>${customer.name}</b> ?
                </p>
            `,

            icon: "warning",

            showCancelButton: true,

            confirmButtonText: "Delete",

            cancelButtonText: "Cancel",

            confirmButtonColor: "#dc2626",

            cancelButtonColor: "#6b7280",

            reverseButtons: true

        });

        if (!result.isConfirmed) {

            return;

        }

        try {

            const response = await customerService.deleteCustomer(customer.id);

            await Swal.fire({

                icon: "success",

                title: "Deleted!",

                text:

                    typeof response === "string"

                        ? response

                        : "Customer deleted successfully.",

                timer: 1500,

                showConfirmButton: false

            });

            loadCustomers();

        }

        catch (error) {

            Swal.fire({

                icon: "error",

                title: "Delete Failed",

                text:

                    error.response?.data?.message ||

                    error.response?.data ||

                    "Unable to delete customer"

            });

        }

    };

    return (

        <div className="p-8">

            {/* Heading */}

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-3xl font-bold">

                    Customer Management

                </h1>

                <button

                    onClick={() => navigate("/customers/add")}

                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"

                >

                    <FaPlus />

                    Add Customer

                </button>

            </div>

            {/* Search */}

            <div className="relative mb-8">

                <FaSearch className="absolute left-4 top-4 text-gray-400" />

                <input

                    type="text"

                    placeholder="Search Customer..."

                    value={search}

                    onChange={(e) => setSearch(e.target.value)}

                    className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"

                />

            </div>

            {/* Customer Table */}

            <CustomerTable

                customers={customers}
                
                onView={handleView}

                onEdit={handleEdit}

                onDelete={handleDelete}

            />

            {/* Pagination */}
            {

search.trim() === "" && (
<div className="flex justify-between items-center mt-8">

    <button

        onClick={() => setPage(page - 1)}

        disabled={page === 0}

        className={`px-5 py-2 rounded-lg transition

        ${page === 0

            ? "bg-gray-300 cursor-not-allowed"

            : "bg-blue-600 hover:bg-blue-700 text-white"

        }`}

    >

        Previous

    </button>

    <span className="font-semibold text-gray-700">

        Page {page + 1} of {totalPages}

    </span>

    <button

        onClick={() => setPage(page + 1)}

        disabled={page + 1 >= totalPages}

        className={`px-5 py-2 rounded-lg transition

        ${page + 1 >= totalPages

            ? "bg-gray-300 cursor-not-allowed"

            : "bg-blue-600 hover:bg-blue-700 text-white"

        }`}

    >

        Next

    </button>

</div>
)}

        </div>
    

    );

}

export default CustomerList;