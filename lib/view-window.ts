import { DEFAULT_VIEW_UNTIL } from "@/lib/constants";

export function getViewUntil() {
  return new Date(process.env.VIEW_UNTIL || DEFAULT_VIEW_UNTIL);
}

export function isViewOpen(now = new Date()) {
  const viewUntil = getViewUntil();
  return Number.isFinite(viewUntil.getTime()) && now <= viewUntil;
}
