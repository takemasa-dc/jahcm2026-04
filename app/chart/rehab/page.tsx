import { ChartSection, ChartShell } from "@/components/ChartShell";
import { rehabSections } from "@/lib/chart-data";

export default function ChartRehabPage() {
  return (
    <ChartShell title="リハ記録">
      {rehabSections.map((section) => (
        <ChartSection title={section.title} key={section.title}>
          <div className="record-fields">
            {section.fields.map(([label, body]) => (
              <div key={label}>
                <strong>{label}</strong>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </ChartSection>
      ))}
    </ChartShell>
  );
}
