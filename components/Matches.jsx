import { cleanStatus, displayScore, formatDate } from "@/lib/analysis";

export default function Matches({ matches = [], search, setSearch }) {
  const filtered = matches
    .filter((match) => `${match.homeTeam?.name || ""} ${match.awayTeam?.name || ""}`.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 16);

  return (
    <section id="matches" className="panel panel-pad">
      <div className="panel-head">
        <div>
          <div className="eyebrow">Verified match center</div>
          <h2>Fixtures & results</h2>
        </div>
        <input className="input" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search teams..." />
      </div>

      <div className="match-list">
        {filtered.length ? filtered.map((match) => (
          <article className="match-card" key={match.id || `${match.homeTeam?.name}-${match.awayTeam?.name}-${match.utcDate}`}>
            <div>
              <div className="status">{cleanStatus(match.status)}</div>
              <div className="date">{formatDate(match.utcDate)}</div>
            </div>
            <div className="teams">
              <span>{match.homeTeam?.name || "Home"}</span>
              <span>{match.awayTeam?.name || "Away"}</span>
            </div>
            <div className="score">{displayScore(match)}</div>
            <div className="mini">MD {match.matchday || "-"}</div>
          </article>
        )) : (
          <div className="loading">No matches found.</div>
        )}
      </div>
    </section>
  );
}
