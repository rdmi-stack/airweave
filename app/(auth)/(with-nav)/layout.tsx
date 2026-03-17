import MinimalNav from "@/app/components/MinimalNav";

export default function WithNavLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MinimalNav />
      {children}
    </>
  );
}
