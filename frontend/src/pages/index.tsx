import DisplayNodes from '@/components/DisplayNodes';
import ServiceForm from '@/components/ServiceForm';
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

  const [nodes, setNodes] = useState<Node[]>();

  async function getNodes() {
    const rs = await fetch(`${SERVER_URL}`);
    const json = await rs.json();
    setNodes(json.nodes);
    console.log(json.nodes);
  }
  useEffect(() => {
    getNodes()
  }, [])

  return (
    <main>
      <div className='max-w-[1400px] flex-col m-auto flex p-4 gap-6'>

        {nodes ? <DisplayNodes nodes={nodes} /> : 'loading'}
        <ServiceForm
          className="max-w-[400px] text-white m-auto"
          refetchNodes={getNodes}
        />
      </div>
    </main>
  );
}
