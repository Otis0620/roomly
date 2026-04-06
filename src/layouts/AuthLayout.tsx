import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <main className="w-full max-w-md px-4">
        <Outlet />
      </main>
    </div>
  );
}
