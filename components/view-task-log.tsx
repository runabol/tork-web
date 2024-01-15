"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowLeftIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { taintUniqueValue } from "next/dist/server/app-render/rsc/taint";
import { formatRuntime, formatTimestamp } from "@/lib/datetime";
import { format } from "date-fns";

export default function ViewTaskLog({ task }: { task: Task }) {
  const cancelButtonRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [contents, setContents] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tail, setTail] = useState(false);
  const [tailInterval, setTailInterval] = useState(2_000);

  const refreshLog = useCallback(
    function (page: number) {
      console.log(`${format(new Date(), "hh:mm:ss")}: refresh log`);
      return fetch(`/api/tasks/${task.id}/log?page=${page}`)
        .then((res) => res.json() as Promise<Page<TaskLogPart>>)
        .then((log) => {
          setTotalPages(log.totalPages);
          return log.items
            .map((it) => {
              return it.contents.split("\n").reverse().join("\n");
            })
            .join("")
            .trim();
        })
        .then((contents) => {
          setContents((oldContents) => {
            if (oldContents === contents) {
              setTailInterval((tailInterval) => {
                var newInterval = tailInterval * 2;
                if (newInterval > 10_000) {
                  newInterval = 10_000;
                }
                return newInterval;
              });
            } else {
              setTailInterval((tailInterval) => {
                var newInterval = tailInterval / 2;
                if (newInterval < 2_000) {
                  newInterval = 2_000;
                }
                return newInterval;
              });
            }
            return contents;
          });
        });
    },
    [task.id, contents, setContents, setTotalPages, setTailInterval]
  );

  useEffect(() => {
    if (tail) {
      const intervalID = setInterval(() => {
        refreshLog(1);
      }, tailInterval);
      return () => clearInterval(intervalID);
    }
  }, [tail, tailInterval]);

  return (
    <>
      <button
        type="button"
        className="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 hover:bg-gray-50"
        onClick={() => {
          refreshLog(page);
          setOpen(true);
        }}
      >
        Log
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => {
            setContents("");
            setOpen(false);
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500/30 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:p-6 sm:w-full sm:max-w-4xl">
                  <p className="font-mono bg-gray-200 p-4 text-xs whitespace-pre-line max-h-96 overflow-scroll">
                    {contents ? contents : "no logs to show"}
                  </p>

                  <div className="flex gap-1 mt-4 justify-between">
                    <button
                      type="button"
                      className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      onClick={() => {
                        setContents("");
                        setOpen(false);
                      }}
                      ref={cancelButtonRef}
                    >
                      Close
                    </button>
                    <div className="flex gap-2">
                      {task.state === "RUNNING" ||
                      task.state === "SCHEDULED" ? (
                        <button
                          type="button"
                          title="Tail"
                          className={`rounded-md font-semibold bg-white px-3 py-2 text-sm  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
                          onClick={() => {
                            if (!tail) {
                              refreshLog(1);
                              setPage(1);
                            }
                            setTail((v) => !v);
                          }}
                        >
                          <ArrowPathIcon
                            className={`h-5 w-5 text-black ${
                              tail ? "animate-spin" : ""
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                      ) : (
                        <></>
                      )}
                      <button
                        type="button"
                        disabled={page >= totalPages || tail}
                        title="Previous Page"
                        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-30"
                        onClick={() => {
                          setPage((page) => page + 1);
                          refreshLog(page + 1);
                        }}
                      >
                        <ArrowLeftIcon
                          className="h-5 w-5 text-black"
                          aria-hidden="true"
                        />
                      </button>
                      <button
                        type="button"
                        title="Next Page"
                        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-30"
                        disabled={page < 2 || tail}
                        onClick={() => {
                          setPage((page) => page - 1);
                          refreshLog(page - 1);
                        }}
                      >
                        <ArrowRightIcon
                          className="h-5 w-5 text-black"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
