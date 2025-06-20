'use client';

import { useCallback, useEffect, useState } from 'react';

import { format } from 'date-fns';
import { ArrowLeftIcon, ArrowRightIcon, RefreshCw } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Job, Page, TaskLogPart } from '@/models';
import { Button } from './ui/button';
import {
  Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
  DialogTrigger,
} from './ui/dialog';

type Props = {
  job: Job;
};

export default function JobLogs({ job }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [contents, setContents] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [tail, setTail] = useState<boolean>(
    job.state === 'RUNNING' || job.state === 'SCHEDULED'
  );
  const [tailInterval, setTailInterval] = useState<number>(2_000);

  const refreshLog = useCallback(
    async (page: number) => {
      console.log(`${format(new Date(), 'hh:mm:ss')}: refresh log`);
      const res = await fetch(`/api/jobs/${job.id}/log?page=${page}`);
      const log = await (res.json() as Promise<Page<TaskLogPart>>);
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
            if (newInterval > 10000) {
              newInterval = 10000;
            }
            return newInterval;
          });
        } else {
          setTailInterval(2000);
        }
        return contents;
      });
    },
    [open, job.id, contents, setContents, setTotalPages, setTailInterval]
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
            {contents ?? 'no logs to show'}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
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
            {(job.state === 'RUNNING' || job.state === 'SCHEDULED') && (
              <Button
                type="button"
                title="Tail"
                variant="default"
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
                    `h-5 w-5 text-foreground`,
                    tail && 'animate-spin'
                  )}
                  aria-hidden="true"
                />
              </Button>
            )}
            <Button
              type="button"
              title="Previous Page"
              variant="default"
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
              variant="default"
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
