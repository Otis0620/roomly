import 'reflect-metadata';

import { LayoutDashboard } from 'lucide-react';
import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';

import SidebarNavLink from './SidebarNavLink';

describe('SidebarNavLink', () => {
  it('should render the label', () => {
    render(
      <MemoryRouter>
        <SidebarNavLink label="Dashboard" to="/dashboard" icon={LayoutDashboard} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('should render the icon', () => {
    render(
      <MemoryRouter>
        <SidebarNavLink label="Dashboard" to="/dashboard" icon={LayoutDashboard} />
      </MemoryRouter>,
    );

    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('should apply active classes when the route matches', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <SidebarNavLink label="Dashboard" to="/dashboard" icon={LayoutDashboard} />
      </MemoryRouter>,
    );

    const link = screen.getByRole('link', { name: /dashboard/i });

    expect(link).toHaveClass('bg-navy-50', 'text-navy-600', 'border-r-2', 'font-medium');
    expect(link).not.toHaveClass('font-light', 'text-gray-400');
  });

  it('should apply inactive classes when the route does not match', () => {
    render(
      <MemoryRouter initialEntries={['/other']}>
        <SidebarNavLink label="Dashboard" to="/dashboard" icon={LayoutDashboard} />
      </MemoryRouter>,
    );

    const link = screen.getByRole('link', { name: /dashboard/i });

    expect(link).toHaveClass('font-light', 'text-gray-400');
    expect(link).not.toHaveClass('bg-navy-50', 'text-navy-600');
  });

  it('should link to the provided path', () => {
    render(
      <MemoryRouter>
        <SidebarNavLink label="Dashboard" to="/dashboard" icon={LayoutDashboard} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute('href', '/dashboard');
  });
});
