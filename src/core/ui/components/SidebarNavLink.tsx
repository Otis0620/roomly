import type { LucideIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface Props {
  label: string;
  to: string;
  icon: LucideIcon;
}

export default function SidebarNavLink({ label, to, icon: Icon }: Props) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-body flex items-center gap-2 px-5 py-2 ${isActive ? 'text-navy-600 bg-navy-50 border-r-2 font-medium' : 'font-light text-gray-400 hover:bg-gray-50 hover:text-gray-700'}`
      }
    >
      <Icon className="h-4 w-4" />
      {label}
    </NavLink>
  );
}
