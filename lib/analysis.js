export function formScore(form = "") {
  return String(form)
    .split("")
    .slice(-5)
    .reduce((sum, result) => sum + (result === "W" ? 3 : result === "D" ? 1 : 0), 0);
}

export function teamPower(row, homeAdvantage = false) {
  const played = Math.max(row?.playedGames || 1, 1);
  const pointsPerMatch = (row?.points || 0) / played;
  const goalDifferenceRate = (row?.goalDifference || 0) / played;
  const goalsForRate = (row?.goalsFor || 0) / played;
  const goalsAgainstRate = (row?.goalsAgainst || 0) / played;
  const recentForm = formScore(row?.form || "") / 10;

  return Math.max(
    0.2,
    pointsPerMatch * 1.8 +
      goalDifferenceRate * 0.9 +
      goalsForRate * 0.55 -
      goalsAgainstRate * 0.35 +
      recentForm +
      (homeAdvantage ? 0.18 : 0)
  );
}

export function expectedGoals(attacker, defender, home = false) {
  const attackerPlayed = Math.max(attacker?.playedGames || 1, 1);
  const defenderPlayed = Math.max(defender?.playedGames || 1, 1);
  const attackRate = (attacker?.goalsFor || 0) / attackerPlayed;
  const defenseWeakness = (defender?.goalsAgainst || 0) / defenderPlayed;
  const value = attackRate * 0.62 + defenseWeakness * 0.48 + (home ? 0.16 : 0);
  return Math.max(0.25, value);
}

export function predictMatch(home, away) {
  if (!home || !away) {
    return null;
  }

  const homePower = teamPower(home, true);
  const awayPower = teamPower(away, false);
  let draw = 22;

  let homeWin = Math.round((homePower / (homePower + awayPower)) * (100 - draw));
  let awayWin = 100 - draw - homeWin;

  if (Math.abs(homeWin - awayWin) < 7) {
    draw += 6;
    homeWin -= 3;
    awayWin -= 3;
  }

  const homeXg = expectedGoals(home, away, true);
  const awayXg = expectedGoals(away, home, false);
  const pick = homeWin > awayWin ? home.team.name : away.team.name;

  return {
    pick,
    homeWin,
    draw,
    awayWin,
    homeXg: homeXg.toFixed(2),
    awayXg: awayXg.toFixed(2),
    confidence: Math.max(homeWin, awayWin, draw),
    note: "Estimate based on table position, points per match, goal difference, scoring rate, defensive record, recent form, and home advantage."
  };
}

export function cleanStatus(status = "") {
  const map = {
    TIMED: "Scheduled",
    SCHEDULED: "Scheduled",
    LIVE: "Live",
    IN_PLAY: "Live",
    PAUSED: "Half-time",
    FINISHED: "Finished",
    POSTPONED: "Postponed",
    SUSPENDED: "Suspended",
    CANCELLED: "Cancelled"
  };
  return map[status] || status;
}

export function formatDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export function displayScore(match) {
  const home = match?.score?.fullTime?.home;
  const away = match?.score?.fullTime?.away;
  if (home === null || home === undefined || away === null || away === undefined) return "vs";
  return `${home}-${away}`;
}
