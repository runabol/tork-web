import { notFound } from 'next/navigation';

import DuplicateJob from '@/components/duplicate-job';
import ENV_CONFIG from '@/config/env-config';
import { Job, SearchParams } from '@/models';

// TODO: extract this out into a service file e.g. "services/server/jobs/jobs.service.ts"
const getJobById = async (id: string): Promise<Job | null> => {
  const res = await fetch(`${ENV_CONFIG.baseUrl}/api/jobs/${id}`);
  if (!res.ok) {
    console.error(`Failed to fetch job with ID ${id}: ${res.statusText}`);
    return null;
  }

  const job = await res.json();

  return job as Job;
};

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function DuplicateJobPage({ searchParams }: Props) {
  const id = (await searchParams).id;
  if (!id) {
    throw new Error('Job ID is required for duplication.');
  }

  const job = await getJobById(id as string);

  if (!job) {
    notFound();
  }

  return <DuplicateJob job={job} />;
}
