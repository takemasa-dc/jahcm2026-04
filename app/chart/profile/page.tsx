import { ChartSection, ChartShell, KeyValueGrid } from "@/components/ChartShell";
import { profileSections } from "@/lib/chart-data";

export default function ChartProfilePage() {
  return (
    <ChartShell title="基本情報">
      {profileSections.map((section) => (
        <ChartSection title={section.title} key={section.title}>
          {"rows" in section ? (
            <KeyValueGrid rows={section.rows} />
          ) : (
            <ul className="chart-list">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </ChartSection>
      ))}
    </ChartShell>
  );
}
