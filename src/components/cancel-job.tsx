'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

import { Job } from '@/models';
import { Button } from './ui/button';
import {
  Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
  DialogTrigger,
} from './ui/dialog';

type Props = {
  job: Job;
};

export default function CancelJob({ job }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleCancel = async (): Promise<void> => {
    try {
      const response = await fetch(`/api/jobs/${job.id}/cancel`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Failed to cancel job');
      }
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="destructive">
          Cancel
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
              <ExclamationTriangleIcon
                className="h-6 w-6 text-red-600"
                aria-hidden="true"
              />
            </div>
            <div>
              <DialogTitle>Cancel Job</DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel this job?
                <span className="font-semibold block mt-1">{job.name}</span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="bg-secondary dark:border-gray-700"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" variant="destructive" onClick={handleCancel}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
