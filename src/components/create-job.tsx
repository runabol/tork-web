"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';

import { Editor } from '@monaco-editor/react';

import Alert from './alert';

export default function CreateJob({
  placeholder,
  setPlaceholder,
}: {
  placeholder: string;
  setPlaceholder: Dispatch<SetStateAction<string>>;
}) {
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  return (
    <>
      <div className="mt-8 flow-root">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <Editor
              height="30rem"
              language="yaml"
              theme="vs-dark"
              value={placeholder}
              onChange={(value) => setPlaceholder(value || "")}
            />
            <Alert message={errorMsg} />
            <div className="flex gap-2 mt-4 justify-end">
              <button
                type="button"
                className="block rounded-md bg-black px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                onClick={() => {
                  fetch("/api/jobs", {
                    method: "POST",
                    body: placeholder,
                    headers: {
                      "content-type": "text/yaml",
                    },
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.message) {
                        setErrorMsg(data.message);
                      } else {
                        router.refresh();
                        if (data.cron) {
                          router.push(`/jobs`);
                        } else {
                          router.push(`/jobs/${data.id}`);
                        }
                      }
                    });
                }}
              >
                Submit
              </button>
              <Link href={"/jobs"}>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:w-auto"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
