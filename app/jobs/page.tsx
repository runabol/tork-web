import CancelJob from "@/components/cancel-job";
import Refresh from "@/components/refresh";
import RestartJob from "@/components/restart-job";
import StateBadge from "@/components/state-badge";
import Table from "@/components/table";
import THeader from "@/components/table-header";
import { formatTimestamp } from "@/lib/datetime";
import Link from "next/link";

export default async function Jobs({
  searchParams,
}: {
  searchParams: { page?: number };
}) {
  const page = await getJobs(searchParams.page || 1);
  const stats = await getStats();
  return (
    <>
      <div className="mt-8 flex justify-end gap-2">
        <Refresh />
      </div>
      <div>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">
              Running Jobs
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {stats.jobs.running}
            </dd>
          </div>
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">
              Running Tasks
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {stats.tasks.running}
            </dd>
          </div>
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">
              Nodes
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {stats.nodes.online}
            </dd>
          </div>
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">
              Utilization
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {Math.round(stats.nodes.cpuPercent * 100) / 100}%
            </dd>
          </div>
        </dl>
      </div>
      <Table page={page}>
        <thead className="bg-gray-50">
          <tr>
            <THeader name="Name" />
            <THeader name="Created at" />
            <THeader name="Ended at" />
            <THeader name="% Completed" />
            <THeader name="State" />
            <THeader name="" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {page.items.map((item) => (
            <tr key={item.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6 flex gap-2">
                <span>{item.name}</span>
                {item.parentId ? (
                  <span className="inline-flex items-center rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-500/10">
                    sub
                  </span>
                ) : (
                  <></>
                )}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {formatTimestamp(item.createdAt)}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {item.completedAt
                  ? formatTimestamp(item.completedAt)
                  : item.failedAt
                  ? formatTimestamp(item.failedAt)
                  : ""}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {Math.round(((item.position - 1) / item.taskCount) * 100)}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <StateBadge name={item.state} />
              </td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 flex gap-2 justify-end">
                <Link
                  href={`/jobs/${item.id}`}
                  className="text-black hover:text-gray-700"
                >
                  <button
                    type="button"
                    className="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 hover:bg-gray-50"
                  >
                    View
                  </button>
                </Link>
                {item.state === "RUNNING" ? <CancelJob job={item} /> : <></>}
                {item.state === "FAILED" || item.state === "CANCELLED" ? (
                  <RestartJob job={item} />
                ) : (
                  <></>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

async function getJobs(page: number): Promise<Page<Job>> {
  const res = await fetch(`${process.env.BACKEND_URL}/jobs?page=${page}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getStats(): Promise<Stats> {
  const res = await fetch(`${process.env.BACKEND_URL}/stats`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
