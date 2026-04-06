export default function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <aside className="flex h-full w-52 shrink-0 flex-col border-[0.5px] border-gray-200">
      {children}
    </aside>
  );
}
