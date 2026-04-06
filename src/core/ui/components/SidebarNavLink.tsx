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
      className="text-body flex items-center gap-2 px-5 py-2 font-light text-gray-400"
    >
      <Icon className="h-4 w-4 text-gray-400" />
      {label}
    </NavLink>
  );
}
