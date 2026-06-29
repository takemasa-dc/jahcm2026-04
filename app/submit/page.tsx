import { submitWork } from "@/app/actions";
import { SiteHeader } from "@/components/SiteHeader";
import { GROUPS, SUBMIT_NOTICE } from "@/lib/constants";

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
          <p className="notice">{SUBMIT_NOTICE}</p>
          <form action={submitWork} className="form-grid">
            <label>
              グループ番号
              <select name="groupNumber" required defaultValue="">
                <option value="" disabled>
                  選択してください
                </option>
                {GROUPS.map((group) => (
                  <option key={group} value={group}>
                    グループ{group}
                  </option>
                ))}
              </select>
            </label>
            <label>
              成果物写真アップロード
              <span className="hint">写真は2枚まで選択できます。</span>
              <input
                name="images"
                type="file"
                accept="image/jpeg,image/png,image/heic,image/heif"
                multiple
                required
              />
            </label>
            <label>
              補足メモ
              <textarea name="note" />
            </label>
            <button className="button" type="submit">
              送信する
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
