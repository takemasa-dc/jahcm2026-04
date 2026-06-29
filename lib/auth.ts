import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "board_admin_session";
const MAX_AGE_SECONDS = 60 * 60 * 12;

function getSecret() {
  return process.env.ADMIN_PASSWORD || "";
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export async function isAdminAuthenticated() {
  const secret = getSecret();
  if (!secret) {
    return false;
  }

  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE_NAME)?.value;
  if (!value) {
    return false;
  }

  const [timestamp, signature] = value.split(".");
  if (!timestamp || !signature) {
    return false;
  }

  const ageSeconds = (Date.now() - Number(timestamp)) / 1000;
  if (!Number.isFinite(ageSeconds) || ageSeconds < 0 || ageSeconds > MAX_AGE_SECONDS) {
    return false;
  }

  const expected = sign(timestamp);
  const expectedBuffer = Buffer.from(expected);
  const actualBuffer = Buffer.from(signature);
  return (
    expectedBuffer.length === actualBuffer.length &&
    timingSafeEqual(expectedBuffer, actualBuffer)
  );
}

export async function createAdminSession() {
  const timestamp = String(Date.now());
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, `${timestamp}.${sign(timestamp)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: MAX_AGE_SECONDS
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
