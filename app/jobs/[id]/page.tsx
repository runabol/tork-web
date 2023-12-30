import CancelJob from "@/components/cancel-job";
import Refresh from "@/components/refresh";
import RestartJob from "@/components/restart-job";
import StateBadge from "@/components/state-badge";
import Table from "@/components/table";
import THeader from "@/components/table-header";
import ViewTask from "@/components/view-task";
import { formatRuntime, formatTimestamp } from "@/lib/datetime";
import { truncateString } from "@/lib/strings";
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface params {
  id: string;
}

export default async function Job({ params: { id } }: { params: params }) {
  const job = await getData(id);
  return (
    <>
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {job.name}
          </h2>
          <p className="hidden md:block text-sm text-gray-500 mt-3 whitespace-pre border-b-[1px] border-gray-300 pb-4">
            {job.description}
          </p>
          <div className="mt-2 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <StateBadge textSize="text-lg" name={job.state}></StateBadge>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              Created at {formatTimestamp(job.createdAt)}
            </div>
            {job.completedAt || job.failedAt ? (
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <CalendarIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                Ended at{" "}
                {job.completedAt
                  ? formatTimestamp(job.completedAt)
                  : formatTimestamp(job.failedAt)}
              </div>
            ) : (
              <></>
            )}
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <ClockIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              Runtime{" "}
              {job.completedAt
                ? formatRuntime(job.state, job.startedAt, job.completedAt)
                : formatRuntime(job.state, job.startedAt, job.failedAt)}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 flex justify-end gap-2">
        {job.state === "PENDING" || job.state === "RUNNING" ? (
          <Refresh />
        ) : (
          <></>
        )}
        <Link href={`/jobs/duplicate?id=${job.id}`}>
          <button
            type="button"
            className="rounded-md bg-blue-50 px-2.5 py-1.5 text-sm font-semibold text-blue-900 shadow-sm ring-1 ring-inset ring-blue-300 hover:bg-blue-100"
          >
            Duplicate
          </button>
        </Link>
        {job.state === "RUNNING" || job.state === "SCHEDULED" ? (
          <CancelJob job={job} />
        ) : (
          <></>
        )}
        {job.state === "FAILED" || job.state === "CANCELLED" ? (
          <RestartJob job={job} />
        ) : (
          <></>
        )}
      </div>
      <Table>
        <thead className="bg-gray-50">
          <tr>
            <THeader name="Name" />
            <THeader name="Started at" />
            <THeader name="Ended at" />
            <THeader name="Runtime" />
            <THeader name="State" />
            <THeader name="Output" />
            <THeader name="" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {job.execution.reverse().map((task) => (
            <tr key={task.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm  text-gray-500 sm:pl-6">
                {truncateString(task.name, 30)}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden md:table-cell">
                {task.startedAt ? formatTimestamp(task.startedAt) : ""}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden md:table-cell">
                {task.completedAt
                  ? formatTimestamp(task.completedAt)
                  : task.failedAt
                  ? formatTimestamp(task.failedAt)
                  : ""}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {task.completedAt
                  ? formatRuntime(task.state, task.startedAt, task.completedAt)
                  : formatRuntime(task.state, task.startedAt, task.failedAt)}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <StateBadge name={task.state} />
              </td>
              <td className="px-3 py-4 text-sm text-gray-500 hidden md:table-cell">
                {truncateString(task.error ? task.error : task.result, 30)}
              </td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 flex gap-2 justify-end">
                <ViewTask task={task} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

async function getData(jobId: string): Promise<Job> {
  const res = await fetch(`${process.env.BACKEND_URL}/jobs/${jobId}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
