import Cookies from "js-cookie";

// Cookie key used to persist the selected clinic across requests and reloads
const NAME = "selectedClinic";
const ONE_YEAR = 60 * 60 * 24 * 365;

export type SelectedClinic = { id: string; nome: string; role: string };

// ---------- Server ----------
// Helper for Server Components / Middleware
// Accepts an explicit cookie store so it can be called both in RSCs
// (passing the `cookies()` store) and in Middleware (receiving `request.cookies`).
// Type for cookie stores that have a get method
type CookieStore = {
  get(name: string): { value: string } | undefined;
};

export async function getClinicServer(c?: CookieStore): Promise<SelectedClinic | null> {
  // If a cookie store is explicitly provided (e.g. cookies() from next/headers or request.cookies),
  // we can read synchronously.
  if (c) {
    const raw = c.get(NAME)?.value;
    if (!raw) return null;
    try {
      return JSON.parse(decodeURIComponent(raw)) as SelectedClinic;
    } catch {
      return null;
    }
  }

  // Fallback: dynamically import next/headers for server usage without
  // triggering client-side bundle issues.
  const { cookies } = await import("next/headers");
  const store = await cookies();
  const raw2 = store.get(NAME)?.value;
  if (!raw2) return null;
  try {
    return JSON.parse(decodeURIComponent(raw2)) as SelectedClinic;
  } catch {
    return null;
  }
}

export async function setClinicServer(value: SelectedClinic | null) {
  if (typeof window !== "undefined") {
    throw new Error("setClinicServer can only be used on the server side");
  }

  const { cookies } = await import("next/headers");
  const store = await cookies();
  if (!value) {
    store.set(NAME, "", { maxAge: 0, path: "/" });
    return;
  }
  store.set(NAME, encodeURIComponent(JSON.stringify(value)), {
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: ONE_YEAR,
  });
}

// ---------- Client ----------
export function getClinicClient(): SelectedClinic | null {
  if (typeof window === "undefined") {
    throw new Error("getClinicClient can only be used on the client side");
  }

  const raw = Cookies.get(NAME);
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw));
  } catch {
    Cookies.remove(NAME);
    return null;
  }
}

export function setClinicClient(value: SelectedClinic | null) {
  if (typeof window === "undefined") {
    throw new Error("setClinicClient can only be used on the client side");
  }

  if (!value) {
    Cookies.remove(NAME);
    return;
  }
  Cookies.set(NAME, encodeURIComponent(JSON.stringify(value)), { path: "/", sameSite: "lax", secure: true });
}

// ---------- Helper ----------
export const removeClinic = () => setClinicClient(null);
