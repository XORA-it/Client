import React from "react";

/**
 * Small inline icon set matching the existing Heroicons-outline style used
 * across PsoriasisResult / PsoriasisUpload (viewBox 0 0 24 24, stroke
 * currentColor, strokeWidth 1.5, round caps/joins) - no icon package
 * dependency is added, consistent with the rest of this project.
 */
const Base = ({ children, className = "h-5 w-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    {children}
  </svg>
);

export const TargetIcon = (props) => (
  <Base {...props}>
    <circle cx="12" cy="12" r="8.25" strokeLinecap="round" />
    <circle cx="12" cy="12" r="4.25" strokeLinecap="round" />
    <circle cx="12" cy="12" r="0.75" fill="currentColor" stroke="none" />
  </Base>
);

export const LayersIcon = (props) => (
  <Base {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m12 4 8 4.5-8 4.5-8-4.5L12 4Z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="m4 12.5 8 4.5 8-4.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m4 16.5 8 4.5 8-4.5" />
  </Base>
);

export const AwardIcon = (props) => (
  <Base {...props}>
    <circle cx="12" cy="9" r="5.25" strokeLinecap="round" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m8.5 13.5-1.75 6 5.25-2.5 5.25 2.5-1.75-6" />
  </Base>
);

export const ChartBarIcon = (props) => (
  <Base {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 20V10M10 20V4M16 20v-7M4 20h16" />
  </Base>
);

export const ShieldIcon = (props) => (
  <Base {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3.5 5 6.25v5.5c0 5 3 8 7 9 4-1 7-4 7-9v-5.5L12 3.5Z"
    />
  </Base>
);

export const UploadIcon = (props) => (
  <Base {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 16.5 17.25v-1.5m.75-11.25 3 3m0 0-3 3m3-3h-9"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 9.75 9 5.25m0 0 4.5 4.5M9 5.25v9" />
  </Base>
);

export const FingerprintIcon = (props) => (
  <Base {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5.5a6.5 6.5 0 0 0-6.5 6.5c0 2.5.5 4.25 1.25 5.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5.5a6.5 6.5 0 0 1 6.5 6.5c0 1-.06 1.85-.18 2.6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.5a3.5 3.5 0 0 0-3.5 3.5c0 3-1 5-2 6.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.5a3.5 3.5 0 0 1 3.5 3.5c0 1.5-.2 2.7-.55 3.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v1.5c0 2.5-.6 4.4-1.5 6" />
  </Base>
);

export const ContrastIcon = (props) => (
  <Base {...props}>
    <circle cx="12" cy="12" r="8.25" strokeLinecap="round" />
    <path d="M12 3.75a8.25 8.25 0 0 1 0 16.5Z" fill="currentColor" stroke="none" />
  </Base>
);

export const CropIcon = (props) => (
  <Base {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 3v13a1 1 0 0 0 1 1h13" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 21V8a1 1 0 0 0-1-1H3" />
  </Base>
);

export const CpuIcon = (props) => (
  <Base {...props}>
    <rect x="7" y="7" width="10" height="10" rx="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="2" strokeLinecap="round" />
    <path
      strokeLinecap="round"
      d="M9 3v2.5M12 3v2.5M15 3v2.5M9 18.5V21M12 18.5V21M15 18.5V21M3 9h2.5M3 12h2.5M3 15h2.5M18.5 9H21M18.5 12H21M18.5 15H21"
    />
  </Base>
);

export const TagIcon = (props) => (
  <Base {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 4h12v16l-6-4-6 4V4Z" />
  </Base>
);

export const DocumentIcon = (props) => (
  <Base {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 3.75h8.25L18 7.5v12.75a.75.75 0 0 1-.75.75H6a.75.75 0 0 1-.75-.75V4.5A.75.75 0 0 1 6 3.75Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 3.75V7.5H18M9 12.75h6M9 15.75h6M9 9.75h2" />
  </Base>
);

export const CheckCircleIcon = (props) => (
  <Base {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </Base>
);

export const XCircleIcon = (props) => (
  <Base {...props}>
    <circle cx="12" cy="12" r="9" strokeLinecap="round" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m9.5 9.5 5 5m0-5-5 5" />
  </Base>
);

export const ChevronDownIcon = (props) => (
  <Base {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
  </Base>
);

export const ArrowRightIcon = (props) => (
  <Base {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16M14 6l6 6-6 6" />
  </Base>
);

export const PhotoIcon = (props) => (
  <Base {...props}>
    <rect x="3.75" y="4.5" width="16.5" height="15" rx="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="8.25" cy="9" r="1.4" strokeLinecap="round" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 16.5 4.75-4.75a1.5 1.5 0 0 1 2.12 0L15 15.375m0 0 1.9-1.9a1.5 1.5 0 0 1 2.12 0l1.23 1.23M15 15.375 17.5 18" />
  </Base>
);

export const BadgeCheckIcon = (props) => (
  <Base {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.53 3.62a2.25 2.25 0 0 1 2.94 0l.94.8a2.25 2.25 0 0 0 1.34.53l1.24.08a2.25 2.25 0 0 1 2.1 2.1l.08 1.24a2.25 2.25 0 0 0 .53 1.34l.8.94a2.25 2.25 0 0 1 0 2.94l-.8.94a2.25 2.25 0 0 0-.53 1.34l-.08 1.24a2.25 2.25 0 0 1-2.1 2.1l-1.24.08a2.25 2.25 0 0 0-1.34.53l-.94.8a2.25 2.25 0 0 1-2.94 0l-.94-.8a2.25 2.25 0 0 0-1.34-.53l-1.24-.08a2.25 2.25 0 0 1-2.1-2.1l-.08-1.24a2.25 2.25 0 0 0-.53-1.34l-.8-.94a2.25 2.25 0 0 1 0-2.94l.8-.94a2.25 2.25 0 0 0 .53-1.34l.08-1.24a2.25 2.25 0 0 1 2.1-2.1l1.24-.08a2.25 2.25 0 0 0 1.34-.53l.94-.8Z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.75 2.25 2.25 4.5-4.5" />
  </Base>
);

export const FlipHorizontalIcon = (props) => (
  <Base {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18" strokeDasharray="2.5 2.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 9 4.5 12 8 15M16 9l3.5 3-3.5 3" />
  </Base>
);

export const FlipVerticalIcon = (props) => (
  <Base {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18" strokeDasharray="2.5 2.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8 12 4.5 15 8M9 16l3 3.5 3-3.5" />
  </Base>
);

export const RotateIcon = (props) => (
  <Base {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 9.5a7.5 7.5 0 1 1-1 5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5.5v4h4" />
  </Base>
);

export const WaveIcon = (props) => (
  <Base {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2 12q2.5-6 5 0t5 0 5 0 5 0" />
  </Base>
);

export const MoveIcon = (props) => (
  <Base {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l3-3 3 3M9 18l3 3 3-3M6 9l-3 3 3 3M18 9l3 3-3 3" />
  </Base>
);

export const SlidersIcon = (props) => (
  <Base {...props}>
    <path strokeLinecap="round" d="M4 7h6M14 7h6M4 12h10M18 12h2M4 17h4M12 17h8" />
    <circle cx="12" cy="7" r="1.75" fill="currentColor" stroke="none" />
    <circle cx="16" cy="12" r="1.75" fill="currentColor" stroke="none" />
    <circle cx="10" cy="17" r="1.75" fill="currentColor" stroke="none" />
  </Base>
);

export const ScaleIcon = (props) => (
  <Base {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.5 15 5M9 3.5 3 5.5m6-2v17m6-15.5L21 5.5M9 3.5v17M6 21h6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5.5 1 10a2.5 2.5 0 0 0 5 0L4 5.5M21 5.5 19 10a2.5 2.5 0 0 0 5 0l-2-4.5" />
  </Base>
);

export const PercentIcon = (props) => (
  <Base {...props}>
    <circle cx="7" cy="7" r="2.25" strokeLinecap="round" />
    <circle cx="17" cy="17" r="2.25" strokeLinecap="round" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18" />
  </Base>
);

export const ShuffleIcon = (props) => (
  <Base {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h3.5L15 17.5H21M15 6.5h6M17.5 4l3.5 2.5-3.5 2.5M3 17h3.5L11 11" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 15l3.5 2.5-3.5 2.5" />
  </Base>
);
