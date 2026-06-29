import { cleanStatus, displayScore, formatDate } from "@/lib/analysis";

export default function FeaturedMatch({ matches = [], table = [], fetchedAt }) {
  const featured =
    matches.find((match) => ["LIVE", "IN_PLAY", "PAUSED"].includes(match.status)) ||
    matches.find((match) => match.status === "SCHEDULED" || match.status === "TIMED") ||
    matches[0];

  const home = featured?.homeTeam?.name || "Home";
  const away = featured?.awayTeam?.name || "Away";

  return (
    <section className="panel featured">
      <div className="card-head">
        <span className="eyebrow">Featured match</span>
        <span className="status-pill">{cleanStatus(featured?.status || "Ready")}</span>
      </div>

      <div className="featured-match">
        <h2>{home}</h2>
        <div className="big-score">{featured ? displayScore(featured) : "--"}</div>
        <h2>{away}</h2>
        <span className="muted">{featured ? formatDate(featured.utcDate) : "Waiting for data"}</span>
      </div>

      <div className="metric-row">
        <div className="metric">
          <strong>{matches.length}</strong>
          <span>Matches</span>
        </div>
        <div className="metric">
          <strong>{table.length}</strong>
          <span>Teams</span>
        </div>
        <div className="metric">
          <strong>{fetchedAt ? new Date(fetchedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--"}</strong>
          <span>Updated</span>
        </div>
      </div>
    </section>
  );
}
