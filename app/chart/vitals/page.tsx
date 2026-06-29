import { ChartSection, ChartShell, ChartTable } from "@/components/ChartShell";
import { nursingRemarks, vitals, vitalsHeaders } from "@/lib/chart-data";

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
        <p className="hint">表は横にスクロールできます。</p>
        <ChartTable headers={vitalsHeaders} rows={vitals} minWidth={920} />
      </ChartSection>

      <ChartSection title="看護備考">
        <ChartTable headers={["日時", "備考"]} rows={nursingRemarks} minWidth={680} />
      </ChartSection>
    </ChartShell>
  );
}
