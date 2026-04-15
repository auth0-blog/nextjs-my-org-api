import { MyOrganization } from "@auth0/myorganization-js";

// default colors for Organization's branding settings. 
export const PRIMARY_COLOR = '#0059d6';
export const PAGE_BACKGROUND_COLOR = '#000000';

// Helper to apply defaults for any missing colors when updating org settings.
export function applyColorDefaults(
  colors?: Partial<MyOrganization.OrgBrandingColors>
): MyOrganization.OrgBrandingColors | undefined {
  if (!colors) return undefined;
  const { primary, page_background } = colors;
  const hasPrimary = !!primary;
  const hasBackground = !!page_background;
  if (hasPrimary && !hasBackground) return { primary, page_background: PAGE_BACKGROUND_COLOR };
  if (!hasPrimary && hasBackground) return { primary: PRIMARY_COLOR, page_background };
  if (hasPrimary && hasBackground) return { primary, page_background };
  return undefined; // neither set — caller should omit colors entirely
}

// Helper to prune empty values from an object recursively.
export function pruneEmpty<T extends object>(obj: T): T | undefined {
  const result = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Object.entries(obj).flatMap(([k, v]): [string, any][] => {
      if (v === undefined || v === null || v === '') return [];
      if (typeof v === 'object' && !Array.isArray(v)) {
        const pruned = pruneEmpty(v);
        return pruned !== undefined ? [[k, pruned]] : [];
      }
      return [[k, v]];
    })
  );
  return Object.keys(result).length > 0 ? (result as T) : undefined;
}
