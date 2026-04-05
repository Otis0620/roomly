import { Link } from 'react-router-dom';

import roomlyLogo from '@/assets/logos/roomly-primary.svg';

import LoginForm from './components/LoginForm';

export default function LoginPage() {
  return (
    <div className="w-full max-w-100 py-8 px-10 rounded-(--radius) border-t-3 border-navy-600 bg-white shadow-(--shadow-card)">
      <img src={roomlyLogo} alt="Roomly" className="h-10 w-auto" />

      <p className="mt-1 mb-6 text-body font-light text-gray-400">Sign in to your account</p>

      <LoginForm />

      <p className="mt-4 text-sm text-center text-gray-300">
        Don't have an account?{' '}
        <Link to="/register" className="text-navy-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
