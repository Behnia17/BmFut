function formatForm(form = "") {
  if (!form) return <span className="muted">-</span>;
  return String(form).split("").slice(-5).map((item, index) => (
    <span className={item} key={`${item}-${index}`}>{item}</span>
  ));
}

export default function Standings({ table = [] }) {
  return (
    <section id="table" className="panel panel-pad">
      <div className="panel-head">
        <div>
          <div className="eyebrow">League table</div>
          <h2>Standings</h2>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Club</th>
              <th>MP</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>GF</th>
              <th>GA</th>
              <th>GD</th>
              <th>PTS</th>
              <th>Form</th>
            </tr>
          </thead>
          <tbody>
            {table.slice(0, 20).map((row) => (
              <tr key={row.team?.id || row.team?.name}>
                <td>{row.position}</td>
                <td>
                  <div className="club">
                    {row.team?.crest ? <img src={row.team.crest} alt="" /> : "⚽"}
                    <span>{row.team?.name || "Club"}</span>
                  </div>
                </td>
                <td>{row.playedGames ?? "-"}</td>
                <td>{row.won ?? "-"}</td>
                <td>{row.draw ?? "-"}</td>
                <td>{row.lost ?? "-"}</td>
                <td>{row.goalsFor ?? "-"}</td>
                <td>{row.goalsAgainst ?? "-"}</td>
                <td>{row.goalDifference ?? "-"}</td>
                <td>{row.points ?? "-"}</td>
                <td><div className="form">{formatForm(row.form)}</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
