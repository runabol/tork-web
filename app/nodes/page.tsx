import Refresh from "@/components/refresh";
import Table from "@/components/table";
import THeader from "@/components/table-header";
import { formatTimestamp } from "@/lib/datetime";
import { formatDistanceToNow, parseISO } from "date-fns";

export const dynamic = "force-dynamic";

export default async function Nodes() {
  const nodes = await getData();
  const sorted = nodes.sort((a, b) => {
    const as = parseISO(a.startedAt).getTime();
    const bs = parseISO(b.startedAt).getTime();
    return bs - as;
  });
  return (
    <>
      <div className="mt-8 flex justify-end gap-2">
        <Refresh />
      </div>
      <Table>
        <thead className="bg-gray-50">
          <tr>
            <THeader name="ID" />
            <THeader name="Started At" />
            <THeader name="Last Heartbeat" />
            <THeader name="Uptime" />
            <THeader name="CPU %" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {sorted.map((node) => (
            <tr key={node.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6 ">
                {node.id}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {formatTimestamp(node.startedAt)}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {formatTimestamp(node.lastHeartbeatAt)}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {formatDistanceToNow(parseISO(node.startedAt))}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {Math.round(node.cpuPercent * 100) / 100}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

async function getData(): Promise<Node[]> {
  const res = await fetch(`${process.env.BACKEND_URL}/nodes`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
