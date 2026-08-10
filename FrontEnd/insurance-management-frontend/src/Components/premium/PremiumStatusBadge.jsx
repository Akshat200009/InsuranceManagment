function PremiumStatusBadge({ status }) {

    const colors = {

        PAID: "bg-green-100 text-green-700",

        PENDING: "bg-yellow-100 text-yellow-700"

    };

    return (

        <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${colors[status]}`}
        >

            {status}

        </span>

    );

}

export default PremiumStatusBadge;