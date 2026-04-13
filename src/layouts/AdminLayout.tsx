import { Calendar, ChartNoAxesColumn, House, LayoutGrid, Star, User } from 'lucide-react';
import { Outlet } from 'react-router-dom';

import { selectCurrentUser } from '@/core/store/authSlice';
import { useAppSelector } from '@/core/store/hooks';
import Sidebar from '@/core/ui/components/Sidebar';
import SidebarFooter from '@/core/ui/components/SidebarFooter';
import SidebarHeader from '@/core/ui/components/SidebarHeader';
import SidebarNav, { type NavLink } from '@/core/ui/components/SidebarNav';

const navLinks: NavLink[] = [
  {
    to: '/admin/dashboard',
    label: 'Dashboard',
    icon: LayoutGrid,
  },
  {
    to: '/admin/hotels',
    label: 'Hotels',
    icon: House,
  },
  {
    to: '/admin/users',
    label: 'Users',
    icon: User,
  },
  {
    to: '/admin/bookings',
    label: 'Bookings',
    icon: Calendar,
  },
  {
    to: '/admin/reviews',
    label: 'Reviews',
    icon: Star,
  },
  {
    to: '/admin/reports',
    label: 'Reports',
    icon: ChartNoAxesColumn,
  },
];

export default function AdminLayout() {
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
