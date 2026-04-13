import { Calendar, Search, Star, User } from 'lucide-react';
import { Outlet } from 'react-router-dom';

import { selectCurrentUser } from '@/core/store/authSlice';
import { useAppSelector } from '@/core/store/hooks';
import Sidebar from '@/core/ui/components/Sidebar';
import SidebarFooter from '@/core/ui/components/SidebarFooter';
import SidebarHeader from '@/core/ui/components/SidebarHeader';
import SidebarNav, { type NavLink } from '@/core/ui/components/SidebarNav';

const navLinks: NavLink[] = [
  {
    to: '/hotels',
    label: 'Search hotels',
    icon: Search,
  },
  {
    to: '/bookings',
    label: 'My bookings',
    icon: Calendar,
  },
  {
    to: '/reviews',
    label: 'My reviews',
    icon: Star,
  },
  {
    to: '/account',
    label: 'Account',
    icon: User,
  },
];

export default function GuestLayout() {
  const currentUser = useAppSelector(selectCurrentUser)!;

  return (
    <div className="flex h-screen">
      <Sidebar>
        <SidebarHeader />
        <SidebarNav navLinks={navLinks} />
        <SidebarFooter
          fullName={`${currentUser.firstName} ${currentUser.lastName}`}
          role={currentUser.role}
        />
      </Sidebar>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
