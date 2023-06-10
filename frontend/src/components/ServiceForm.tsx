import { useState } from "react";

export default function ServiceForm({ className }: any) {
    const [textbox1, setTextbox1] = useState('');
    const [textbox2, setTextbox2] = useState(42);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const putToNodes = async (e: any) => {
        e.preventDefault()
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    appName: textbox1,
                    size: textbox2
                }),
            };

            const response = await fetch("http://localhost:8000/create", requestOptions);
            const data = await response.text()
            setModalMessage(data);
            setShowModal(true);
        } catch (error) {
            console.error(error)
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className={className}>
            <form onSubmit={putToNodes} className="bg-[#141b21] rounded-lg shadow-lg p-8">
                <div className="mb-4">
                    <label htmlFor="appName" className="block mb-2 text-lg font-medium">
                        App Name:
                    </label>
                    <input
                        type="text"
                        placeholder="nginx"
                        id="appName"
                        className="w-full text-black border border-gray-300 rounded px-3 py-2"
                        value={textbox1}
                        onChange={(e) => setTextbox1(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="size" className="block mb-2 text-lg font-medium">
                        Size (MB):
                    </label>
                    <input
                        type="number"
                        id="size"
                        min={10}
                        max={1280000}
                        className="w-full text-black border border-gray-300 text-black rounded px-3 py-2"
                        value={textbox2}
                        onChange={(e) => setTextbox2(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded px-4 py-2"
                >
                    Submit
                </button>
            </form>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="bg-[#141b21] border-black border shadow rounded-lg p-8">
                        <h2 className="text-xl font-medium mb-4">Result</h2>
                        <p>{modalMessage}</p>
                        <button
                            onClick={handleCloseModal}
                            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded px-4 py-2"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}