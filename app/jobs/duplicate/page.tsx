"use client";

import CreateJob from "@/components/create-job";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { stringify } from "yaml";

export default function Duplicate({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const id = searchParams.id;
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    fetch(`/api/jobs/${id}`)
      .then((res) => res.json() as Promise<Job>)
      .then((job) =>
        setPlaceholder(
          stringify(
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
          )
        )
      );
  }, []);

  return (
    <CreateJob placeholder={placeholder} setPlaceholder={setPlaceholder} />
  );
}
