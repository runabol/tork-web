import DeleteScheduledJob from '@/components/delete-scheduled-job';
import PauseScheduledJob from '@/components/pause-scheduled-job';
import Refresh from '@/components/refresh';
import ResumeScheduledJob from '@/components/resume-scheduled-job';
import DataTable from '@/components/shared/data-table';
import StatusBadge from '@/components/status-badge';
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
      <h2 className="text-3xl font-semibold text-center">Scheduled Jobs</h2>
      <div className="flex justify-end">
        <Refresh />
      </div>
      <DataTable columns={tableColumns} page={scheduledJobsPaged}>
        {scheduledJobsPaged.items?.length > 0 ? (
          <>
            {scheduledJobsPaged.items.map((job: ScheduledJob) => (
              <TableRow
                key={job.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <TableCell className="p-4">
                  <span className="text-sm text-foreground">{job.name}</span>
                </TableCell>
                <TableCell className="p-4">
                  <span className="text-sm text-foreground">
                    {formatTimestamp(job.createdAt)}
                  </span>
                </TableCell>
                <TableCell className="p-4">
                  <span className="text-sm text-foreground">{job.cron}</span>
                </TableCell>
                <TableCell className="p-4">
                  <StatusBadge status={job.state} />
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
          </>
        ) : (
          <TableRow>
            <TableCell
              className="p-4 text-center"
              colSpan={tableColumns.length}
            >
              No scheduled jobs found.
            </TableCell>
          </TableRow>
        )}
      </DataTable>
    </div>
  );
}
