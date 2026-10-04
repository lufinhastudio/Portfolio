/* ==========================================================================
   BrandMark — monograma "LF" de Lufinha
   --------------------------------------------------------------------------
   Vectorizado a partir del favicon (src/app/icon.png). Usa currentColor,
   así que toma el color del texto donde se coloque.
   ========================================================================== */

type BrandMarkProps = {
  className?: string;
  size?: string | number;
  title?: string;
};

export function BrandMark({ className, size = "1em", title }: BrandMarkProps) {
  return (
    <svg
      className={className}
      viewBox="259 340 760 680"
      width={size}
      height={size}
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      {/* L */}
      <path d="M279 340H411Q445 340 445 374V870H979Q999 870 999 890V958Q999 980 984 995L970 1009Q958 1020 940 1020H360A101 101 0 0 1 259 919V360Q259 340 279 340Z" />
      {/* F */}
      <path d="M512 440Q512 410 528 393L568 353Q584 340 620 340H1000Q1019 340 1019 359V438Q1019 458 1004 474L990 488Q975 500 958 500H678V593H968Q988 593 988 613V670Q988 690 974 705L960 718Q945 731 927 731H678V818Q678 833 662 833H528Q512 833 512 817Z" />
    </svg>
  );
}
