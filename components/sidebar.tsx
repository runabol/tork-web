import {
  HomeIcon,
  MagnifyingGlassIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/outline";
import MenuItem from "./menu-item";

export default function SideBar() {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-60 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
        <nav className="flex flex-1 flex-col my-4">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                <MenuItem name="Recent Jobs" icon={PlayCircleIcon} href="/" />
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
