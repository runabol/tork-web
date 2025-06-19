import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

type Props = {
  status: string;
};

export default function NodeStatusBadge({ status }: Props) {
  return (
    <Badge
      className={cn(
        status === 'UP'
          ? 'bg-green-100 dark:bg-green-500/30 text-green-700 dark:text-green-500'
          : 'bg-red-100 dark:bg-red-500/30 text-red-700 dark:text-red-500'
      )}
    >
      {status}
    </Badge>
  );
}
