export default function Sidebar({ children }: { children: React.ReactNode }) {
  return <aside className="w-52 shrink-0 border-[0.5px] border-gray-200">{children}</aside>;
}
