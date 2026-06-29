import { NextResponse } from "next/server";

const allowedCompetitions = new Set(["PL", "CL", "BL1", "PD", "SA", "FL1", "DED", "PPL", "BSA", "WC"]);
const allowedTypes = new Set(["matches", "standings", "scorers", "teams"]);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "matches";
  const competition = searchParams.get("competition") || "PL";

  const safeType = allowedTypes.has(type) ? type : "matches";
  const safeCompetition = allowedCompetitions.has(competition) ? competition : "PL";
  const token = process.env.FOOTBALL_DATA_TOKEN;

  if (!token) {
    return NextResponse.json(
      {
        error: "Missing FOOTBALL_DATA_TOKEN",
        mode: "unconfigured"
      },
      { status: 500 }
    );
  }

  const routes = {
    matches: `https://api.football-data.org/v4/competitions/${safeCompetition}/matches`,
    standings: `https://api.football-data.org/v4/competitions/${safeCompetition}/standings`,
    scorers: `https://api.football-data.org/v4/competitions/${safeCompetition}/scorers?limit=20`,
    teams: `https://api.football-data.org/v4/competitions/${safeCompetition}/teams`
  };

  try {
    const res = await fetch(routes[safeType], {
      headers: {
        "X-Auth-Token": token
      },
      next: {
        revalidate: 60
      }
    });

    const data = await res.json();

    return NextResponse.json(
      {
        ...data,
        source: "football-data.org",
        mode: "real",
        fetchedAt: new Date().toISOString()
      },
      {
        status: res.status,
        headers: {
          "Cache-Control": "s-maxage=60, stale-while-revalidate=300"
        }
      }
    );
  } catch {
    return NextResponse.json(
      {
        error: "Failed to fetch football data",
        mode: "error"
      },
      { status: 500 }
    );
  }
}
