import 'reflect-metadata';

import { LayoutDashboard, Settings } from 'lucide-react';
import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';

import SidebarNav from './SidebarNav';

vi.mock('./SidebarNavLink', () => ({
  default: ({ label, to }: { label: string; to: string }) => <a href={to}>{label}</a>,
}));

describe('SidebarNav', () => {
  it('should render a link for each nav item', () => {
    const navLinks = [
      { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
      { label: 'Settings', to: '/settings', icon: Settings },
    ];

    render(
      <MemoryRouter>
        <SidebarNav navLinks={navLinks} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('should render nothing when navLinks is empty', () => {
    render(
      <MemoryRouter>
        <SidebarNav navLinks={[]} />
      </MemoryRouter>,
    );

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('should pass the correct href to each link', () => {
    const navLinks = [
      { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
      { label: 'Settings', to: '/settings', icon: Settings },
    ];

    render(
      <MemoryRouter>
        <SidebarNav navLinks={navLinks} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('href', '/dashboard');
    expect(screen.getByRole('link', { name: 'Settings' })).toHaveAttribute('href', '/settings');
  });
});
