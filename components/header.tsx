import { PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { headers } from "next/headers";

export default function Header() {
  const headersList = headers();
  const nextPath = headersList.get("next-path") || "";
  const active =
    "inline-flex items-center border-b-2 border-gray-800 px-1 pt-1 text-sm font-medium text-gray-900";
  const inactive =
    "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700";
  return (
    <nav className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="hidden md:flex md:space-x-8">
              <a
                href="/jobs"
                className={nextPath.includes("/jobs") ? active : inactive}
              >
                Jobs
              </a>
              <a
                href="#"
                className={nextPath.includes("/queues") ? active : inactive}
              >
                Queues
              </a>
              <a
                href="#"
                className={nextPath.includes("/nodes") ? active : inactive}
              >
                Nodes
              </a>
            </div>
          </div>
          <div className="flex items-center">
            <Link href={"/jobs/create"}>
              <button
                type="button"
                className="relative inline-flex items-center gap-x-1.5 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                New Job
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
