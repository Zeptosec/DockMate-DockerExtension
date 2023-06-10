import { Node } from "@/pages";
import { BytesToReadable } from "@/utils/utils";
export default function DisplayNodes({ nodes }: { nodes: Node[] }) {
    return (
        <table className="w-full">
            <thead>
                <tr>
                    <th className="p-4 text-left">Node ID</th>
                    <th className="p-4 text-left">Name</th>
                    <th className="p-4 text-left">Total Memory</th>
                    <th className="p-4 text-left">Role</th>
                </tr>
            </thead>
            <tbody>
                {nodes.map(w => <>
                    <tr key={`s${w.id}`} className="border-t border-[#323B41]">
                        <td className="p-4">{w.id}</td>
                        <td className="p-4">{w.name}</td>
                        <td className="p-4">{w.totalMemory}</td>
                        <td className="p-4">{w.role}</td>
                    </tr>
                    {w.containers.length > 0 ?
                        <tr key={`o${w.id}`}>
                            <td colSpan={4}>
                                <ul className="bg-[#141b21] border-black border-t border-b">
                                    <li className="flex justify-center p-4 text-2xl border-b border-black">
                                        Containers
                                    </li>
                                    <li className="flex justify-around">
                                        <p className="p-4">ID</p>
                                        <p className="p-4">Name</p>
                                        <p className="p-4">Size</p>
                                    </li>
                                    {w.containers.map(c =>
                                        <li key={`p${c.service_id}`} className="border-t border-[#323B41]">
                                            <td className="p-4">{c.service_id}</td>
                                            <td className="p-4">{c.service_name}</td>
                                            <td className="p-4">{BytesToReadable(c.max_service_size)}</td>
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