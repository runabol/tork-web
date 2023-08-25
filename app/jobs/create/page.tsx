"use client";

import CreateJob from "@/components/create-job";
import { useState } from "react";

export default function Create() {
  const code = `name: my job
tasks:
  - name: my first task
    image: alpine:3.18.3
    run: echo hello world

  - name: my second task
    image: alpine:3.18.3
    run: echo bye world
`;
  const [placeholder, setPlaceholder] = useState(code);

  return (
    <CreateJob placeholder={placeholder} setPlaceholder={setPlaceholder} />
  );
}
