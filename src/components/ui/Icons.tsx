import type { CSSProperties } from "react";

type IconProps = {
  className?: string;
  style?: CSSProperties;
  size?: number | string;
};

export function ArrowUpRight({ className, style, size = "1em" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{
        width: size,
        height: size,
        display: "inline-block",
        verticalAlign: "middle",
        flexShrink: 0,
        ...style,
      }}
      aria-hidden="true"
    >
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  );
}

export function ArrowDown({ className, style, size = "1em" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{
        width: size,
        height: size,
        display: "inline-block",
        verticalAlign: "middle",
        flexShrink: 0,
        ...style,
      }}
      aria-hidden="true"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  );
}

export function ArrowLeft({ className, style, size = "1em" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{
        width: size,
        height: size,
        display: "inline-block",
        verticalAlign: "middle",
        flexShrink: 0,
        ...style,
      }}
      aria-hidden="true"
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

export function ArrowRight({ className, style, size = "1em" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{
        width: size,
        height: size,
        display: "inline-block",
        verticalAlign: "middle",
        flexShrink: 0,
        ...style,
      }}
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export function CloseIcon({ className, style, size = "1em" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{
        width: size,
        height: size,
        display: "inline-block",
        verticalAlign: "middle",
        flexShrink: 0,
        ...style,
      }}
      aria-hidden="true"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

export function ArgentinaFlag({
  className,
  style,
  size = 18,
}: {
  className?: string;
  style?: CSSProperties;
  size?: number | string;
}) {
  const width = typeof size === "number" ? size : 18;
  const height = typeof size === "number" ? Math.round(size * 0.7) : "0.7em";

  return (
    <svg
      viewBox="0 0 20 14"
      width={width}
      height={height}
      className={className}
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        borderRadius: "2px",
        boxShadow: "0 0 0 1px rgba(23, 25, 22, 0.12)",
        flexShrink: 0,
        ...style,
      }}
      aria-hidden="true"
    >
      <rect width="20" height="4.67" fill="#75AADB" rx="1.5" />
      <rect y="4.67" width="20" height="4.66" fill="#FFFFFF" />
      <rect y="9.33" width="20" height="4.67" fill="#75AADB" rx="1.5" />
      {/* Sol de Mayo */}
      <circle cx="10" cy="7" r="1.35" fill="#F6B40E" />
      <path
        d="M10 4.8v0.7M10 8.5v0.7M7.8 7h0.7M11.5 7h0.7M8.4 5.4l0.5 0.5M11.1 8.1l0.5 0.5M8.4 8.6l0.5-0.5M11.1 5.9l0.5-0.5"
        stroke="#E59C00"
        strokeWidth="0.45"
        strokeLinecap="round"
      />
    </svg>
  );
}


