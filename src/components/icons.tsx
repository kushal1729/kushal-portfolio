import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const ArrowUpRight = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const ArrowRight = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M4 12h16m-7-7 7 7-7 7" />
  </svg>
);

export const ArrowDown = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 4v16m7-7-7 7-7-7" />
  </svg>
);

export const Github = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 4.94-2.22 4.94-6.15a4.67 4.67 0 0 0-1.29-3.3 4.3 4.3 0 0 0-.08-3.29s-1.3-.38-4.3 1.6a12.1 12.1 0 0 0-6.26 0C5.07.42 3.77.8 3.77.8a4.3 4.3 0 0 0-.08 3.29A4.67 4.67 0 0 0 2.4 7.4c0 3.9 1.8 5.77 4.94 6.15a3.37 3.37 0 0 0-.94 2.58V22" />
  </svg>
);

export const LinkedIn = (props: IconProps) => (
  <svg {...base} {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2.5" />
    <path d="M7 10.5V17M7 7.2v.02M11.4 17v-3.6a2.6 2.6 0 0 1 5.2 0V17M11.4 13.4v-2.9" />
  </svg>
);

export const Mail = (props: IconProps) => (
  <svg {...base} {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7.5 8 5.5 8-5.5" />
  </svg>
);

export const Document = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </svg>
);
