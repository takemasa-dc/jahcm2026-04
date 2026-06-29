import Image from "next/image";
import { AdminLoginForm } from "@/components/AdminLoginForm";
import { SiteHeader } from "@/components/SiteHeader";
import {
  hideComment,
  hideSubmission,
  logoutAdmin,
  removeComment,
  removeSubmission,
  showComment,
  showSubmission
} from "@/app/actions";
import { isAdminAuthenticated } from "@/lib/auth";
import { getAdminData } from "@/lib/db";

export const dynamic = "force-dynamic";

function AdminButton({
  action,
  id,
  children,
  danger = false
}: {
  action: (formData: FormData) => Promise<void>;
  id: string;
  children: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <button className={danger ? "danger-button" : "ghost-button"} type="submit">
        {children}
      </button>
    </form>
  );
}

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return (
      <main className="page">
        <div className="shell stack">
          <SiteHeader compact />
          <AdminLoginForm />
        </div>
      </main>
    );
  }

  let data;
  try {
    data = await getAdminData();
  } catch (error) {
    return (
      <main className="page">
        <div className="shell stack">
          <SiteHeader compact />
          <section className="section-panel stack">
            <h1>管理画面</h1>
            <p className="notice">
              POSTGRES_URL が未設定，または接続先にアクセスできません。
            </p>
            <p className="hint">
              {error instanceof Error ? error.message : "Unknown error"}
            </p>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="shell stack">
        <SiteHeader compact />
        <section className="section-panel stack">
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <div>
              <p className="eyebrow">管理者ページ</p>
              <h1>管理画面</h1>
            </div>
            <form action={logoutAdmin}>
              <button className="ghost-button" type="submit">
                ログアウト
              </button>
            </form>
          </div>

          <section className="stack">
            <h2>提出された成果物</h2>
            <div className="admin-list">
              {data.submissions.length > 0 ? (
                data.submissions.map((submission) => (
                  <article className="admin-card" key={submission.id}>
                    <span className="status-pill">
                      グループ{submission.group_number}
                    </span>
                    <p className="muted">
                      {new Date(submission.created_at).toLocaleString("ja-JP")}
                      {submission.is_hidden ? " / 非表示" : ""}
                    </p>
                    <div style={{ maxWidth: 280, marginTop: 10 }}>
                      <Image
                        src={submission.image_url}
                        alt={`グループ${submission.group_number}の提出写真`}
                        width={560}
                        height={420}
                        sizes="280px"
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: 8
                        }}
                      />
                    </div>
                    {submission.note ? <p>{submission.note}</p> : null}
                    <div className="admin-actions">
                      {submission.is_hidden ? (
                        <AdminButton action={showSubmission} id={submission.id}>
                          表示に戻す
                        </AdminButton>
                      ) : (
                        <AdminButton action={hideSubmission} id={submission.id}>
                          非表示にする
                        </AdminButton>
                      )}
                      <AdminButton action={removeSubmission} id={submission.id} danger>
                        削除
                      </AdminButton>
                    </div>
                  </article>
                ))
              ) : (
                <p className="muted">提出はまだありません。</p>
              )}
            </div>
          </section>

          <section className="stack">
            <h2>コメント一覧</h2>
            <div className="admin-list">
              {data.comments.length > 0 ? (
                data.comments.map((comment) => (
                  <article className="admin-card" key={comment.id}>
                    <p>
                      <strong>{comment.commenter_name}</strong> /{" "}
                      {comment.profession === "その他"
                        ? comment.profession_other || "その他"
                        : comment.profession}
                    </p>
                    <p>{comment.body}</p>
                    <p className="muted">
                      {new Date(comment.created_at).toLocaleString("ja-JP")}
                      {comment.is_hidden ? " / 非表示" : ""}
                    </p>
                    <div className="admin-actions">
                      {comment.is_hidden ? (
                        <AdminButton action={showComment} id={comment.id}>
                          表示に戻す
                        </AdminButton>
                      ) : (
                        <AdminButton action={hideComment} id={comment.id}>
                          非表示にする
                        </AdminButton>
                      )}
                      <AdminButton action={removeComment} id={comment.id} danger>
                        削除
                      </AdminButton>
                    </div>
                  </article>
                ))
              ) : (
                <p className="muted">コメントはまだありません。</p>
              )}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
