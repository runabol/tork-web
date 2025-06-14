import Link from 'next/link';

export default function NotfoundPage() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Page Not Found</h1>
        <p className="my-4 text-gray-600">
          We couldn&#39;t find the page you were looking for.
        </p>
        <Link href="/jobs" className="text-blue-500 hover:underline">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
