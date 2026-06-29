"use client";

import { useActionState } from "react";
import { loginAdmin } from "@/app/actions";

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(loginAdmin, {
    ok: false,
    message: ""
  });

  return (
    <form action={formAction} className="section-panel form-grid">
      <h1>管理者ログイン</h1>
      <label>
        パスワード
        <input name="password" type="password" autoComplete="current-password" required />
      </label>
      {state.message ? <p className="notice">{state.message}</p> : null}
      <button className="button" type="submit" disabled={pending}>
        {pending ? "確認中..." : "ログイン"}
      </button>
    </form>
  );
}
