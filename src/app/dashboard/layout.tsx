type Props = {
  children: React.ReactNode;
};
export default function DashboardLayout({ children }: Props) {
  return (
    <main className="w-full">
      <nav className="w-full border-b">Navbar</nav>
      <div className="w-full">{children}</div>
    </main>
  );
}
