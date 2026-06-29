import Image from "next/image";
import { CommentForm } from "@/components/CommentForm";
import { ImageDialog } from "@/components/ImageDialog";
import { SiteHeader } from "@/components/SiteHeader";
import { BOARD_VIEW_NOTICE, CLOSED_MESSAGE, GROUPS } from "@/lib/constants";
import { getBoardGroups } from "@/lib/db";
import { isViewOpen } from "@/lib/view-window";

export const dynamic = "force-dynamic";

export default async function BoardPage() {
  if (!isViewOpen()) {
    return (
      <main className="page">
        <div className="shell stack">
          <SiteHeader compact />
          <section className="section-panel">
            <h2>{CLOSED_MESSAGE}</h2>
          </section>
        </div>
      </main>
    );
  }

  let groups;
  try {
    groups = await getBoardGroups(GROUPS);
  } catch (error) {
    return (
      <main className="page">
        <div className="shell stack">
          <SiteHeader compact />
          <section className="section-panel stack">
            <h2>データベース接続を確認してください</h2>
            <p className="muted">
              POSTGRES_URL が未設定，または接続先にアクセスできません。Vercel の
              Environment Variables を確認してください。
            </p>
            <p className="hint">
              {error instanceof Error ? error.message : "Unknown error"}
            </p>
          </section>
        </div>
      </main>
    );
  }
  const submittedGroups = groups.filter(({ submission }) => Boolean(submission));

  return (
    <main className="page">
      <div className="shell stack">
        <SiteHeader compact />
        <section className="stack">
          <div>
            <p className="eyebrow">閲覧・コメントページ</p>
            <h2>各グループの成果物</h2>
          </div>
          <p className="notice">{BOARD_VIEW_NOTICE}</p>
          {submittedGroups.length > 0 ? (
            <div className="board-grid">
              {submittedGroups.map(({ groupNumber, submission, comments }) => {
                if (!submission) {
                  return null;
                }

                return (
                  <article className="group-card" key={groupNumber}>
                    <div>
                      <span className="status-pill">グループ{groupNumber}</span>
                      <h3 style={{ marginTop: 8 }}>提出済み</h3>
                    </div>

                    <div className="photo-strip">
                      {[submission.image_url, submission.image_url_2]
                        .filter((imageUrl): imageUrl is string => Boolean(imageUrl))
                        .map((imageUrl, index) => (
                          <ImageDialog
                            key={imageUrl}
                            src={imageUrl}
                            alt={`グループ${groupNumber}の成果物写真${index + 1}`}
                          >
                            <Image
                              src={imageUrl}
                              alt={`グループ${groupNumber}の成果物写真${index + 1}`}
                              width={960}
                              height={720}
                              sizes="(max-width: 760px) 100vw, 960px"
                            />
                          </ImageDialog>
                        ))}
                    </div>
                    {submission.note ? <p>{submission.note}</p> : null}

                    <section className="comments">
                      <h3>コメント</h3>
                      {comments.length > 0 ? (
                        comments.map((comment) => (
                          <div className="comment" key={comment.id}>
                            <small>
                              {comment.profession === "その他"
                                ? comment.profession_other || "その他"
                                : comment.profession}
                            </small>
                            <p>{comment.body}</p>
                          </div>
                        ))
                      ) : (
                        <p className="muted">まだコメントはありません。</p>
                      )}
                    </section>
                    <CommentForm submissionId={submission.id} />
                  </article>
                );
              })}
            </div>
          ) : (
            <section className="section-panel">
              <p className="muted">まだ提出された成果物はありません。</p>
            </section>
          )}
        </section>
      </div>
    </main>
  );
}
