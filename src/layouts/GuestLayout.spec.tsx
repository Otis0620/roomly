import 'reflect-metadata';

import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { setCurrentUser } from '@/core/store/authSlice';
import authReducer from '@/core/store/authSlice';
import { UserRole } from '@/core/types/userTypes';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';

import GuestLayout from './GuestLayout';

vi.mock('@/core/ui/components/Sidebar', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
vi.mock('@/core/ui/components/SidebarHeader', () => ({
  default: () => <div aria-label="sidebar-header" />,
}));
vi.mock('@/core/ui/components/SidebarNav', () => ({
  default: ({ navLinks }: { navLinks: { label: string }[] }) => (
    <nav>
      {navLinks.map((link) => (
        <span key={link.label}>{link.label}</span>
      ))}
    </nav>
  ),
}));
vi.mock('@/core/ui/components/SidebarFooter', () => ({
  default: ({ fullName, role }: { fullName: string; role: string }) => (
    <div>
      <span>{fullName}</span>
      <span>{role}</span>
    </div>
  ),
}));

describe('GuestLayout', () => {
  it('should render the full name of the current user', () => {
    const store = configureStore({ reducer: { auth: authReducer } });
    store.dispatch(
      setCurrentUser({
        id: '1',
        email: 'jane@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        role: UserRole.guest,
      }),
    );

    render(
      <Provider store={store}>
        <MemoryRouter>
          <GuestLayout />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('should render the role of the current user', () => {
    const store = configureStore({ reducer: { auth: authReducer } });
    store.dispatch(
      setCurrentUser({
        id: '1',
        email: 'jane@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        role: UserRole.guest,
      }),
    );

    render(
      <Provider store={store}>
        <MemoryRouter>
          <GuestLayout />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText(UserRole.guest)).toBeInTheDocument();
  });

  it('should render all guest nav links', () => {
    const store = configureStore({ reducer: { auth: authReducer } });
    store.dispatch(
      setCurrentUser({
        id: '1',
        email: 'jane@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        role: UserRole.guest,
      }),
    );

    render(
      <Provider store={store}>
        <MemoryRouter>
          <GuestLayout />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Search hotels')).toBeInTheDocument();
    expect(screen.getByText('My bookings')).toBeInTheDocument();
    expect(screen.getByText('My reviews')).toBeInTheDocument();
    expect(screen.getByText('Account')).toBeInTheDocument();
  });
});
