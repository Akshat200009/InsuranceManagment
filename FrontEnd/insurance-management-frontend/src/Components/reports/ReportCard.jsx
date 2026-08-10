function ReportCard({

    title,

    value,

    color

}) {

    return (

        <div className={`bg-white rounded-2xl shadow-md p-6 border-l-4 ${color}`}>

            <h3 className="text-gray-500 font-medium">

                {title}

            </h3>

            <h2 className="text-3xl font-bold mt-3">

                {value}

            </h2>

        </div>

    );

}

export default ReportCard;