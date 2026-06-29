import Link from "next/link";
import { ChartSection, ChartShell, KeyValueGrid } from "@/components/ChartShell";
import { VitalChart } from "@/components/VitalChart";
import { chartNavItems, chartPatient, patientSummary } from "@/lib/chart-data";

export default function ChartTopPage() {
  return (
    <ChartShell title="架空カルテ：佐藤 由紀さん">
      <ChartSection title="患者サマリー">
        <KeyValueGrid rows={patientSummary} />
      </ChartSection>

      <ChartSection title="熱型表">
        <VitalChart />
      </ChartSection>

      <section className="chart-link-grid" aria-label="カルテページ">
        {chartNavItems.map((item) => (
          <Link className="chart-link-card" href={item.href} key={item.href}>
            <strong>{item.label}</strong>
            <span>{item.description}</span>
          </Link>
        ))}
      </section>

      <p className="chart-alert">
        {chartPatient.hospital}・{chartPatient.ward}・{chartPatient.department}。
        退院前カンファレンスで使用する架空カルテです。
      </p>
    </ChartShell>
  );
}
