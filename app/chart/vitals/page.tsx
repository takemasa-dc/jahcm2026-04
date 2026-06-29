import { ChartSection, ChartShell } from "@/components/ChartShell";
import { VitalChart } from "@/components/VitalChart";

export default function ChartVitalsPage() {
  return (
    <ChartShell title="熱型表・バイタル">
      <ChartSection title="熱型表">
        <div className="chart-legend">
          <strong>凡例</strong>
          <span>RA＝室内気</span>
          <span>NC＝鼻カヌラ</span>
          <span>食事摂取量＝10段階評価</span>
          <span>主/副＝主食/副食</span>
        </div>
        <VitalChart />
      </ChartSection>
    </ChartShell>
  );
}
