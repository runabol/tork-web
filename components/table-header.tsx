export default function TH({ name }: { name: string }) {
  return (
    <th
      scope="col"
      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden md:table-cell"
    >
      {name}
    </th>
  );
}
