import { ChartSection, ChartShell } from "@/components/ChartShell";
import { VitalChart } from "@/components/VitalChart";

export default function ChartVitalsPage() {
  return (
    <ChartShell title="熱型表">
      <ChartSection title="熱型表">
        <div className="chart-legend">
          <strong>凡例</strong>
          <span>BT：体温</span>
          <span>HR：脈拍</span>
          <span>SYS/DIA：収縮期/拡張期血圧</span>
          <span>RA：室内気</span>
          <span>NC：鼻カヌラ</span>
          <span>食事摂取量：10段階評価，主食/副食</span>
        </div>
        <VitalChart />
      </ChartSection>
    </ChartShell>
  );
}
