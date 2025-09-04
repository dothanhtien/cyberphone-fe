export default function PageHeading({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-8">
      {children}
    </h3>
  );
}
