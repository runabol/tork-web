import StateBadge from "@/components/state-badge";
import Table from "@/components/table";
import THeader from "@/components/table-header";
import { formatTimestamp } from "@/lib/datetime";
import Link from "next/link";

export default async function Jobs() {
  const page = await getData();
  return (
    <Table>
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
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6 ">
              {item.name}
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
            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
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
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

async function getData(): Promise<Page<Job>> {
  const res = await fetch(`${process.env.BACKEND_URL}/jobs`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
