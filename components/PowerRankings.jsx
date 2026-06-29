import { teamPower } from "@/lib/analysis";

export default function PowerRankings({ table = [] }) {
  const rankings = [...table]
    .map((row) => ({
      name: row.team?.name,
      power: Math.round(teamPower(row, false) * 18)
    }))
    .sort((a, b) => b.power - a.power)
    .slice(0, 6);

  const max = Math.max(...rankings.map((item) => item.power), 1);

  return (
    <section className="panel panel-pad">
      <div className="panel-head">
        <div>
          <div className="eyebrow">Power index</div>
          <h2>Club strength</h2>
        </div>
      </div>

      <div className="power-card">
        {rankings.map((item, index) => (
          <div className="power-row" key={item.name}>
            <b>#{index + 1}</b>
            <div>
              <label className="muted">{item.name}</label>
              <div className="bar"><b style={{ width: `${(item.power / max) * 100}%` }} /></div>
            </div>
            <strong>{item.power}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
