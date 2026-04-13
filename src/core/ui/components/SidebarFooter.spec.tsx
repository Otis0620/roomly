import 'reflect-metadata';

import { UserRole } from '@/core/types/userTypes';
import { render, screen } from '@testing-library/react';

import SidebarFooter from './SidebarFooter';

describe('SidebarFooter', () => {
  it('should render the full name', () => {
    render(<SidebarFooter fullName="Jane Smith" role={UserRole.owner} />);

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('should render "Hotel Owner" for the owner role', () => {
    render(<SidebarFooter fullName="Jane Smith" role={UserRole.owner} />);

    expect(screen.getByText('Hotel Owner')).toBeInTheDocument();
  });

  it('should render "Hotel Guest" for the guest role', () => {
    render(<SidebarFooter fullName="John Doe" role={UserRole.guest} />);

    expect(screen.getByText('Hotel Guest')).toBeInTheDocument();
  });

  it('should render "Administrator" for the admin role', () => {
    render(<SidebarFooter fullName="Admin User" role={UserRole.admin} />);

    expect(screen.getByText('Administrator')).toBeInTheDocument();
  });

  it('should render a sign out button', () => {
    render(<SidebarFooter fullName="Jane Smith" role={UserRole.owner} />);

    expect(screen.getByRole('button', { name: 'Sign out' })).toBeInTheDocument();
  });
});
