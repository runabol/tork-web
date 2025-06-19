import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

type Props = {
  name: string;
  textSize?: string;
};

export default function StateBadge({ name, textSize }: Props) {
  let backgroundColor: string;
  let textColor: string;

  switch (name) {
    case 'COMPLETED':
      backgroundColor = 'bg-green-400/20';
      textColor = 'text-green-400';
      break;
    case 'FAILED':
      backgroundColor = 'bg-red-400/20';
      textColor = 'text-red-400';
      break;
    case 'CANCELLED':
      backgroundColor = 'bg-yellow-400/20';
      textColor = 'text-yellow-400';
      break;
    default:
      backgroundColor = 'bg-gray-400/20';
      textColor = 'text-gray-400';
  }

  return (
    <Badge className={cn(textSize || 'text-xs', backgroundColor, textColor)}>
      {name.toLowerCase()}
    </Badge>
  );
}
