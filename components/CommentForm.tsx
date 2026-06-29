"use client";

import { useActionState, useState } from "react";
import { postComment } from "@/app/actions";
import {
  COMMENT_HELP,
  COMMENT_LABEL,
  NAME_HELP,
  PROFESSION_HELP,
  PROFESSIONS
} from "@/lib/constants";

export function CommentForm({ submissionId }: { submissionId: string }) {
  const [state, formAction, pending] = useActionState(postComment, {
    ok: false,
    message: ""
  });
  const [profession, setProfession] = useState("");

  return (
    <form action={formAction} className="form-grid">
      <input type="hidden" name="submissionId" value={submissionId} />
      <label>
        {COMMENT_LABEL}
        <span className="hint">{COMMENT_HELP}</span>
        <textarea name="body" maxLength={200} required />
      </label>
      <label>
        氏名
        <span className="hint">{NAME_HELP}</span>
        <input name="commenterName" required />
      </label>
      <label>
        職種・立場
        <span className="hint">{PROFESSION_HELP}</span>
        <select
          name="profession"
          required
          value={profession}
          onChange={(event) => setProfession(event.target.value)}
        >
          <option value="">選択してください</option>
          {PROFESSIONS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      {profession === "その他" ? (
        <label>
          その他職種・立場
          <input name="professionOther" required />
        </label>
      ) : null}
      {state.message ? (
        <p className={state.ok ? "status-pill" : "notice"}>{state.message}</p>
      ) : null}
      <button className="button" type="submit" disabled={pending}>
        {pending ? "送信中..." : "コメントする"}
      </button>
    </form>
  );
}
