import Link from 'next/link';

import { CalendarIcon, ClockIcon } from 'lucide-react';

import CancelJob from '@/components/cancel-job';
import JobLogs from '@/components/job-logs';
import Refresh from '@/components/refresh';
import RestartJob from '@/components/restart-job';
import DataTable from '@/components/shared/data-table';
import StateBadge from '@/components/state-badge';
import TaskInfo from '@/components/task-info';
import TaskLogs from '@/components/task-logs';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { getEnvConfig } from '@/config/env-config';
import { Job } from '@/models';
import { formatRuntime, formatTimestamp, truncateString } from '@/utils';

// TODO: Extract this out into a service file e.g. "services/server/jobs/jobs.service.ts"
async function getData(jobId: string): Promise<Job> {
  const envConfig = await getEnvConfig();

  const res = await fetch(`${envConfig.backendUrl}/jobs/${jobId}`, {
    cache: 'no-cache',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const tableColumns = [
  'Name',
  'Started at',
  'Ended at',
  'Runtime',
  'State',
  'Output',
  '',
];

type Props = {
  params: Promise<{ id: string }>;
};

export default async function JobPage({ params }: Props) {
  const { id } = await params;
  const job = await getData(id);

  return (
    <div className="flex flex-col gap-10">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-semibold sm:truncate sm:text-3xl">
            {job.name}
          </h2>
          <p className="hidden md:block text-sm text-gray-500 mt-3 whitespace-pre border-b border-gray-300 dark:border-gray-700 pb-4">
            {job.description}
          </p>
          <div className="mt-2 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="flex items-center text-sm my-1">
              <StateBadge textSize="text-base" name={job.state} />
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon
                className="mr-1.5 h-5 w-5 shrink-0 text-gray-400"
                aria-hidden="true"
              />
              Created at {formatTimestamp(job.createdAt)}
            </div>
            {(job.completedAt || job.failedAt) && (
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <CalendarIcon
                  className="mr-1.5 h-5 w-5 shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                Ended at{' '}
                {job.completedAt
                  ? formatTimestamp(job.completedAt)
                  : formatTimestamp(job.failedAt)}
              </div>
            )}
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <ClockIcon
                className="mr-1.5 h-5 w-5 shrink-0 text-gray-400"
                aria-hidden="true"
              />
              Runtime{' '}
              {job.completedAt
                ? formatRuntime(job.state, job.startedAt, job.completedAt)
                : formatRuntime(job.state, job.startedAt, job.failedAt)}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-end gap-2">
          {(job.state === 'PENDING' ||
            job.state === 'RUNNING' ||
            job.state === 'SCHEDULED') && <Refresh />}
          <JobLogs job={job} />
          <Link href={`/jobs/duplicate?id=${job.id}`}>
            <Button
              type="button"
              variant="outline"
              className="bg-blue-50 dark:bg-blue-200 text-blue-900 shadow-xs ring-1 ring-inset ring-blue-300 hover:bg-blue-100 dark:hover:bg-blue-300"
            >
              Duplicate
            </Button>
          </Link>
          {(job.state === 'RUNNING' || job.state === 'SCHEDULED') && (
            <CancelJob job={job} />
          )}
          {(job.state === 'FAILED' || job.state === 'CANCELLED') && (
            <RestartJob job={job} />
          )}
        </div>
        <DataTable columns={tableColumns}>
          {job.execution.reverse().map((task: any) => (
            <TableRow
              key={task.id}
              className="hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <TableCell className="p-4">
                <span className="text-sm">{truncateString(task.name, 30)}</span>
              </TableCell>
              <TableCell className="p-4">
                <span className="text-sm">
                  {task.startedAt ? formatTimestamp(task.startedAt) : ''}
                </span>
              </TableCell>
              <TableCell className="p-4">
                <span className="text-sm">
                  {task.completedAt
                    ? formatTimestamp(task.completedAt)
                    : task.failedAt
                      ? formatTimestamp(task.failedAt)
                      : ''}
                </span>
              </TableCell>
              <TableCell className="p-4">
                <span className="text-sm">
                  {task.completedAt
                    ? formatRuntime(
                        task.state,
                        task.startedAt,
                        task.completedAt
                      )
                    : formatRuntime(task.state, task.startedAt, task.failedAt)}
                </span>
              </TableCell>
              <TableCell className="p-4">
                <StateBadge name={task.state} />
              </TableCell>
              <TableCell>
                <span className="text-sm">
                  {truncateString(task.error ? task.error : task.result, 30)}
                </span>
              </TableCell>
              <TableCell className="relative p-4 text-right text-sm flex gap-2 justify-end">
                <TaskLogs task={task} />
                <TaskInfo task={task} />
              </TableCell>
            </TableRow>
          ))}
        </DataTable>
      </div>
    </div>
  );
}
