import { Outlet } from 'react-router-dom';

export default function OwnerLayout() {
  return (
    <div>
      <p>Owner Layout</p>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
