export default function TeamProfile({ table = [], selectedTeam, setSelectedTeam }) {
  const row = table.find((item) => item.team?.name === selectedTeam) || table[0];

  if (!row) {
    return (
      <section className="panel panel-pad">
        <div className="loading">No team data.</div>
      </section>
    );
  }

  const played = Math.max(row.playedGames || 1, 1);
  const ppg = ((row.points || 0) / played).toFixed(2);
  const gpg = ((row.goalsFor || 0) / played).toFixed(2);
  const cpg = ((row.goalsAgainst || 0) / played).toFixed(2);

  return (
    <section className="panel panel-pad">
      <div className="panel-head">
        <div>
          <div className="eyebrow">Club profile</div>
          <h2>Team IQ</h2>
        </div>
      </div>

      <select className="select" value={selectedTeam} onChange={(event) => setSelectedTeam(event.target.value)}>
        {table.map((item) => <option key={item.team?.name} value={item.team?.name}>{item.team?.name}</option>)}
      </select>

      <div className="profile">
        {row.team?.crest ? <img className="profile-logo" src={row.team.crest} alt="" /> : null}
        <div>
          <h3>{row.team?.name}</h3>
          <p className="muted">Position #{row.position} · {row.points} points</p>
        </div>

        <div className="profile-stats">
          <div className="profile-stat"><strong>{ppg}</strong><span>Points per game</span></div>
          <div className="profile-stat"><strong>{gpg}</strong><span>Goals per game</span></div>
          <div className="profile-stat"><strong>{cpg}</strong><span>Conceded per game</span></div>
          <div className="profile-stat"><strong>{row.goalDifference}</strong><span>Goal difference</span></div>
        </div>
      </div>
    </section>
  );
}
