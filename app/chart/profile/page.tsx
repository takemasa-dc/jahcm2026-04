import { ChartSection, ChartShell, KeyValueGrid } from "@/components/ChartShell";
import { admissionHistory, adlRows, iadlRows, profileRows } from "@/lib/chart-data";

export default function ChartProfilePage() {
  return (
    <ChartShell title="基本情報">
      <ChartSection title="患者基本情報">
        <KeyValueGrid rows={profileRows} />
      </ChartSection>

      <ChartSection title="ADL">
        <KeyValueGrid rows={adlRows} />
      </ChartSection>

      <ChartSection title="IADL">
        <KeyValueGrid rows={iadlRows} />
      </ChartSection>

      <ChartSection title="入院までの経緯">
        <div className="chart-paragraphs">
          {admissionHistory.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </ChartSection>

      <ChartSection title="現在の予定">
        <p>現在，2026年7月4日 13:30の退院前カンファレンスで在宅移行方針を検討予定。</p>
      </ChartSection>
    </ChartShell>
  );
}
