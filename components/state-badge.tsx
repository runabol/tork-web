export default function StateBadge({ name }: { name: string }) {
  var bcolor: string;
  var tcolor: string;
  switch (name) {
    case "COMPLETED":
      bcolor = "bg-green-50";
      tcolor = "text-green-700";
      break;
    case "FAILED":
      bcolor = "bg-red-50";
      tcolor = "text-red-700";
      break;
    case "CANCELLED":
      bcolor = "bg-yellow-50";
      tcolor = "text-yellow-800";
      break;
    default:
      bcolor = "bg-gray-50";
      tcolor = "text-gray-600";
  }
  return (
    <span
      className={`inline-flex items-center capitalize rounded-md ${bcolor} px-2 py-1 text-xs font-medium ${tcolor} ring-1 ring-inset ring-gray-500/10`}
    >
      {name.toLowerCase()}
    </span>
  );
}
