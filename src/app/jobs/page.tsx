import Link from 'next/link';

import CancelJob from '@/components/cancel-job';
import JobsSearchInput from '@/components/dashboard/jobs/jobs-search-input';
import StatsCard from '@/components/dashboard/stats-card';
import Refresh from '@/components/refresh';
import RestartJob from '@/components/restart-job';
import DataTable from '@/components/shared/data-table';
import StateBadge from '@/components/state-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { getEnvConfig } from '@/config/env-config';
import { Job, Metrics, Page } from '@/models';
import { formatRuntime, formatTimestamp, truncateString } from '@/utils';

// TODO: Extract this out into a service file e.g. "services/server/jobs/jobs.service.ts"
async function getJobs(page: number, q: string): Promise<Page<Job>> {
  const envConfig = await getEnvConfig();

  const res = await fetch(`${envConfig.backendUrl}/jobs?page=${page}&q=${q}`, {
    cache: 'no-cache',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

// TODO: Extract this out into a service file e.g. "services/server/metrics/metrics.service.ts"
async function getMetrics(): Promise<Metrics> {
  const envConfig = await getEnvConfig();

  const res = await fetch(`${envConfig.backendUrl}/metrics`, {
    cache: 'no-cache',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const tableColumns: string[] = [
  'Name',
  'Created at',
  'Ended at',
  '% Completed',
  'Runtime',
  'State',
  '',
];

type Props = {
  searchParams: Promise<{
    page?: number;
    q?: string;
  }>;
};

export default async function JobsPage({ searchParams }: Props) {
  const { page: pageNum, q } = await searchParams;
  const page = await getJobs(pageNum || 1, q || '');
  const metrics = await getMetrics();

  return (
    <div className="flex gap-10 flex-col">
      <div className="flex justify-end gap-2">
        <Refresh />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
        <StatsCard label="Running Jobs" value={metrics.jobs.running} />
        <StatsCard label="Running Tasks" value={metrics.tasks.running} />
        <StatsCard label="Nodes" value={metrics.nodes.online} />
        <StatsCard
          label="Utilization"
          value={`${Math.round(metrics.nodes.cpuPercent * 100) / 100}%`}
        />
      </div>
      <JobsSearchInput query={q} />
      <DataTable columns={tableColumns} page={page} q={q}>
        {page.items.map((job: Job) => (
          <TableRow
            key={job.id}
            className="hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <TableCell className="p-4">
              <span className="text-sm text-foreground">
                {truncateString(job.name, 50)}
              </span>
              {job.parentId && (
                <Badge
                  variant="outline"
                  className="ml-2 text-gray-700 dark:text-gray-300"
                >
                  sub
                </Badge>
              )}
              {job.schedule && (
                <Badge
                  variant="outline"
                  className="ml-2 text-gray-700 dark:text-gray-300"
                >
                  scheduled
                </Badge>
              )}
            </TableCell>
            <TableCell className="p-4">
              <span className="text-sm text-foreground">
                {formatTimestamp(job.createdAt)}
              </span>
            </TableCell>
            <TableCell className="p-4">
              <span className="text-sm text-foreground">
                {job.completedAt
                  ? formatTimestamp(job.completedAt)
                  : job.failedAt
                    ? formatTimestamp(job.failedAt)
                    : ''}
              </span>
            </TableCell>
            <TableCell className="p-4">
              <span className="text-sm text-foreground">
                {job.position
                  ? Math.round(((job.position - 1) / job.taskCount) * 100)
                  : 0}
              </span>
            </TableCell>
            <TableCell className="p-4">
              <span className="text-sm text-foreground">
                {job.completedAt
                  ? formatRuntime(job.state, job.startedAt, job.completedAt)
                  : formatRuntime(job.state, job.startedAt, job.failedAt)}
              </span>
            </TableCell>
            <TableCell className="p-4">
              <StateBadge name={job.state} />
            </TableCell>
            <TableCell className="p-4">
              <span className="relative text-right text-sm font-medium flex gap-2 justify-end">
                <Link href={`/jobs/${job.id}`}>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="border-gray-300 dark:border-gray-700 text-sm"
                  >
                    View
                  </Button>
                </Link>
                {(job.state === 'RUNNING' || job.state === 'SCHEDULED') && (
                  <CancelJob job={job} />
                )}
                {(job.state === 'FAILED' || job.state === 'CANCELLED') && (
                  <RestartJob job={job} />
                )}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </DataTable>
    </div>
  );
}
