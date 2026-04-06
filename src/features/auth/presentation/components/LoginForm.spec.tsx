import 'reflect-metadata';

import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import authReducer from '@/core/store/authSlice';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import LoginForm from './LoginForm';
import type { AuthService } from '../../services/AuthService';

const mockLogin = vi.fn();
const mockAuthService = { login: mockLogin } as unknown as AuthService;

vi.mock('../../hooks/useAuthService', () => ({
  useAuthService: () => mockAuthService,
}));

function renderForm() {
  const store = configureStore({ reducer: { auth: authReducer } });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    </Provider>,
  );

  return store;
}

describe('LoginForm', () => {
  beforeEach(() => {
    mockLogin.mockReset();
  });

  describe('validation', () => {
    it('should show an email error when leaving the email field empty', async () => {
      renderForm();

      fireEvent.blur(screen.getByLabelText('Email'));

      expect(await screen.findByText('Email is required')).toBeInTheDocument();
    });

    it('should show an email error when an invalid email is entered', async () => {
      renderForm();

      fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'not-an-email' } });
      fireEvent.blur(screen.getByLabelText('Email'));

      expect(await screen.findByText('Please enter a valid email address')).toBeInTheDocument();
    });

    it('should show a password error when leaving the password field empty', async () => {
      renderForm();

      fireEvent.blur(screen.getByLabelText('Password'));

      expect(await screen.findByText('Password is required')).toBeInTheDocument();
    });

    it('should clear the email error when a valid email is typed', async () => {
      renderForm();

      fireEvent.blur(screen.getByLabelText('Email'));
      expect(await screen.findByText('Email is required')).toBeInTheDocument();

      fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'user@roomly.com' } });

      expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
    });

    it('should clear the password error when a valid password is typed', async () => {
      renderForm();

      fireEvent.blur(screen.getByLabelText('Password'));
      expect(await screen.findByText('Password is required')).toBeInTheDocument();

      fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });

      expect(screen.queryByText('Password is required')).not.toBeInTheDocument();
    });

    it('should update the email error when an invalid email is corrected to another invalid value', async () => {
      renderForm();

      fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'not-an-email' } });
      fireEvent.blur(screen.getByLabelText('Email'));
      expect(await screen.findByText('Please enter a valid email address')).toBeInTheDocument();

      fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'user@roomly.com' } });

      expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
    });

    it('should not show an email error when a valid email is entered and blurred', async () => {
      renderForm();

      fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'user@roomly.com' } });
      fireEvent.blur(screen.getByLabelText('Email'));

      expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
      expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
    });

    it('should not show a password error when a valid password is entered and blurred', async () => {
      renderForm();

      fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
      fireEvent.blur(screen.getByLabelText('Password'));

      expect(screen.queryByText('Password is required')).not.toBeInTheDocument();
    });

    it('should show email and password errors on submit with empty fields', async () => {
      renderForm();

      fireEvent.submit(screen.getByRole('button', { name: 'Sign in' }).closest('form')!);

      expect(await screen.findByText('Email is required')).toBeInTheDocument();
      expect(await screen.findByText('Password is required')).toBeInTheDocument();
    });
  });

  describe('submission', () => {
    it('should show "Signing in..." and disable the button while loading', async () => {
      mockLogin.mockReturnValue(new Promise(() => {}));

      renderForm();

      fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'user@roomly.com' } });
      fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
      fireEvent.submit(screen.getByRole('button', { name: 'Sign in' }).closest('form')!);

      expect(await screen.findByText('Signing in...')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Signing in...' })).toBeDisabled();
    });

    it('should show "Sign in" after a successful login', async () => {
      mockLogin.mockResolvedValueOnce({ id: '1', email: 'user@roomly.com', role: 'guest' });

      renderForm();

      fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'user@roomly.com' } });
      fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
      fireEvent.submit(screen.getByRole('button', { name: 'Sign in' }).closest('form')!);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
      });
    });

    it('should show an api error when login fails', async () => {
      mockLogin.mockRejectedValueOnce(new Error('Unauthorized'));

      renderForm();

      fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'user@roomly.com' } });
      fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
      fireEvent.submit(screen.getByRole('button', { name: 'Sign in' }).closest('form')!);

      expect(
        await screen.findByText('Invalid email or password. Please try again.'),
      ).toBeInTheDocument();
    });

    it('should clear the api error when the user starts typing', async () => {
      mockLogin.mockRejectedValueOnce(new Error('Unauthorized'));

      renderForm();

      fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'user@roomly.com' } });
      fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
      fireEvent.submit(screen.getByRole('button', { name: 'Sign in' }).closest('form')!);

      await screen.findByText('Invalid email or password. Please try again.');

      fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'other@roomly.com' } });

      expect(
        screen.queryByText('Invalid email or password. Please try again.'),
      ).not.toBeInTheDocument();
    });
  });
});
