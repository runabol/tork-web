import Link from 'next/link';
import { PropsWithChildren } from 'react';

import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Page } from '@/models';

type Props = {
  columns: string[];
  page?: Page<any>;
  q?: string;
};

export default function DataTable({
  columns,
  page,
  q,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className="overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 rounded-lg">
      <Table className="bg-secondary">
        <TableHeader>
          <TableRow className="hover:bg-secondary">
            {columns.map((column) => (
              <TableHead
                key={column}
                className="px-4 text-gray-500 dark:text-gray-400"
              >
                {column}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>{children}</TableBody>
      </Table>
      {page && page.size > 0 && (
        <div
          className="flex items-center justify-between border-t bg-secondary p-4"
          aria-label="Pagination"
        >
          <div className="hidden sm:block">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing{' '}
              <span className="font-medium">{(page.number - 1) * 10 + 1}</span>{' '}
              to{' '}
              <span className="font-medium">
                {(page.number - 1) * 10 + page.size}
              </span>{' '}
              of <span className="font-medium">{page.totalItems}</span> results
            </p>
          </div>
          <div className="flex flex-1 justify-between sm:justify-end">
            {page.number > 1 && (
              <Link
                href={`?page=${page.number - 1}${q ? '&q=' + q : ''}`}
                className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
              >
                Previous
              </Link>
            )}
            {page.number < page.totalPages && (
              <Link
                href={`?page=${page.number + 1}${q ? '&q=' + q : ''}`}
                className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
              >
                Next
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
