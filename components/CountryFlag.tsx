import type { ReactNode } from "react";
import type { FlagCode } from "@/lib/content";

const flags: Record<FlagCode, ReactNode> = {
  gy: (
    <svg viewBox="0 0 30 20" aria-hidden="true">
      <rect width="30" height="20" fill="#009e49" />
      <polygon points="0,0 30,10 0,20" fill="#fff" />
      <polygon points="0,0.7 27.4,10 0,19.3" fill="#fcd116" />
      <polygon points="0,0 14.2,10 0,20" fill="#231f20" />
      <polygon points="0,1.15 11.6,10 0,18.85" fill="#ce1126" />
    </svg>
  ),
  tt: (
    <svg viewBox="0 0 30 18" aria-hidden="true">
      <rect width="30" height="18" fill="#ce1126" />
      <polygon points="-3,18 8.2,18 33,0 21.8,0" fill="#fff" />
      <polygon points="-1.2,18 6.4,18 31.2,0 23.6,0" fill="#231f20" />
    </svg>
  ),
  ps: (
    <svg viewBox="0 0 30 20" aria-hidden="true">
      <rect width="30" height="20" fill="#fff" />
      <rect width="30" height="6.67" fill="#231f20" />
      <rect y="13.33" width="30" height="6.67" fill="#007a3d" />
      <polygon points="0,0 12,10 0,20" fill="#ce1126" />
    </svg>
  ),
};

export function CountryFlag({ code, name }: { code: FlagCode; name: string }) {
  return (
    <span className="country-flag" role="img" aria-label={name}>
      {flags[code]}
    </span>
  );
}
