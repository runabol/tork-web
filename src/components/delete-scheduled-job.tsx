'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

import {
  Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { ScheduledJob } from '@/models';
import { Button } from './ui/button';

type Props = {
  job: ScheduledJob;
};

export default function DeleteScheduledJob({ job }: Props) {
  const router = useRouter();

  const cancelButtonRef = useRef(null);

  const [open, setOpen] = useState(false);

  const handleConfirmScheduledJobDelete = async (): Promise<void> => {
    try {
      const response = await fetch(`/api/scheduled-jobs/${job.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        console.error(response.statusText);
        return;
      }
      const data = await response.json();
      console.log(data);
      router.refresh();
      setOpen(false);
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="destructive"
            onClick={() => setOpen(true)}
          >
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <ExclamationTriangleIcon
                className="h-6 w-6 text-red-600"
                aria-hidden="true"
              />
            </div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                Delete {job.name}
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm text-gray-500">
                Are you sure you want to delete this scheduled job? This will
                permanently delete the job and any instances associated with it.
              </DialogDescription>
            </div>
          </div>
          <div className="mt-5 sm:ml-10 sm:mt-4 sm:flex sm:pl-4">
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmScheduledJobDelete}
            >
              Confirm
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              ref={cancelButtonRef}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
