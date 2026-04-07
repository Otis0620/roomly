import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { setCurrentUser } from '@/core/store/authSlice';
import { useAppDispatch } from '@/core/store/hooks';
import LoadingSpinner from '@/core/ui/components/LoadingSpinner';

import { useAuthService } from '../../hooks/useAuthService';
import { loginSchema } from '../../validators/authValidators';

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authService = useAuthService();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleEmailChange(value: string) {
    setEmail(value);
    setApiError('');

    if (!emailError) {
      return;
    }

    const { error } = loginSchema.extract('email').validate(value);

    setEmailError(error ? error.message : '');
  }

  function handlePasswordChange(value: string) {
    setPassword(value);
    setApiError('');

    if (!passwordError) {
      return;
    }

    const { error } = loginSchema.extract('password').validate(value);

    setPasswordError(error ? error.message : '');
  }

  function validateOnBlur(field: 'email' | 'password') {
    const value = field === 'email' ? email : password;

    const { error } = loginSchema.extract(field).validate(value);

    if (field === 'email') {
      setEmailError(error ? error.message : '');
    }

    if (field === 'password') {
      setPasswordError(error ? error.message : '');
    }
  }

  function validate() {
    const { error } = loginSchema.validate({ email, password }, { abortEarly: false });

    setEmailError('');
    setPasswordError('');

    if (error) {
      for (const detail of error.details) {
        if (detail.context?.key === 'email') {
          setEmailError(detail.message);
        }

        if (detail.context?.key === 'password') {
          setPasswordError(detail.message);
        }
      }

      return false;
    }

    return true;
  }

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      const user = await authService.login({ email, password });

      dispatch(setCurrentUser(user));

      navigate('/owner/dashboard');
    } catch {
      setApiError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <label htmlFor="email" className="text-sm font-light text-gray-700">
        Email
      </label>
      <input
        id="email"
        value={email}
        onChange={(e) => handleEmailChange(e.target.value)}
        onBlur={() => validateOnBlur('email')}
        className="placeholder:text-body focus:border-navy-400 mt-1 h-9 w-full rounded-(--radius) border border-gray-200 px-3 text-sm placeholder-gray-300 placeholder:font-light focus:outline-none"
        placeholder="you@roomly.com"
      />

      {emailError && <p className="text-sm text-red-500">{emailError}</p>}

      <label htmlFor="password" className="text-sm font-light text-gray-700">
        Password
      </label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => handlePasswordChange(e.target.value)}
        onBlur={() => validateOnBlur('password')}
        className="placeholder:text-body focus:border-navy-400 mt-1 h-9 w-full rounded-(--radius) border border-gray-200 px-3 text-sm placeholder-gray-300 placeholder:font-light focus:outline-none"
        placeholder="••••••••"
      />

      {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}

      {apiError && <p className="text-sm text-red-500">{apiError}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="bg-navy-600 text-body mt-1 flex h-9.5 w-full cursor-pointer items-center justify-center gap-2 rounded-(--radius) text-white hover:opacity-88 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading && <LoadingSpinner className="size-4" />}
        {isLoading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}
