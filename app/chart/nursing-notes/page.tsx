import { ChartShell, SoapNote } from "@/components/ChartShell";
import { nursingNotes } from "@/lib/chart-data";

export default function ChartNursingNotesPage() {
  return (
    <ChartShell title="看護記録">
      <section className="record-stack">
        {nursingNotes.map((note) => (
          <SoapNote key={note.title} title={note.title} soap={note.soap} />
        ))}
      </section>
    </ChartShell>
  );
}
