import Refresh from '@/components/refresh';
import DataTable from '@/components/shared/data-table';
import THeader from '@/components/table-header';
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

export const dynamic = 'force-dynamic';

export default async function QueuesPage() {
  const qs = await getData();

  const sorted = qs.sort((a, b) => {
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
    <>
      <div className="mt-8 flex justify-end gap-2">
        <Refresh />
      </div>
      <DataTable>
        <thead className="bg-gray-50">
          <tr>
            <THeader name="Name" />
            <THeader name="Size" />
            <THeader name="Subscribers" />
            <THeader name="Unacked" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {sorted.map((q) => (
            <tr key={q.name}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6 ">
                {q.name}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {q.size}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {q.subscribers}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {q.unacked}
              </td>
            </tr>
          ))}
        </tbody>
      </DataTable>
    </>
  );
}
