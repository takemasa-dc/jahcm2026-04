import Link from "next/link";
import type { ReactNode } from "react";
import { chartNavItems, chartPatient, chartProgram, conferenceNotice } from "@/lib/chart-data";

export function ChartShell({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <main className="chart-page">
      <div className="chart-shell">
        <header className="chart-program">
          <div>
            <p className="eyebrow">{chartProgram.conference}</p>
            <h1>{title}</h1>
            <div className="header-meta" style={{ marginTop: 10 }}>
              <span>{chartProgram.subtitle}</span>
              <span>{chartProgram.organizer}</span>
            </div>
          </div>
          <Link className="ghost-button top-return-button" href="/">
            トップに戻る
          </Link>
        </header>

        <p className="chart-alert">{chartProgram.notice}</p>
        <p className="chart-alert chart-alert-blue">{conferenceNotice}</p>
        <PatientHeader />
        <ChartNav />
        {children}
      </div>
    </main>
  );
}

export function PatientHeader() {
  const items = [
    ["患者ID", chartPatient.id],
    ["氏名", chartPatient.name],
    ["年齢", chartPatient.age],
    ["性別", chartPatient.sex],
    ["病棟", chartPatient.ward],
    ["診療科", chartPatient.department],
    ["主病名", chartPatient.diagnosis],
    ["入院理由", chartPatient.admissionReason],
    ["食事", chartPatient.diet]
  ];

  return (
    <section className="patient-header" aria-label="共通患者ヘッダー">
      {items.map(([label, value]) => (
        <div className="patient-field" key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </section>
  );
}

export function ChartNav() {
  return (
    <nav className="chart-nav" aria-label="架空カルテナビゲーション">
      <Link href="/chart">トップ</Link>
      {chartNavItems.map((item) => (
        <Link href={item.href} key={item.href}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function ChartSection({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="chart-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function KeyValueGrid({ rows }: { rows: readonly (readonly string[])[] }) {
  return (
    <dl className="kv-grid">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ChartTable({
  headers,
  rows,
  minWidth = 760
}: {
  headers: readonly string[];
  rows: readonly (readonly string[])[];
  minWidth?: number;
}) {
  return (
    <div className="table-scroll" role="region" aria-label="横スクロール可能な表">
      <table className="chart-table" style={{ minWidth }}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("-")}>
              {row.map((cell, index) => (
                <td key={`${row[0]}-${index}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function LabTable({
  rows
}: {
  rows: readonly {
    item: string;
    range: string;
    first: string;
    latest: string;
    unit: string;
    firstFlag: "high" | "low" | "normal";
    latestFlag: "high" | "low" | "normal";
  }[];
}) {
  return (
    <div className="table-scroll" role="region" aria-label="検査データ表">
      <table className="chart-table lab-table" style={{ minWidth: 760 }}>
        <thead>
          <tr>
            <th>項目</th>
            <th>基準範囲</th>
            <th>2026/06/25</th>
            <th>2026/07/03</th>
            <th>単位</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.item}>
              <th scope="row">{row.item}</th>
              <td>{row.range}</td>
              <td className={`lab-value lab-${row.firstFlag}`}>{row.first}</td>
              <td className={`lab-value lab-${row.latestFlag}`}>{row.latest}</td>
              <td>{row.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SoapNote({
  title,
  soap,
  orders
}: {
  title: string;
  soap: { S: string; O: string; A: string; P: string };
  orders?: readonly string[];
}) {
  return (
    <article className="soap-note">
      <h3>{title}</h3>
      {(["S", "O", "A", "P"] as const).map((key) => (
        <div className="soap-row" key={key}>
          <span>{key}</span>
          <p>{soap[key]}</p>
        </div>
      ))}
      {orders ? (
        <div className="order-card">
          <strong>処方・指示</strong>
          <ul>
            {orders.map((order) => (
              <li key={order}>{order}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}

export function ConferenceRecord({
  title,
  members,
  record,
  plan
}: {
  title: string;
  members: string;
  record: string;
  plan: string;
}) {
  return (
    <article className="soap-note">
      <h3>{title}</h3>
      <div className="record-fields">
        <div>
          <strong>参加者</strong>
          <p>{members}</p>
        </div>
        <div>
          <strong>記録</strong>
          <p>{record}</p>
        </div>
        <div>
          <strong>方針</strong>
          <p>{plan}</p>
        </div>
      </div>
    </article>
  );
}
