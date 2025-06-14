type Props = {
  name: string;
  textSize?: string;
};

export default function StateBadge({ name, textSize }: Props) {
  let bcolor: string;
  let tcolor: string;

  switch (name) {
    case 'COMPLETED':
      bcolor = 'bg-green-50';
      tcolor = 'text-green-700';
      break;
    case 'FAILED':
      bcolor = 'bg-red-50';
      tcolor = 'text-red-700';
      break;
    case 'CANCELLED':
      bcolor = 'bg-yellow-50';
      tcolor = 'text-yellow-800';
      break;
    default:
      bcolor = 'bg-gray-50';
      tcolor = 'text-gray-600';
  }

  return (
    <span
      className={`${
        textSize || 'text-xs'
      } ${bcolor} ${tcolor} inline-flex items-center capitalize rounded-md  px-2 py-1 font-medium ring-1 ring-inset ring-gray-500/10`}
    >
      {name.toLowerCase()}
    </span>
  );
}
