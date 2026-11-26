// Simple house + lightning-bolt mark. Replace with the exported SVG from Figma if you prefer.
export default function Logo({
  size = 40,
  className = "",
  animated = false,
}: {
  size?: number;
  className?: string;
  animated?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 22 24 7l18 15"
        stroke="#142B4A"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 20v20a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V20M33 13V8h5v9"
        stroke="#142B4A"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M26 19l-7 11h6l-2 9 8-12h-6l1-8z" fill="#F59E0B" className={animated ? "logo-bolt" : undefined} />
    </svg>
  );
}
