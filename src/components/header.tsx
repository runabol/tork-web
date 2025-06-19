'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { PlusIcon } from 'lucide-react';

import { Button } from './ui/button';

export default function Header() {
  const pathname = usePathname();

  const active =
    'inline-flex items-center border-b-2 border-black dark:border-blue-500 px-1 pt-1 text-sm font-medium dark:text-blue-500 text-black';
  const inactive =
    'inline-flex items-center border-b-2 text-gray-500 border-transparent px-1 pt-1 text-sm font-medium hover:border-gray-300 hover:text-gray-600 dark:hover:text-white';

  return (
    <nav className="shadow-sm border-b border-gray-100 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="hidden md:flex md:space-x-8">
              <Link
                href="/jobs"
                className={pathname.includes('/jobs') ? active : inactive}
              >
                Jobs
              </Link>
              <Link
                href="/scheduled"
                className={pathname.includes('/scheduled') ? active : inactive}
              >
                Scheduled
              </Link>
              <Link
                href="/queues"
                className={pathname.includes('/queues') ? active : inactive}
              >
                Queues
              </Link>
              <Link
                href="/nodes"
                className={pathname.includes('/nodes') ? active : inactive}
              >
                Nodes
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link href="/jobs/create">
              <Button
                type="button"
                variant="default"
                className="cursor-pointer"
              >
                <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                New Job
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
