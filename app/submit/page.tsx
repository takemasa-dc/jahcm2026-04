import { SiteHeader } from "@/components/SiteHeader";
import { SubmitForm } from "@/components/SubmitForm";

export default function SubmitPage() {
  return (
    <main className="page">
      <div className="shell stack">
        <SiteHeader compact />
        <section className="section-panel stack">
          <div>
            <p className="eyebrow">グループ代表者用</p>
            <h2>成果物を提出する</h2>
          </div>
          <SubmitForm />
        </section>
      </div>
    </main>
  );
}
