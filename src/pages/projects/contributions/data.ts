import { contributionApiUrl, parseContributionData } from "./activity";

export type Data = ReturnType<typeof parseContributionData> | null;

export async function data(): Promise<Data> {
  try {
    const currentYear = new Date().getUTCFullYear();
    const response = await fetch(`${contributionApiUrl}?y=${currentYear}`, {
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return null;
    return parseContributionData(await response.json());
  } catch {
    // Client-side loading remains available when the build-time API request fails.
    return null;
  }
}
