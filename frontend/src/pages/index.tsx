import DisplayNodes from '@/components/DisplayNodes';
import ServiceForm from '@/components/ServiceForm';
import { useEffect, useState } from 'react'
import Image from 'next/image';

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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex gap-2">
          <ServiceForm className="max-w-md mb-8" refetchNodes={getNodes} />
          <div className="relative grow rounded-3xl">
            <Image className="rounded-3xl" src="/Logo.png" alt="Logo" fill={true} />
          </div>
        </div>
        {nodes ? <DisplayNodes nodes={nodes} refetchNodes={getNodes}  /> : 'Loading...'}
      </div>
    </main>
  );
}
