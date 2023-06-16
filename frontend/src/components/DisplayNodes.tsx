import { Node } from "@/pages";
import { BytesToReadable } from "@/utils/utils";

export default function DisplayNodes({ nodes, refetchNodes}: { nodes: Node[], refetchNodes:any }) {
    const removeService = async (e: any, c: string, w: string) => {
        e.preventDefault()
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    serviceID: c,
                    nodeID: w
                }),
            };

            const response = await fetch("http://localhost:8000/remove", requestOptions);
            const data = await response.text()
            await refetchNodes();
        } catch (error) {
            console.error(error)
        }
    };
    return (
        <table className="w-full bg-[#182127]">
            <thead>
                <tr>
                    <th className="p-4 text-left">Node ID</th>
                    <th className="p-4 text-left">Name</th>
                    <th className="p-4 text-left">Total Memory</th>
                    <th className="p-4 text-left">Free Memory</th>
                    <th className="p-4 text-left">Role</th>
                </tr>
            </thead>
            <tbody>
                {nodes.map(w => <>
                    <tr key={`s${w.id}`} className="border-t border-[#323B41]">
                        <td className="p-4">{w.id}</td>
                        <td className="p-4">{w.name}</td>
                        <td className="p-4">{BytesToReadable(w.totalMemory)}</td>
                        <td className="p-4">{BytesToReadable(w.freeMemory)}</td>
                        <td className="p-4">{w.role}</td>
                    </tr>
                    {w.containers.length > 0 ?
                        <tr key={`o${w.id}`}>
                            <td colSpan={5}>
                                <ul className="bg-[#141b21] border-black border-t border-b">
                                    <li className="flex justify-center p-4 text-2xl border-b border-black">
                                        Containers
                                    </li>
                                    <li className="grid grid-cols-4 text-center">
                                        <p className="p-4">ID</p>
                                        <p className="p-4">Name</p>
                                        <p className="p-4">Size</p>
                                        <p className="p-4">Remove</p>
                                    </li>
                                    {w.containers.map(c =>
                                        <li key={`p${c.service_id}`} className="border-t border-[#323B41] grid grid-cols-4 text-center">
                                            <td className="p-4">{c.service_id}</td>
                                            <td className="p-4">{c.service_name}</td>
                                            <td className="p-4">{BytesToReadable(c.max_service_size)}</td>
                                            <button onClick={e => removeService(e, c.service_id, w.id)}
                                                type="submit"
                                                className="bg-red-500 hover:bg-red-700 text-white font-medium rounded px-4 py-2 transition-all"
                                            >
                                                Remove
                                            </button> 
                                        </li>
                                    )}
                                </ul>
                            </td>
                        </tr> : ''
                    }
                </>)}

            </tbody>
        </table>
    )
}