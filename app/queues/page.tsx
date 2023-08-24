import Table from "@/components/table";
import THeader from "@/components/table-header";

export default async function Queues() {
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
    <Table>
      <thead className="bg-gray-50">
        <tr>
          <THeader name="Name" />
          <THeader name="Size" />
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
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

async function getData(): Promise<Queue[]> {
  const res = await fetch(`${process.env.BACKEND_URL}/queues`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
