import Link from "next/link";
import { ArrowUpRight } from "@/components/ui/Icons";

type ArrowLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
};

export function ArrowLink({ href, children, className, external }: ArrowLinkProps) {
  const content = (
    <>
      <span>{children}</span>
      <ArrowUpRight size="0.9em" />
    </>
  );

  if (external) {
    return (
      <a className={className} href={href}>
        {content}
      </a>
    );
  }

  return <Link className={className} href={href}>{content}</Link>;
}
