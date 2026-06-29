import Link from "next/link";
import {
  chartNavItems,
  chartPatient,
  patientSummary,
  vitals,
  vitalsHeaders
} from "@/lib/chart-data";
import { ChartSection, ChartShell, ChartTable, KeyValueGrid } from "@/components/ChartShell";

export default function ChartTopPage() {
  return (
    <ChartShell title="架空カルテ：佐藤由紀さん">
      <ChartSection title="患者サマリー">
        <KeyValueGrid rows={patientSummary} />
      </ChartSection>

      <ChartSection title="簡易熱型表">
        <p className="hint">直近5日分を表示しています。全期間は熱型表ページで確認できます。</p>
        <ChartTable headers={vitalsHeaders} rows={vitals.slice(-5)} />
      </ChartSection>

      <section className="chart-link-grid" aria-label="カルテ内ページ">
        {chartNavItems.map((item) => (
          <Link className="chart-link-card" href={item.href} key={item.href}>
            <strong>{item.label}</strong>
            <span>{item.description}</span>
          </Link>
        ))}
      </section>

      <p className="chart-alert">
        {chartPatient.hospital}・{chartPatient.ward}・{chartPatient.department}。
        カンファレンス時点は{chartPatient.conferencePoint}です。
      </p>
    </ChartShell>
  );
}
