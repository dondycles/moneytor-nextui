export default function InnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="max-h-[100dvh] h-screen overflow-x-hidden overflow-y-auto p-4 flex-col flex gap-4 bg-gradient-to-b from-transparent to-primary/5">
      {children}
    </main>
  );
}
