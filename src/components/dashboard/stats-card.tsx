import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
  label: string;
  value: string | number;
};

export default function StatsCard({ label, value }: Props) {
  return (
    <Card className="dark:border-gray-700">
      <CardHeader>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
}
