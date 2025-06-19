'use client';

import { stringify } from 'yaml';

import {
  Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Task } from '@/models';
import { Button } from './ui/button';

type Props = {
  task: Task;
};

export default function ViewTask({ task }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="dark:border-gray-700 cursor-pointer"
        >
          View
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Task</DialogTitle>
          <DialogDescription className="font-mono bg-gray-200 dark:bg-gray-700 p-4 text-xs whitespace-pre-line max-h-96 overflow-scroll">
            {stringify(task)}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="dark:border-gray-700 cursor-pointer"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
