export default function Table({
  children,
  page,
  search,
  q,
}: {
  children: React.ReactNode;
  page?: Page<any>;
  q?: string;
  search?: boolean;
}) {
  return (
    <div className="mt-6 flow-root">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          {search ? (
            <div>
              <label htmlFor="email" className="sr-only">
                Search
              </label>
              <form>
                <input
                  type="text"
                  name="q"
                  id="q"
                  autoFocus={q ? true : false}
                  className="block my-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Search by job name, description or status"
                  defaultValue={q}
                />
              </form>
            </div>
          ) : (
            <></>
          )}
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              {children}
            </table>
            {page ? (
              <nav
                className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                aria-label="Pagination"
              >
                <div className="hidden sm:block">
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">
                      {(page.number - 1) * 10 + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {(page.number - 1) * 10 + page.size}
                    </span>{" "}
                    of <span className="font-medium">{page.totalItems}</span>{" "}
                    results
                  </p>
                </div>
                <div className="flex flex-1 justify-between sm:justify-end">
                  {page.number > 1 ? (
                    <a
                      href={`?page=${page.number - 1}${q ? "&q=" + q : ""}`}
                      className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                    >
                      Previous
                    </a>
                  ) : (
                    <></>
                  )}
                  {page.number < page.totalPages ? (
                    <a
                      href={`?page=${page.number + 1}${q ? "&q=" + q : ""}`}
                      className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                    >
                      Next
                    </a>
                  ) : (
                    <></>
                  )}
                </div>
              </nav>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
