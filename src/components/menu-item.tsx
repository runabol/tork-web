import { classNames } from '@/lib/classnames';

type Props = {
  name: string;
  icon: React.ElementType;
  href: string;
};

export default function MenuItem({ name, icon, href }: Props) {
  const Icon = icon;
  return (
    <li>
      <a
        href={href}
        className={classNames(
          false ? 'bg-gray-50 text-black' : 'text-gray-700  hover:bg-gray-200',
          'group flex gap-x-3 rounded-md px-2 py-2.5 text-sm leading-6'
        )}
      >
        <span
          className={classNames(
            false ? 'text-black border-black' : 'text-white border-gray-200  ',
            'flex h-6 w-6 shrink-0 items-center justify-center text-[0.625rem] font-medium bg-white'
          )}
        >
          <Icon
            className={classNames(
              false ? 'text-black' : 'text-gray-400 group-hover:bg-gray-200',
              'h-6 w-6 shrink-0'
            )}
            aria-hidden="true"
          />
        </span>
        <span className="truncate">{name}</span>
      </a>
    </li>
  );
}
