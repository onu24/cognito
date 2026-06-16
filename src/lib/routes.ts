export const routes = {
  home: "/",
  services: "/services",
  portfolio: "/portfolio",
  clients: "/clients",
  contact: "/contact",
} as const;

export type PageKey = keyof typeof routes;

export function getPageKeyFromPath(pathname: string): PageKey {
  if (pathname === "/") return "home";
  const segment = pathname.replace(/^\//, "").split("/")[0];
  if (segment in routes) return segment as PageKey;
  return "home";
}
