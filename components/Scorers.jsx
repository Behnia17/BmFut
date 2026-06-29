export default function Scorers({ scorers = [] }) {
  return (
    <section id="scorers" className="panel panel-pad">
      <div className="panel-head">
        <div>
          <div className="eyebrow">Attack leaders</div>
          <h2>Top scorers</h2>
        </div>
      </div>

      <div className="scorers-grid">
        {scorers.slice(0, 9).map((item, index) => (
          <article className="scorer" key={item.player?.id || `${item.player?.name}-${index}`}>
            <div className="rank">#{index + 1}</div>
            <h3>{item.player?.name || "Player"}</h3>
            <p>{item.team?.name || "Team"}</p>
            <strong>{item.goals ?? 0} goals</strong>
            <p>{item.assists ?? 0} assists · {item.penalties ?? 0} pens</p>
          </article>
        ))}
      </div>
    </section>
  );
}
