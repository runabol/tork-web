import { DM_Sans } from 'next/font/google';

export const primaryFont = DM_Sans({
  subsets: ['latin'],
  variable: '--font-primary',
  weight: ['300', '400', '500', '600', '700'],
});
