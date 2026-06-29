import Link from "next/link";
import { APP_NAME, CONFERENCE, ORGANIZER, SUBTITLE, TOP_DESCRIPTION } from "@/lib/constants";

export default function HomePage() {
  return (
    <main className="page">
      <div className="shell hero">
        <section className="hero-panel">
          <div className="hero-band">
            <p className="eyebrow">{CONFERENCE}</p>
            <h1>{APP_NAME}</h1>
            <div className="header-meta" style={{ marginTop: 18 }}>
              <span>{SUBTITLE}</span>
              <span>{ORGANIZER}</span>
            </div>
            <p className="lead" style={{ marginTop: 22 }}>
              {TOP_DESCRIPTION}
            </p>
          </div>
          <div className="actions">
            <Link className="button" href="/submit">
              成果物を提出する
            </Link>
            <Link className="ghost-button" href="/board">
              成果物を見る
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
