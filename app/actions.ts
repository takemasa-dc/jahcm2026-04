"use server";

import { put } from "@vercel/blob";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearAdminSession,
  createAdminSession,
  isAdminAuthenticated
} from "@/lib/auth";
import {
  createComment,
  createSubmission,
  deleteComment,
  deleteSubmission,
  setCommentHidden,
  setSubmissionHidden
} from "@/lib/db";
import { GROUPS, PROFESSIONS } from "@/lib/constants";

type ActionState = {
  ok: boolean;
  message: string;
};

const SUBMIT_RATE_COOKIE = "board_submit_at";
const COMMENT_RATE_COOKIE = "board_comment_at";

function cleanText(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

async function assertRateLimit(cookieName: string, seconds: number) {
  const cookieStore = await cookies();
  const last = Number(cookieStore.get(cookieName)?.value || 0);
  if (last && Date.now() - last < seconds * 1000) {
    throw new Error(`短時間での連続投稿はできません。${seconds}秒ほど待ってからお試しください。`);
  }
  cookieStore.set(cookieName, String(Date.now()), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: seconds
  });
}

export async function submitWork(formData: FormData) {
  await assertRateLimit(SUBMIT_RATE_COOKIE, 20);

  const groupNumber = Number(cleanText(formData.get("groupNumber")));
  if (!GROUPS.includes(groupNumber as (typeof GROUPS)[number])) {
    throw new Error("グループ番号を選択してください。");
  }

  const image = formData.get("image");
  if (!(image instanceof File) || image.size === 0) {
    throw new Error("成果物写真を選択してください。");
  }

  if (!["image/jpeg", "image/png", "image/heic", "image/heif"].includes(image.type)) {
    throw new Error("JPEG，PNG，HEIC形式の画像を選択してください。");
  }

  const extension = image.name.split(".").pop()?.toLowerCase() || "jpg";
  const blob = await put(
    `submissions/group-${groupNumber}-${Date.now()}.${extension}`,
    image,
    {
      access: "public",
      addRandomSuffix: true
    }
  );

  await createSubmission({
    groupNumber,
    imageUrl: blob.url,
    note: cleanText(formData.get("note"))
  });

  revalidatePath("/board");
  redirect("/board");
}

export async function postComment(
  _previousState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    await assertRateLimit(COMMENT_RATE_COOKIE, 8);

    const submissionId = cleanText(formData.get("submissionId"));
    const commenterName = cleanText(formData.get("commenterName"));
    const profession = cleanText(formData.get("profession"));
    const professionOther = cleanText(formData.get("professionOther"));
    const body = cleanText(formData.get("body"));

    if (!submissionId || !commenterName || !profession || !body) {
      return { ok: false, message: "必須項目を入力してください。" };
    }
    if (!PROFESSIONS.includes(profession as (typeof PROFESSIONS)[number])) {
      return { ok: false, message: "職種・立場を選択してください。" };
    }
    if (profession === "その他" && !professionOther) {
      return { ok: false, message: "その他職種・立場を入力してください。" };
    }
    if (body.length > 200) {
      return { ok: false, message: "コメントは200字以内で入力してください。" };
    }

    await createComment({
      submissionId,
      commenterName,
      profession,
      professionOther,
      body
    });
    revalidatePath("/board");
    return { ok: true, message: "コメントを投稿しました。" };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "投稿に失敗しました。"
    };
  }
}

export async function loginAdmin(
  _previousState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const password = cleanText(formData.get("password"));
  const expected = process.env.ADMIN_PASSWORD || "";

  if (!expected) {
    return {
      ok: false,
      message: "ADMIN_PASSWORD が未設定です。環境変数を設定してください。"
    };
  }
  if (password !== expected) {
    return { ok: false, message: "パスワードが正しくありません。" };
  }

  await createAdminSession();
  revalidatePath("/admin");
  redirect("/admin");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin");
}

async function assertAdmin() {
  if (!(await isAdminAuthenticated())) {
    throw new Error("管理者認証が必要です。");
  }
}

export async function hideSubmission(formData: FormData) {
  await assertAdmin();
  await setSubmissionHidden(cleanText(formData.get("id")), true);
  revalidatePath("/admin");
  revalidatePath("/board");
}

export async function showSubmission(formData: FormData) {
  await assertAdmin();
  await setSubmissionHidden(cleanText(formData.get("id")), false);
  revalidatePath("/admin");
  revalidatePath("/board");
}

export async function removeSubmission(formData: FormData) {
  await assertAdmin();
  await deleteSubmission(cleanText(formData.get("id")));
  revalidatePath("/admin");
  revalidatePath("/board");
}

export async function hideComment(formData: FormData) {
  await assertAdmin();
  await setCommentHidden(cleanText(formData.get("id")), true);
  revalidatePath("/admin");
  revalidatePath("/board");
}

export async function showComment(formData: FormData) {
  await assertAdmin();
  await setCommentHidden(cleanText(formData.get("id")), false);
  revalidatePath("/admin");
  revalidatePath("/board");
}

export async function removeComment(formData: FormData) {
  await assertAdmin();
  await deleteComment(cleanText(formData.get("id")));
  revalidatePath("/admin");
  revalidatePath("/board");
}
