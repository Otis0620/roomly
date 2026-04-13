import { UserRole } from '@/core/types/userTypes';

const roleLabel: Record<UserRole, string> = {
  [UserRole.guest]: 'Guest',
  [UserRole.owner]: 'Hotel Owner',
  [UserRole.admin]: 'Administrator',
};

interface Props {
  fullName: string;
  role: UserRole;
}

export default function SidebarFooter({ fullName, role }: Props) {
  return (
    <div className="mt-auto flex flex-col items-start border-t-[0.5px] border-gray-200 px-4 py-5">
      <span className="text-sm font-medium text-gray-900">{fullName}</span>
      <span className="text-micro font-light text-gray-400">{roleLabel[role]}</span>
      <button
        type="button"
        className="text-micro mt-1 cursor-pointer font-light text-gray-400 hover:text-red-400"
      >
        Sign out
      </button>
    </div>
  );
}
