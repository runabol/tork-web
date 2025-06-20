import { formatDistanceToNow, parseISO } from 'date-fns';

import NodeStatusBadge from '@/components/node-status-badge';
import Refresh from '@/components/refresh';
import DataTable from '@/components/shared/data-table';
import { TableCell, TableRow } from '@/components/ui/table';
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

const tableColumns = [
  'ID',
  'Name',
  'Hostname',
  'Version',
  'Uptime',
  'CPU %',
  'Tasks',
  'Status',
];

export const dynamic = 'force-dynamic';

export default async function NodesPage() {
  const nodes = await getData();

  return (
    <div className="flex flex-col gap-10">
      <div className="mt-10 flex justify-end">
        <Refresh />
      </div>
      <DataTable columns={tableColumns}>
        {nodes.length > 0 ? (
          <>
            {nodes.map((node: Node) => (
              <TableRow
                key={node.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <TableCell className="p-4">
                  <span className="text-sm">{node.id}</span>
                </TableCell>
                <TableCell className="p-4">
                  <span className="text-sm">{node.name}</span>
                </TableCell>
                <TableCell className="p-4">
                  <span className="text-sm">{node.hostname}</span>
                </TableCell>
                <TableCell className="p-4">
                  <span className="text-sm">{node.version}</span>
                </TableCell>
                <TableCell className="p-4">
                  <span className="text-sm">
                    {formatDistanceToNow(parseISO(node.startedAt))}
                  </span>
                </TableCell>
                <TableCell className="p-4">
                  <span className="text-sm">
                    {Math.round(node.cpuPercent * 100) / 100}
                  </span>
                </TableCell>
                <TableCell className="p-4">
                  <span className="text-sm">{node.taskCount}</span>
                </TableCell>
                <TableCell className="p-4">
                  <NodeStatusBadge status={node.status} />
                </TableCell>
              </TableRow>
            ))}
          </>
        ) : (
          <TableRow>
            <TableCell
              className="p-4 text-center"
              colSpan={tableColumns.length}
            >
              No nodes found.
            </TableCell>
          </TableRow>
        )}
      </DataTable>
    </div>
  );
}
