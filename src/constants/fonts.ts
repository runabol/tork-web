import { Lexend, Outfit } from 'next/font/google';

export const primaryFont = Lexend({
  subsets: ['latin'],
  variable: '--font-primary',
  weight: ['300', '400', '500', '600', '700'],
});

export const secondaryFont = Outfit({
  subsets: ['latin'],
  variable: '--font-secondary',
  weight: ['300', '400', '500', '600', '700'],
});
