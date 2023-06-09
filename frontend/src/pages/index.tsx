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
      </div>
    </main>
  )
}
