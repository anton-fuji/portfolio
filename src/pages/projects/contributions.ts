import { getSocialUrl } from "../../mydata/data";

export type Contribution = {
  date: string;
  count: number;
  level: number;
};

export type ContributionData = {
  contributions: Contribution[];
  years: number[];
};

const githubUsername = new URL(getSocialUrl("GitHub")).pathname.replace(/^\/+|\/+$/g, "");
export const contributionApiUrl = `https://github-contributions-api.jogruber.de/v4/${githubUsername}`;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isContribution = (value: unknown): value is Contribution => {
  if (!isRecord(value)) return false;

  return (
    typeof value.date === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(value.date) &&
    typeof value.count === "number" &&
    Number.isInteger(value.count) &&
    typeof value.level === "number" &&
    Number.isInteger(value.level) &&
    value.level >= 0 &&
    value.level <= 4
  );
};

export function parseContributionData(payload: unknown): ContributionData {
  if (!isRecord(payload) || !Array.isArray(payload.contributions)) {
    throw new Error("Contribution response was not valid");
  }

  const contributions = payload.contributions.filter(isContribution);
  if (contributions.length === 0) {
    throw new Error("Contribution response was empty");
  }

  const currentYear = new Date().getUTCFullYear();
  const availableYears = new Set<number>([currentYear]);

  if (isRecord(payload.total)) {
    for (const year of Object.keys(payload.total)) {
      if (/^\d{4}$/.test(year)) {
        availableYears.add(Number(year));
      }
    }
  }

  for (const contribution of contributions) {
    availableYears.add(Number(contribution.date.slice(0, 4)));
  }

  return {
    contributions,
    years: [...availableYears].filter((year) => year <= currentYear).sort((a, b) => b - a),
  };
}
