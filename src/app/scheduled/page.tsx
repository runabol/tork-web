import DeleteScheduledJob from '@/components/delete-scheduled-job';
import PauseScheduledJob from '@/components/pause-scheduled-job';
import Refresh from '@/components/refresh';
import ResumeScheduledJob from '@/components/resume-scheduled-job';
import Table from '@/components/table';
import THeader from '@/components/table-header';
import ENV_CONFIG from '@/config/env-config';
import { formatTimestamp } from '@/lib/datetime';
import { Page, ScheduledJob } from '@/models';

export const dynamic = 'force-dynamic';

export default async function ScheduledPage() {
  const scheduledJobs = await getData();

  return (
    <>
      <div className="mt-8 flex justify-end gap-2">
        <Refresh />
      </div>
      <Table>
        <thead className="bg-gray-50">
          <tr>
            <THeader name="Name" />
            <THeader name="Created at" />
            <THeader name="Schedule" />
            <THeader name="Status" />
            <THeader name="" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {scheduledJobs.items.map((job: ScheduledJob) => (
            <tr key={job.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6 ">
                {job.name}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {formatTimestamp(job.createdAt)}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {job.cron}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
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
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <div className="flex gap-2">
                  {job.state === 'ACTIVE' && <PauseScheduledJob job={job} />}
                  {job.state === 'PAUSED' && <ResumeScheduledJob job={job} />}
                  <DeleteScheduledJob job={job} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

// TODO: Extract this out into a service file e.g. "services/server/scheduled-jobs/scheduled-jobs.service.ts"
async function getData(): Promise<Page<ScheduledJob>> {
  const res = await fetch(`${ENV_CONFIG.backendUrl}/scheduled-jobs`, {
    cache: 'no-cache',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
