const marathonRouteSvgs = import.meta.glob("./svgs/*.svg", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

export type RouteAsset = { id: string; d: string };

function extractPathData(raw: string): string | null {
  const match = raw.match(/<path[^>]*\sd="([^"]+)"[^>]*\/?>/i);
  return match?.[1] ?? null;
}

function isRouteAsset(asset: RouteAsset | null): asset is RouteAsset {
  return Boolean(asset);
}

export const ROUTE_ASSETS: RouteAsset[] = Object.entries(marathonRouteSvgs)
  .map(([path, raw]) => {
    const fileName = path.split("/").pop() ?? path;
    const id = fileName.replace(/\.svg$/i, "");
    const d = extractPathData(raw);
    if (!d) return null;
    return { id, d };
  })
  .filter(isRouteAsset)
  .sort((a, b) => a.id.localeCompare(b.id));

