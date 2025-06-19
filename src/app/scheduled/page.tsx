import DeleteScheduledJob from '@/components/delete-scheduled-job';
import PauseScheduledJob from '@/components/pause-scheduled-job';
import Refresh from '@/components/refresh';
import ResumeScheduledJob from '@/components/resume-scheduled-job';
import DataTable from '@/components/shared/data-table';
import { TableCell, TableRow } from '@/components/ui/table';
import { getEnvConfig } from '@/config/env-config';
import { Page, ScheduledJob } from '@/models';
import { formatTimestamp } from '@/utils';

// TODO: Extract this out into a service file e.g. "services/server/scheduled-jobs/scheduled-jobs.service.ts"
async function getData(): Promise<Page<ScheduledJob>> {
  const envConfig = await getEnvConfig();

  const res = await fetch(`${envConfig.backendUrl}/scheduled-jobs`, {
    cache: 'no-cache',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const tableColumns = ['Name', 'Created at', 'Schedule', 'Status', ''];

export const dynamic = 'force-dynamic';

export default async function ScheduledPage() {
  const scheduledJobsPaged = await getData();

  return (
    <div className="flex flex-col gap-10">
      <div className="mt-8 flex justify-end gap-2">
        <Refresh />
      </div>
      <DataTable columns={tableColumns} page={scheduledJobsPaged}>
        {scheduledJobsPaged.items.map((job: ScheduledJob) => (
          <TableRow key={job.id}>
            <TableCell className="p-4">
              <span className="text-sm text-gray-500">{job.name}</span>
            </TableCell>
            <TableCell className="p-4">
              <span className="text-sm text-gray-500">
                {formatTimestamp(job.createdAt)}
              </span>
            </TableCell>
            <TableCell className="p-4">
              <span className="text-sm text-gray-500">{job.cron}</span>
            </TableCell>
            <TableCell className="p-4">
              {job.state === 'ACTIVE' ? (
                <span
                  className={`inline-flex items-center capitalize rounded-md bg-green-50 text-green-700 px-2 py-1 text-xs font-medium  ring-1 ring-inset ring-gray-500/10`}
                >
                  {job.state}
                </span>
              ) : (
                <span
                  className={`inline-flex items-center capitalize rounded-md bg-red-50 text-red-700 px-2 py-1 text-xs font-medium  ring-1 ring-inset ring-gray-500/10`}
                >
                  {job.state}
                </span>
              )}
            </TableCell>
            <TableCell className="p-4">
              <span className="flex gap-2">
                {job.state === 'ACTIVE' && <PauseScheduledJob job={job} />}
                {job.state === 'PAUSED' && <ResumeScheduledJob job={job} />}
                <DeleteScheduledJob job={job} />
              </span>
            </TableCell>
          </TableRow>
        ))}
      </DataTable>
    </div>
  );
}
