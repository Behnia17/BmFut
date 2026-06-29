import { predictMatch } from "@/lib/analysis";

function ProbBar({ label, value }) {
  return (
    <div>
      <label><span>{label}</span><b>{value}%</b></label>
      <div className="bar"><b style={{ width: `${Math.max(0, Math.min(value, 100))}%` }} /></div>
    </div>
  );
}

export default function Predictor({ table = [], homeTeam, awayTeam, setHomeTeam, setAwayTeam }) {
  const home = table.find((row) => row.team?.name === homeTeam) || table[0];
  const away = table.find((row) => row.team?.name === awayTeam) || table[1] || table[0];
  const prediction = predictMatch(home, away);

  return (
    <section id="analysis" className="panel panel-pad">
      <div className="panel-head">
        <div>
          <div className="eyebrow">Match IQ</div>
          <h2>Prediction lab</h2>
        </div>
      </div>

      <div className="predictor">
        <select className="select" value={homeTeam} onChange={(event) => setHomeTeam(event.target.value)}>
          {table.map((row) => <option key={row.team?.name} value={row.team?.name}>{row.team?.name}</option>)}
        </select>
        <select className="select" value={awayTeam} onChange={(event) => setAwayTeam(event.target.value)}>
          {table.map((row) => <option key={row.team?.name} value={row.team?.name}>{row.team?.name}</option>)}
        </select>
      </div>

      <div className="prediction">
        {prediction ? (
          <>
            <h3>{home.team.name} vs {away.team.name}</h3>
            <p><b>Most likely pick:</b> {prediction.pick}</p>
            <p><b>Expected goals:</b> {home.team.name} {prediction.homeXg} · {away.team.name} {prediction.awayXg}</p>
            <p><b>Confidence:</b> {prediction.confidence}%</p>
            <div className="prob">
              <ProbBar label={home.team.name} value={prediction.homeWin} />
              <ProbBar label="Draw" value={prediction.draw} />
              <ProbBar label={away.team.name} value={prediction.awayWin} />
            </div>
            <p className="muted" style={{ marginTop: 12 }}>{prediction.note}</p>
          </>
        ) : (
          <div className="loading">Choose teams to analyze.</div>
        )}
      </div>
    </section>
  );
}
