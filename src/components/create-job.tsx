'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Editor } from '@monaco-editor/react';

import Alert from './alert';
import { Button } from './ui/button';

type Props = {
  jobTemplate?: string;
};

export default function CreateJob({ jobTemplate }: Props) {
  const router = useRouter();

  const code = `name: my job
tasks:
  - name: my first task
    image: node:22-alpine
    var: myVar
    run: node -e "console.log('Hello World')" > $TORK_OUTPUT
  - name: my second task
    image: alpine:3.22.0
    env: 
      MY_VAR: "{{ tasks.myVar }}"
    run: echo $MY_VAR`;

  const [placeholder, setPlaceholder] = useState(jobTemplate ?? code);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCreateJobSubmission = async (): Promise<void> => {
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        body: placeholder,
        headers: {
          'content-type': 'text/yaml',
        },
      });

      if (!response.ok) {
        setErrorMsg(response.statusText || 'Failed to create job.');
        return;
      }

      const data = await response.json();

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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="mt-8 flow-root">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            {placeholder && (
              <Editor
                height="30rem"
                language="yaml"
                theme="vs-dark"
                value={placeholder}
                onChange={(value) => setPlaceholder(value || '')}
              />
            )}
            <Alert message={errorMsg} />
            <div className="flex gap-2 mt-4 justify-end">
              <Link href={'/jobs'}>
                <Button type="button" variant="destructive">
                  Cancel
                </Button>
              </Link>
              <Button
                type="button"
                variant="success"
                onClick={handleCreateJobSubmission}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
