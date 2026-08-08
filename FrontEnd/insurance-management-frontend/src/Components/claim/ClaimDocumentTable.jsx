import ClaimDocumentRow from "./ClaimDocumentRow";

function ClaimDocumentTable({ documents }) {

    return (

        <div className="mt-6">

            <table className="w-full border rounded-xl overflow-hidden">

                <thead className="bg-gray-100">

                    <tr>

                        <th className="text-left p-3">File Name</th>

                        <th className="text-left p-3">Type</th>

                        <th className="text-left p-3">Uploaded</th>

                        <th className="text-center p-3">Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        documents.length === 0 ?

                            (

                                <tr>

                                    <td

                                        colSpan="4"

                                        className="text-center p-6 text-gray-500"

                                    >

                                        No Supporting Documents Uploaded

                                    </td>

                                </tr>

                            )

                            :

                            documents.map(document => (

                                <ClaimDocumentRow

                                    key={document.id}

                                    document={document}

                                />

                            ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default ClaimDocumentTable;