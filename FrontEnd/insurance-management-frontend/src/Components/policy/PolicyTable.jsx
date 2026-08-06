function PolicyTable({ policies }) {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <pre>

                {JSON.stringify(policies, null, 2)}

            </pre>

        </div>

    );

}

export default PolicyTable;