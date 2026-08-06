function DeleteModal({

    isOpen,

    title,

    message,

    onCancel,

    onConfirm

}) {

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

            <div className="bg-white rounded-2xl shadow-xl w-[420px] p-6">

                <h2 className="text-2xl font-bold text-red-600">

                    {title}

                </h2>

                <p className="text-gray-600 mt-4">

                    {message}

                </p>

                <div className="flex justify-end gap-4 mt-8">

                    <button

                        onClick={onCancel}

                        className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"

                    >

                        Cancel

                    </button>

                    <button

                        onClick={onConfirm}

                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"

                    >

                        Delete

                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeleteModal;