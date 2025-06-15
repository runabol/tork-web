import { formatDistanceToNow, parseISO } from 'date-fns';

import Refresh from '@/components/refresh';
import Table from '@/components/table';
import THeader from '@/components/table-header';
import { getEnvConfig } from '@/config/env-config';
import { Node } from '@/models';

// TODO: Extract this out into a service file e.g. "services/server/nodes/nodes.service.ts"
async function getData(): Promise<Node[]> {
  const envConfig = await getEnvConfig();

  const res = await fetch(`${envConfig.backendUrl}/nodes`, {
    cache: 'no-cache',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export const dynamic = 'force-dynamic';

export default async function NodesPage() {
  const nodes = await getData();

  return (
    <>
      <div className="mt-8 flex justify-end gap-2">
        <Refresh />
      </div>
      <Table>
        <thead className="bg-gray-50">
          <tr>
            <THeader name="ID" />
            <THeader name="Name" />
            <THeader name="Hostname" />
            <THeader name="Version" />
            <THeader name="Uptime" />
            <THeader name="CPU %" />
            <THeader name="Tasks" />
            <THeader name="Status" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {nodes.map((node: Node) => (
            <tr key={node.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6 ">
                {node.id}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {node.name}
              </td>
              <td className="hostname whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {node.hostname}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {node.version}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {formatDistanceToNow(parseISO(node.startedAt))}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {Math.round(node.cpuPercent * 100) / 100}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {node.taskCount}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {node.status === 'UP' ? (
                  <span
                    className={`inline-flex items-center capitalize rounded-md bg-green-50 text-green-700 px-2 py-1 text-xs font-medium  ring-1 ring-inset ring-gray-500/10`}
                  >
                    {node.status}
                  </span>
                ) : (
                  <span
                    className={`inline-flex items-center capitalize rounded-md bg-red-50 text-red-700 px-2 py-1 text-xs font-medium  ring-1 ring-inset ring-gray-500/10`}
                  >
                    {node.status}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
