import { Calendar, House, LayoutGrid, Star, User } from 'lucide-react';
import { Outlet } from 'react-router-dom';

import Sidebar from '@/core/ui/components/Sidebar';
import SidebarHeader from '@/core/ui/components/SidebarHeader';
import SidebarNav, { type NavLink } from '@/core/ui/components/SidebarNav';

const navLinks: NavLink[] = [
  {
    to: '/owner/dashboard',
    label: 'Dashboard',
    icon: LayoutGrid,
  },
  {
    to: '/owner/listings',
    label: 'My Listings',
    icon: House,
  },
  {
    to: '/owner/bookings',
    label: 'Bookings',
    icon: Calendar,
  },
  {
    to: '/owner/reviews',
    label: 'Reviews',
    icon: Star,
  },
  {
    to: '/owner/account',
    label: 'Account',
    icon: User,
  },
];

export default function OwnerLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar>
        <SidebarHeader />
        <SidebarNav navLinks={navLinks} />
      </Sidebar>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
