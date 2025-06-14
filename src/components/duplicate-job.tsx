'use client';

import { stringify } from 'yaml';

import { Job } from '@/models';
import CreateJob from './create-job';

type Props = {
  job: Job;
};

export default function DuplicateJob({ job }: Props) {
  const placeholder = stringify(
    {
      name: job.name,
      description: job.description,
      tags: job.tags,
      inputs: job.inputs,
      secrets: job.secrets,
      output: job.output,
      tasks: job.tasks,
      defaults: job.defaults,
      webhooks: job.webhooks,
    },
    { lineWidth: 0, blockQuote: true }
  );

  return <CreateJob jobTemplate={placeholder} />;
}
