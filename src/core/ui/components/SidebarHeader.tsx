import roomlyLogo from '@/assets/logos/roomly-primary.svg';

export default function SidebarHeader() {
  return (
    <div className="border-b-[0.5px] border-gray-200">
      <img src={roomlyLogo} alt="Roomly" className="m-4 h-8 w-auto" />
    </div>
  );
}
