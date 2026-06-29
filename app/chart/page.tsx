import Link from "next/link";
import {
  chartNavItems,
  chartPatient,
  patientSummary
} from "@/lib/chart-data";
import { ChartSection, ChartShell, KeyValueGrid } from "@/components/ChartShell";
import { VitalChart } from "@/components/VitalChart";

export default function ChartTopPage() {
  return (
    <ChartShell title="架空カルテ：佐藤由紀さん">
      <ChartSection title="患者サマリー">
        <KeyValueGrid rows={patientSummary} />
      </ChartSection>

      <ChartSection title="簡易熱型表">
        <p className="hint">カルテ形式の概要です。全体は熱型表ページで確認できます。</p>
        <VitalChart />
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
