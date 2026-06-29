"use client";

import { useFormStatus } from "react-dom";
import { submitWork } from "@/app/actions";
import { GROUPS, SUBMIT_NOTICE } from "@/lib/constants";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="button" type="submit" disabled={pending}>
      {pending ? (
        <>
          <span className="spinner" aria-hidden="true" />
          送信中...
        </>
      ) : (
        "送信する"
      )}
    </button>
  );
}

export function SubmitForm() {
  return (
    <>
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
          <span className="hint">
            写真は2枚まで選択できます。1枚ずつ追加する場合は，同じグループ番号で再度送信してください。
          </span>
          <input
            name="images"
            type="file"
            accept="image/jpeg,image/png,image/heic,image/heif"
            multiple
            required
          />
        </label>
        <SubmitButton />
      </form>
    </>
  );
}
