import { XCircleIcon } from 'lucide-react';

import { Alert as ShadcnAlert, AlertDescription, AlertTitle } from './ui/alert';

type Props = {
  message: string;
};

export default function Alert({ message }: Props) {
  return message ? (
    <ShadcnAlert>
      <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </ShadcnAlert>
  ) : (
    <></>
  );
}
