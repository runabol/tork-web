import PauseScheduledJob from "@/components/pause-scheduled-job";
import Refresh from "@/components/refresh";
import ResumeScheduledJob from "@/components/resume-scheduled-job";
import Table from "@/components/table";
import THeader from "@/components/table-header";

export const dynamic = "force-dynamic";

export default async function Scheduled() {
  const sjobs = await getData();
  return (
    <>
      <div className="mt-8 flex justify-end gap-2">
        <Refresh />
      </div>
      <Table>
        <thead className="bg-gray-50">
          <tr>
            <THeader name="Name" />
            <THeader name="Schedule" />
            <THeader name="Status" />
            <THeader name="" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {sjobs.items.map((sjob) => (
            <tr key={sjob.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6 ">
                {sjob.name}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {sjob.cron}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {sjob.state === "ACTIVE" ? (
                  <span
                    className={`inline-flex items-center capitalize rounded-md bg-green-50 text-green-700 px-2 py-1 text-xs font-medium  ring-1 ring-inset ring-gray-500/10`}
                  >
                    {sjob.state}
                  </span>
                ) : (
                  <span
                    className={`inline-flex items-center capitalize rounded-md bg-red-50 text-red-700 px-2 py-1 text-xs font-medium  ring-1 ring-inset ring-gray-500/10`}
                  >
                    {sjob.state}
                  </span>
                )}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {sjob.state === "ACTIVE" && <PauseScheduledJob job={sjob} />}
                {sjob.state === "PAUSED" && <ResumeScheduledJob job={sjob} />}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

async function getData(): Promise<Page<ScheduledJob>> {
  const res = await fetch(`${process.env.BACKEND_URL}/scheduled-jobs`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
