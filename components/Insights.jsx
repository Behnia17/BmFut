export default function Insights({ mode, competitionName }) {
  return (
    <section className="panel panel-pad">
      <div className="panel-head">
        <div>
          <div className="eyebrow">Data proof</div>
          <h2>Reliability</h2>
        </div>
      </div>

      <div className="news-grid">
        <article className="news-card">
          <h3>Source</h3>
          <p>{mode === "real" ? "Live data is loaded through a secure server route using football-data.org." : "Demo data is active until the API token is configured."}</p>
        </article>
        <article className="news-card">
          <h3>Current league</h3>
          <p>{competitionName}</p>
        </article>
        <article className="news-card">
          <h3>Prediction labels</h3>
          <p>Stats are facts from the API. Match predictions are estimates based on available team performance data.</p>
        </article>
      </div>
    </section>
  );
}
