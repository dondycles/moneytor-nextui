import Nav from "@/components/ui/Nav";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full w-full overflow-auto flex flex-row bg-gradient-to-b from-transparent to-primary/10">
      <Nav />
      {children}
    </main>
  );
}
