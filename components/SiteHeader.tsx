import Link from "next/link";
import { APP_NAME, CONFERENCE, ORGANIZER, SUBTITLE } from "@/lib/constants";

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <header className="site-header">
        <div className="site-header-main">
          <h1>{APP_NAME}</h1>
          <span>{CONFERENCE}</span>
          <span>{SUBTITLE}</span>
          <span>{ORGANIZER}</span>
        </div>
        <Link className="ghost-button top-return-button" href="/">
          トップに戻る
        </Link>
      </header>
    );
  }

  return (
    <header className="header-meta">
      <span>{CONFERENCE}</span>
      <span>{SUBTITLE}</span>
      <span>{ORGANIZER}</span>
    </header>
  );
}
