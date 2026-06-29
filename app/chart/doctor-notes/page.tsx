import { ChartShell, SoapNote } from "@/components/ChartShell";
import { doctorNotes } from "@/lib/chart-data";

export default function ChartDoctorNotesPage() {
  return (
    <ChartShell title="医師記録">
      <section className="record-stack">
        {doctorNotes.map((note) => (
          <SoapNote key={note.title} title={note.title} soap={note.soap} />
        ))}
      </section>
    </ChartShell>
  );
}
