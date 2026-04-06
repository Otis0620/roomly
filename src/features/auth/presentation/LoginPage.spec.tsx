import 'reflect-metadata';

import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import authReducer from '@/core/store/authSlice';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';

import LoginPage from './LoginPage';

vi.mock('@/assets/logos/roomly-primary.svg', () => ({ default: 'roomly-logo.svg' }));
vi.mock('./components/LoginForm', () => ({ default: () => <form aria-label="login" /> }));

describe('LoginPage', () => {
  it('should render the Roomly logo', () => {
    const store = configureStore({ reducer: { auth: authReducer } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('img', { name: 'Roomly' })).toBeInTheDocument();
  });

  it('should render the sign in subtitle', () => {
    const store = configureStore({ reducer: { auth: authReducer } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
  });

  it('should render a link to the register page', () => {
    const store = configureStore({ reducer: { auth: authReducer } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('link', { name: 'Register' })).toBeInTheDocument();
  });

  it('should render the login form', () => {
    const store = configureStore({ reducer: { auth: authReducer } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('form', { name: 'login' })).toBeInTheDocument();
  });
});
