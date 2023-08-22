"use client";

import Link from "next/link";
import { useState } from "react";
import Alert from "./alert";
import { useRouter } from "next/navigation";
import CodeEditor from "@uiw/react-textarea-code-editor";

export default function SubmitJob() {
  const [content, setContent] = useState(
    `name: my job
tasks:
  - name: my first task
    image: alpine:3.18.3
    run: echo hello world
`
  );
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  return (
    <>
      <main className="py-6 lg:pl-60">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold leading-6 text-gray-900">
                New Job
              </h1>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <CodeEditor
                    value={content}
                    language="yaml"
                    placeholder="Please enter JS code."
                    onChange={(evn) => setContent(evn.target.value)}
                    padding={15}
                    minHeight={50}
                    style={{
                      fontSize: 14,
                      height: "30rem",
                      backgroundColor: "#f5f5f5",
                      fontFamily:
                        "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                    }}
                  />
                </div>
                <Alert message={errorMsg} />
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-2">
                  <button
                    type="button"
                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => {
                      fetch("/api/jobs", {
                        method: "POST",
                        body: content,
                        headers: {
                          "content-type": "text/yaml",
                        },
                      })
                        .then((res) => res.json())
                        .then((data) => {
                          if (data.error) {
                            setErrorMsg(data.error);
                          } else {
                            router.refresh();
                            router.push(`/jobs`);
                          }
                        });
                    }}
                  >
                    Submit
                  </button>
                  <Link href={"/jobs"}>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      Cancel
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
