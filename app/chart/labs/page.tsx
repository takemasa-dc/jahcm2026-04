import { ChartSection, ChartShell, LabTable } from "@/components/ChartShell";
import { labs } from "@/lib/chart-data";

export default function ChartLabsPage() {
  return (
    <ChartShell title="検査データ">
      <ChartSection title="採血データ">
        <p className="hint">高値は赤，低値は青で表示しています。</p>
        <LabTable rows={labs} />
      </ChartSection>
    </ChartShell>
  );
}
