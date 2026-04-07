import { Link } from 'react-router-dom';

import roomlyLogo from '@/assets/logos/roomly-primary.svg';

import LoginForm from './components/LoginForm';

export default function LoginPage() {
  return (
    <div className="border-navy-600 w-full max-w-100 rounded-(--radius) border-t-3 bg-white px-10 py-8 shadow-(--shadow-card)">
      <img src={roomlyLogo} alt="Roomly" className="h-10 w-auto" />

      <p className="text-body mt-1 mb-6 font-light text-gray-400">Sign in to your account</p>

      <LoginForm />

      <div className="mt-4 flex items-center justify-center gap-1 text-sm text-gray-300">
        Don't have an account?
        <Link to="/register" className="text-navy-600 hover:underline">
          Register
        </Link>
      </div>
    </div>
  );
}
