import Refresh from '@/components/refresh';
import DataTable from '@/components/shared/data-table';
import { TableCell, TableRow } from '@/components/ui/table';
import { getEnvConfig } from '@/config/env-config';
import { Queue } from '@/models';

// TODO: Extract this out into a service file e.g. "services/server/queues/queues.service.ts"
async function getData(): Promise<Queue[]> {
  const envConfig = await getEnvConfig();

  const res = await fetch(`${envConfig.backendUrl}/queues`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const tableColumns = ['Name', 'Size', 'Subscribers', 'Unacked'];

export const dynamic = 'force-dynamic';

export default async function QueuesPage() {
  const queues = await getData();

  const sorted = queues.sort((a, b) => {
    if (a.size === b.size) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }

      return 0;
    }
    return a.size > b.size ? -1 : 1;
  });

  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-3xl font-semibold text-center">Queues</h2>
      <div className="flex justify-end">
        <Refresh />
      </div>
      <DataTable columns={tableColumns}>
        {queues.length > 0 ? (
          <>
            {sorted.map((queue) => (
              <TableRow
                key={queue.name}
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <TableCell className="p-4">
                  <span className="text-sm">{queue.name}</span>
                </TableCell>
                <TableCell className="p-4">
                  <span className="text-sm">{queue.size}</span>
                </TableCell>
                <TableCell className="p-4">
                  <span className="text-sm">{queue.subscribers}</span>
                </TableCell>
                <TableCell className="p-4">
                  <span className="text-sm">{queue.unacked}</span>
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
              No queues found.
            </TableCell>
          </TableRow>
        )}
      </DataTable>
    </div>
  );
}
