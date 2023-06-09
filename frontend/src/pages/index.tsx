import DisplayNodes from '@/components/DisplayNodes';
import { useEffect, useState } from 'react'

const SERVER_URL = "http://localhost:8000";

export interface Container {
  service_id: string,
  service_name: string,
  max_service_size: number,
  inserted_in: string
}

export interface Node {
  id: string,
  name: string,
  freeMemory: number,
  totalMemory: number,
  role: string,
  containers: Container[]
}

export default function Home() {
  const [textbox1, setTextbox1] = useState('');
  const [textbox2, setTextbox2] = useState('');
  const [nodes, setNodes] = useState<Node[]>();

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

  useEffect(() => {
    async function getNodes() {
      const rs = await fetch(`${SERVER_URL}`);
      const json = await rs.json();
      setNodes(json.nodes);
      console.log(json.nodes);
    }
    getNodes()
  }, [])

  return (
    <main>
      <div>
        {nodes ? <DisplayNodes nodes={nodes} /> : 'loading'}

        <form onSubmit={putToNodes} className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-4">
            <label htmlFor="appName" className="block mb-2 text-lg font-medium text-gray-700">
              App Name:
            </label>
            <input
              type="text"
              id="appName"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={textbox1}
              onChange={(e) => setTextbox1(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="size" className="block mb-2 text-lg font-medium text-gray-700">
              Size:
            </label>
            <input
              type="text"
              id="size"
              className="w-full border border-gray-300 rounded px-3 py-2"
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
            <div className="bg-white rounded-lg p-8">
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
    </main>
  );
}
