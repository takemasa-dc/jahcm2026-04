import { ChartShell, ConferenceRecord, SoapNote } from "@/components/ChartShell";
import { nursingNotes } from "@/lib/chart-data";

export default function ChartNursingNotesPage() {
  return (
    <ChartShell title="看護記録">
      <section className="record-stack">
        {nursingNotes.map((note) =>
          "conference" in note ? (
            <ConferenceRecord
              key={note.title}
              title={note.title}
              members={note.conference.members}
              record={note.conference.record}
              plan={note.conference.plan}
            />
          ) : (
            <SoapNote key={note.title} title={note.title} soap={note.soap} />
          )
        )}
      </section>
    </ChartShell>
  );
}
