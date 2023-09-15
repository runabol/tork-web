"use client";

import CreateJob from "@/components/create-job";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { stringify } from "yaml";

export default function Duplicate() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
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
              inputs: job.inputs,
              output: job.output,
              tasks: job.tasks,
              defaults: job.defaults,
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
