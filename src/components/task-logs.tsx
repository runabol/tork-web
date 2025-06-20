'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { format } from 'date-fns';
import { ArrowLeftIcon, ArrowRightIcon, RefreshCw } from 'lucide-react';

import {
  Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Page, Task, TaskLogPart } from '@/models';
import { Button } from './ui/button';

type Props = {
  task: Task;
};

export default function TaskLogs({ task }: Props) {
  const cancelButtonRef = useRef(null);

  const [open, setOpen] = useState<boolean>(false);
  const [contents, setContents] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [tail, setTail] = useState<boolean>(
    task.state === 'RUNNING' || task.state === 'SCHEDULED'
  );
  const [tailInterval, setTailInterval] = useState<number>(2_000);

  const refreshLog = useCallback(
    async (page: number) => {
      console.log(`${format(new Date(), 'hh:mm:ss')}: refresh log`);
      try {
        const res = await fetch(`/api/tasks/${task.id}/log?page=${page}`);
        const log: Page<TaskLogPart> = await res.json();

        setTotalPages(log.totalPages);

        const contents = log.items
          .map((it) => {
            return it.contents.split('\n').reverse().join('\n');
          })
          .join('')
          .trim();

        setContents((oldContents) => {
          if (oldContents === contents) {
            setTailInterval((tailInterval) => {
              let newInterval = tailInterval * 2;
              if (newInterval > 10_000) {
                newInterval = 10_000;
              }
              return newInterval;
            });
          } else {
            setTailInterval(2_000);
          }
          return contents;
        });
      } catch (e) {
        console.error(e);
      }
    },
    [open, task.id, contents, setContents, setTotalPages, setTailInterval]
  );

  useEffect(() => {
    if (tail && open) {
      const intervalID = setInterval(() => {
        refreshLog(1);
      }, tailInterval);
      return () => clearInterval(intervalID);
    }
  }, [open, tail, tailInterval]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            refreshLog(page);
            setOpen(true);
          }}
        >
          Logs
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Logs</DialogTitle>
          <DialogDescription className="scrollbar-thin w-full max-w-md font-mono bg-gray-200 dark:bg-gray-700 p-4 text-xs whitespace-pre-line max-h-96 overflow-x-hidden overflow-y-scroll">
            {contents ? contents : 'no logs to show'}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              ref={cancelButtonRef}
              type="button"
              variant="destructive"
              onClick={() => {
                setContents('');
                setOpen(false);
                setTail(false);
              }}
            >
              Close
            </Button>
          </DialogClose>
          <div className="flex gap-2">
            {(task.state === 'RUNNING' || task.state === 'SCHEDULED') && (
              <Button
                type="button"
                title="Tail"
                variant="outline"
                onClick={() => {
                  if (!tail) {
                    refreshLog(1);
                    setPage(1);
                  }
                  setTail((v) => !v);
                }}
              >
                <RefreshCw
                  className={cn(
                    'h-5 w-5 text-foreground',
                    tail && 'animate-spin'
                  )}
                  aria-hidden="true"
                />
              </Button>
            )}
            <Button
              type="button"
              title="Previous Page"
              variant="outline"
              disabled={page >= totalPages || tail}
              onClick={() => {
                setPage((page) => page + 1);
                refreshLog(page + 1);
              }}
            >
              <ArrowLeftIcon
                className="h-5 w-5 text-foreground"
                aria-hidden="true"
              />
            </Button>
            <Button
              type="button"
              title="Next Page"
              variant="outline"
              disabled={page < 2 || tail}
              onClick={() => {
                setPage((page) => page - 1);
                refreshLog(page - 1);
              }}
            >
              <ArrowRightIcon
                className="h-5 w-5 text-foreground"
                aria-hidden="true"
              />
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
