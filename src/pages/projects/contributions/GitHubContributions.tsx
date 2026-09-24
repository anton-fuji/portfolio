import { useEffect, useState } from "react";

import { useTranslation } from "../../../i18n";
import {
  contributionApiUrl,
  parseContributionData,
  type Contribution,
  type ContributionData,
} from "./activity";

type CalendarDay = Contribution & {
  dateValue: Date;
  isInYear: boolean;
};

type CalendarWeek = CalendarDay[];

type ActivityData =
  | { status: "loading" }
  | ({ status: "ready" } & ContributionData)
  | { status: "error" };

type HoveredDay = {
  text: string;
  left: number;
  top: number;
  above: boolean;
};

const levelColors = [
  "bg-[#202126]",
  "bg-[#123960]",
  "bg-[#14588f]",
  "bg-[#1878c9]",
  "bg-[#58a9f7]",
];

function createCalendarWeeks(contributions: Contribution[], year: number): CalendarWeek[] {
  const januaryFirst = new Date(Date.UTC(year, 0, 1));
  const sundayOffset = januaryFirst.getUTCDay();
  const firstDay = new Date(januaryFirst);
  firstDay.setUTCDate(januaryFirst.getUTCDate() - sundayOffset);

  const decemberLast = new Date(Date.UTC(year, 11, 31));
  const weekCount = Math.floor((decemberLast.getTime() - firstDay.getTime()) / 604_800_000) + 1;
  const contributionsByDate = new Map(contributions.map((day) => [day.date, day]));

  return Array.from({ length: weekCount }, (_, weekIndex) =>
    Array.from({ length: 7 }, (_, dayIndex) => {
      const dateValue = new Date(firstDay);
      dateValue.setUTCDate(firstDay.getUTCDate() + weekIndex * 7 + dayIndex);
      const date = dateValue.toISOString().slice(0, 10);
      const isInYear = dateValue.getUTCFullYear() === year;
      const contribution = isInYear ? contributionsByDate.get(date) : undefined;

      return {
        date,
        dateValue,
        count: contribution?.count ?? 0,
        level: contribution?.level ?? 0,
        isInYear,
      };
    }),
  );
}

function GitHubContributions({ initialData }: { initialData: ContributionData | null }) {
  const { t } = useTranslation();
  const [activityData, setActivityData] = useState<ActivityData>(() =>
    initialData ? { status: "ready", ...initialData } : { status: "loading" },
  );
  const [selectedYear, setSelectedYear] = useState(
    () => initialData?.years[0] ?? new Date().getUTCFullYear(),
  );
  const [hoveredDay, setHoveredDay] = useState<HoveredDay | null>(null);
  const currentYear = new Date().getUTCFullYear();
  const years = activityData.status === "ready" ? activityData.years : [selectedYear];
  const contributions = activityData.status === "ready" ? activityData.contributions : [];
  const weeks = createCalendarWeeks(contributions, selectedYear);
  const weekdays = ["", "Mon", "", "Wed", "", "Fri", ""];
  const gridStyle = { gridTemplateColumns: `2.5rem repeat(${weeks.length}, 0.75rem)` };
  const contributionCount = contributions.reduce(
    (total, contribution) =>
      contribution.date.startsWith(`${selectedYear}-`) ? total + contribution.count : total,
    0,
  );

  const showDayTooltip = (day: CalendarDay, target: HTMLSpanElement) => {
    const dayOfMonth = day.dateValue.getUTCDate();
    const lastTwoDigits = dayOfMonth % 100;
    const ordinal =
      lastTwoDigits >= 11 && lastTwoDigits <= 13
        ? "th"
        : dayOfMonth % 10 === 1
          ? "st"
          : dayOfMonth % 10 === 2
            ? "nd"
            : dayOfMonth % 10 === 3
              ? "rd"
              : "th";
    const month = new Intl.DateTimeFormat("en-US", {
      month: "long",
      timeZone: "UTC",
    }).format(day.dateValue);
    const date = `${month} ${dayOfMonth}${ordinal}`;
    const text =
      day.count === 0
        ? `No contributions on ${date}.`
        : `${day.count} contribution${day.count === 1 ? "" : "s"} on ${date}.`;
    const bounds = target.getBoundingClientRect();
    const above = bounds.top >= 64;
    const estimatedWidth = Math.min(text.length * 7 + 24, window.innerWidth - 16);
    const left = Math.min(
      Math.max(bounds.left + bounds.width / 2, estimatedWidth / 2 + 8),
      window.innerWidth - estimatedWidth / 2 - 8,
    );

    setHoveredDay({
      text,
      left,
      top: above ? bounds.top - 6 : bounds.bottom + 6,
      above,
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${contributionApiUrl}?y=all`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Contribution request failed: ${response.status}`);
        }

        return parseContributionData(await response.json());
      })
      .then((data) => {
        setActivityData({ status: "ready", ...data });
        setSelectedYear((year) =>
          data.years.includes(year) ? year : (data.years[0] ?? currentYear),
        );
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setActivityData((current) =>
            current.status === "ready" ? current : { status: "error" },
          );
        }
      });

    return () => controller.abort();
  }, [currentYear]);

  return (
    <section className="w-full min-w-0">
      <h2 className="mb-8 font-mono text-3xl font-semibold tracking-tight text-slate-100 sm:text-5xl">
        {t.projects.contributionTitle}
      </h2>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_10rem]">
        <div className="min-w-0">
          <p aria-live="polite" className="mb-4 text-lg font-medium text-slate-400">
            {activityData.status === "ready" ? contributionCount.toLocaleString("en-US") : "—"}{" "}
            contributions in {selectedYear}
          </p>
          {activityData.status === "error" ? (
            <p role="status" className="py-14 text-center text-sm text-slate-400">
              {t.projects.contributionFallback}
            </p>
          ) : (
            <div className="overflow-x-auto py-2">
              <div
                role="img"
                aria-label={`${t.projects.contributionChartAlt} ${selectedYear}`}
                aria-busy={activityData.status === "loading"}
                className="mx-auto w-max"
              >
                <div
                  aria-hidden="true"
                  style={gridStyle}
                  className="mb-4 grid gap-x-1 text-xs text-slate-400"
                >
                  <span />
                  {weeks.map((week, weekIndex) => {
                    const monthStart = week.find(
                      (day) => day.isInYear && day.dateValue.getUTCDate() === 1,
                    );
                    const monthLabel = monthStart
                      ? new Intl.DateTimeFormat("en-US", {
                          month: "short",
                          timeZone: "UTC",
                        }).format(monthStart.dateValue)
                      : "";

                    return (
                      <span key={weekIndex} className="whitespace-nowrap">
                        {monthLabel}
                      </span>
                    );
                  })}
                </div>

                <div aria-hidden="true" className="space-y-1">
                  {weekdays.map((weekday, dayIndex) => (
                    <div key={dayIndex} style={gridStyle} className="grid items-center gap-x-1">
                      <span className="pr-1 text-right text-xs text-slate-400">{weekday}</span>
                      {weeks.map((week, weekIndex) => {
                        const day = week[dayIndex];
                        const color = day?.isInYear ? levelColors[day.level] : "bg-transparent";

                        return (
                          <span
                            key={`${weekIndex}-${day?.date ?? dayIndex}`}
                            onMouseEnter={(event) => {
                              if (day?.isInYear) showDayTooltip(day, event.currentTarget);
                            }}
                            onMouseLeave={() => setHoveredDay(null)}
                            className={`h-3 w-3 rounded-[3px] ${color}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <nav
          aria-label="Contribution years"
          className="flex max-h-80 flex-row gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:pb-0"
        >
          {years.map((year) => {
            const isSelected = selectedYear === year;

            return (
              <button
                key={year}
                type="button"
                aria-pressed={isSelected}
                disabled={activityData.status !== "ready"}
                onClick={() => {
                  setHoveredDay(null);
                  setSelectedYear(year);
                }}
                className={`min-w-14 rounded-md px-3 py-2 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70 disabled:cursor-wait ${
                  isSelected
                    ? "bg-[#1f6feb]/65 text-white shadow-[0_8px_24px_-14px_rgba(31,111,235,0.65)] backdrop-blur-sm"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
                }`}
              >
                {year}
              </button>
            );
          })}
        </nav>
      </div>

      {hoveredDay && (
        <div
          role="tooltip"
          style={{
            left: hoveredDay.left,
            top: hoveredDay.top,
            transform: `translate(-50%, ${hoveredDay.above ? "-100%" : "0"})`,
          }}
          className="pointer-events-none fixed z-50 max-w-[calc(100vw-1rem)] rounded-md border border-white/10 bg-[#161b22] px-3 py-1.5 text-sm whitespace-nowrap text-slate-100 shadow-lg shadow-black/30"
        >
          {hoveredDay.text}
          <span
            aria-hidden="true"
            className={`absolute left-1/2 h-0 w-0 -translate-x-1/2 border-[5px] border-transparent ${
              hoveredDay.above ? "top-full border-t-[#161b22]" : "bottom-full border-b-[#161b22]"
            }`}
          />
        </div>
      )}
    </section>
  );
}

export default GitHubContributions;
