import { ChartSection, ChartShell, ChartTable } from "@/components/ChartShell";
import { labs } from "@/lib/chart-data";

export default function ChartLabsPage() {
  return (
    <ChartShell title="検査データ">
      <ChartSection title="採血データ">
        <p className="hint">入院時：2026/06/25　直近：2026/07/03（入院9日目）</p>
        <ChartTable
          headers={["項目", "入院時", "直近", "単位", "備考"]}
          rows={labs}
          minWidth={720}
        />
        <p className="chart-small-note">
          炎症反応は改善傾向。食事摂取量とAlb低値には注意が必要。
        </p>
      </ChartSection>
    </ChartShell>
  );
}
