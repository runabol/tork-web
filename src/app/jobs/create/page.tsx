"use client";

import { useState } from 'react';

import CreateJob from '@/components/create-job';

export default function Create() {
  const code = `name: my job
tasks:
  - name: my first task
    image: alpine:3.18.3
    run: echo -n hello world
`;
  const [placeholder, setPlaceholder] = useState(code);

  return (
    <CreateJob placeholder={placeholder} setPlaceholder={setPlaceholder} />
  );
}
