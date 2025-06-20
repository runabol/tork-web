'use client';

import { useRouter } from 'next/navigation';

import { AlertTriangle } from 'lucide-react';

import {
  Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScheduledJob } from '@/models';
import { Button } from './ui/button';

type Props = {
  job: ScheduledJob;
};

export default function DeleteScheduledJob({ job }: Props) {
  const router = useRouter();

  const handleConfirmScheduledJobDelete = async (): Promise<void> => {
    try {
      const response = await fetch(`/api/scheduled-jobs/${job.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      router.refresh();
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button type="button" variant="destructive" size="sm">
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <AlertTriangle
                  className="h-6 w-6 text-red-600"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <DialogTitle className="text-base font-semibold leading-6">
                  Delete {job.name}
                </DialogTitle>
                <DialogDescription className="mt-2 text-sm text-gray-500">
                  Are you sure you want to delete this scheduled job? This will
                  permanently delete the job and any instances associated with
                  it.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmScheduledJobDelete}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
