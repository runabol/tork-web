import StateBadge from "@/components/state-badge";
import Table from "@/components/table";
import THeader from "@/components/table-header";
import { formatTimestamp } from "@/lib/datetime";
import { CalendarIcon } from "@heroicons/react/24/solid";

interface params {
  id: string;
}

export default async function Job({ params: { id } }: { params: params }) {
  const data = await getData(id);
  return (
    <>
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {data.name}
          </h2>
          <div className="mt-2 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <StateBadge name={data.state}></StateBadge>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              Created on {formatTimestamp(data.createdAt)}
            </div>
            {data.completedAt || data.failedAt ? (
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <CalendarIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                Finished on{" "}
                {data.completedAt
                  ? formatTimestamp(data.completedAt)
                  : formatTimestamp(data.failedAt)}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          {/* <button
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Edit
              </button> */}
          {/* <button
              type="button"
              className="ml-3 inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Duplicate
            </button> */}
        </div>
      </div>
      <Table>
        <thead className="bg-gray-50">
          <tr>
            <THeader name="Name" />
            <THeader name="Started at" />
            <THeader name="Ended at" />
            <THeader name="State" />
            <THeader name="Output" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.execution.reverse().map((task) => (
            <tr key={task.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm  text-gray-500 sm:pl-6">
                {task.name}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden md:table-cell">
                {task.startedAt ? formatTimestamp(task.createdAt) : ""}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden md:table-cell">
                {task.completedAt
                  ? formatTimestamp(task.completedAt)
                  : task.failedAt
                  ? formatTimestamp(task.failedAt)
                  : ""}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <StateBadge name={task.state} />
              </td>
              <td className="px-3 py-4 text-sm text-gray-500 hidden md:table-cell">
                {task.error ? task.error : task.result}
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
