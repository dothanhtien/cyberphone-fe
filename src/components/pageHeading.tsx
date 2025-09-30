import { JSX } from "react";

type Props = Readonly<{
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}>;

export default function PageHeading({ children, as: Tag = "h3" }: Props) {
  return (
    <Tag className="scroll-m-20 text-2xl font-semibold tracking-tight mb-8">
      {children}
    </Tag>
  );
}
