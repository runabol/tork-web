'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../../ui/form';

const formSchema = z.object({
  query: z.string().optional(),
});
type FormSchema = z.infer<typeof formSchema>;

type Props = {
  query?: string;
};

export default function JobsSearchInput({ query }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const form = useForm<FormSchema>({
    mode: 'onChange',
    defaultValues: {
      query: query || '',
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormSchema) => {
    const params = new URLSearchParams(searchParams);

    if (data.query && data.query.trim()) {
      params.set('q', data.query.trim());
    } else {
      params.delete('q');
    }

    // Reset to page 1 when searching
    params.delete('page');

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

    router.push(newUrl);
  };

  return (
    <Form {...form}>
      <form className="max-w-sm" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="query"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Search</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input
                    placeholder="Search by job name, description or status"
                    autoFocus={query ? true : false}
                    className="w-full"
                    {...field}
                  />
                  <Button type="submit">Search</Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
