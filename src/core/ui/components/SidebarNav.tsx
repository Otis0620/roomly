import type { LucideIcon } from 'lucide-react';

import SidebarNavLink from './SidebarNavLink';

export interface NavLink {
  label: string;
  to: string;
  icon: LucideIcon;
}

interface Props {
  navLinks: NavLink[];
}

export default function SidebarNav({ navLinks }: Props) {
  return (
    <nav className="mt-2 flex flex-col">
      {navLinks.map(({ label, to, icon }) => (
        <SidebarNavLink key={to} label={label} to={to} icon={icon} />
      ))}
    </nav>
  );
}
