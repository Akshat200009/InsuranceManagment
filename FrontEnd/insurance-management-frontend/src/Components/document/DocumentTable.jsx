import DocumentRow from "./DocumentRow";

function DocumentTable({
    documents,
    onDocumentUpdate
}) {

    return (

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

            <table className="w-full">

                <thead>

                    <tr className="bg-gray-100">

                        <th className="p-4 text-left">
                            Customer
                        </th>

                        <th className="p-4 text-left">
                            File Name
                        </th>

                        <th className="p-4 text-left">
                            Type
                        </th>

                        <th className="p-4 text-left">
                            Uploaded
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

                    {documents.map((document) => (

                        <DocumentRow
                            key={document.id}
                            document={document}
                            onDocumentUpdate={onDocumentUpdate}
                        />

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default DocumentTable;