import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

type Props = {
  status: string;
};

export default function StatusBadge({ status }: Props) {
  let backgroundColor = '';
  let textColor = '';

  switch (status) {
    case 'ACTIVE':
      backgroundColor = 'bg-green-100 dark:bg-green-500/30';
      textColor = 'text-green-700 dark:text-green-500';
      break;
    case 'PAUSED':
      backgroundColor = 'bg-orange-100 dark:bg-orange-500/30';
      textColor = 'text-orange-700 dark:text-orange-500';
      break;
    case 'FAILED':
      backgroundColor = 'bg-red-100 dark:bg-red-500/30';
      textColor = 'text-red-700 dark:text-red-500';
      break;
    default:
      backgroundColor = 'bg-gray-100 dark:bg-gray-500/30';
      textColor = 'text-gray-700 dark:text-gray-500';
      break;
  }

  return <Badge className={cn(backgroundColor, textColor)}>{status}</Badge>;
}
