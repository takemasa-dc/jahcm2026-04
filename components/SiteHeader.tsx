import { APP_NAME, CONFERENCE, ORGANIZER, SUBTITLE } from "@/lib/constants";

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  return (
    <header className={compact ? "site-header" : "header-meta"}>
      {compact ? <h1>{APP_NAME}</h1> : null}
      <span>{CONFERENCE}</span>
      <span>{SUBTITLE}</span>
      <span>{ORGANIZER}</span>
    </header>
  );
}
