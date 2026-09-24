import Link from "next/link";

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
      <span aria-hidden="true">↗</span>
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
