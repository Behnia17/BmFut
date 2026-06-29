export const demoData = {
  matches: [
    {
      id: 101,
      utcDate: new Date().toISOString(),
      status: "LIVE",
      matchday: 24,
      competition: { name: "Premier League" },
      homeTeam: { id: 1, name: "Arsenal", crest: "" },
      awayTeam: { id: 2, name: "Liverpool", crest: "" },
      score: { fullTime: { home: 1, away: 1 } }
    },
    {
      id: 102,
      utcDate: new Date(Date.now() + 7200000).toISOString(),
      status: "SCHEDULED",
      matchday: 24,
      competition: { name: "Premier League" },
      homeTeam: { id: 3, name: "Manchester City", crest: "" },
      awayTeam: { id: 4, name: "Chelsea", crest: "" },
      score: { fullTime: { home: null, away: null } }
    },
    {
      id: 103,
      utcDate: new Date(Date.now() - 86400000).toISOString(),
      status: "FINISHED",
      matchday: 23,
      competition: { name: "Premier League" },
      homeTeam: { id: 5, name: "Tottenham Hotspur", crest: "" },
      awayTeam: { id: 6, name: "Newcastle United", crest: "" },
      score: { fullTime: { home: 2, away: 3 } }
    }
  ],
  standings: [
    { position: 1, team: { id: 1, name: "Arsenal", crest: "" }, playedGames: 24, won: 16, draw: 5, lost: 3, goalsFor: 51, goalsAgainst: 22, goalDifference: 29, points: 53, form: "WWDWW" },
    { position: 2, team: { id: 2, name: "Liverpool", crest: "" }, playedGames: 24, won: 15, draw: 6, lost: 3, goalsFor: 49, goalsAgainst: 24, goalDifference: 25, points: 51, form: "WDWWW" },
    { position: 3, team: { id: 3, name: "Manchester City", crest: "" }, playedGames: 24, won: 15, draw: 4, lost: 5, goalsFor: 55, goalsAgainst: 28, goalDifference: 27, points: 49, form: "LWWDW" },
    { position: 4, team: { id: 4, name: "Chelsea", crest: "" }, playedGames: 24, won: 13, draw: 5, lost: 6, goalsFor: 44, goalsAgainst: 32, goalDifference: 12, points: 44, form: "WWLDW" },
    { position: 5, team: { id: 5, name: "Tottenham Hotspur", crest: "" }, playedGames: 24, won: 12, draw: 5, lost: 7, goalsFor: 46, goalsAgainst: 38, goalDifference: 8, points: 41, form: "DLWLW" },
    { position: 6, team: { id: 6, name: "Newcastle United", crest: "" }, playedGames: 24, won: 11, draw: 6, lost: 7, goalsFor: 42, goalsAgainst: 34, goalDifference: 8, points: 39, form: "WLWDD" }
  ],
  scorers: [
    { player: { id: 10, name: "Erling Haaland" }, team: { id: 3, name: "Manchester City" }, goals: 18, assists: 4, penalties: 3 },
    { player: { id: 11, name: "Mohamed Salah" }, team: { id: 2, name: "Liverpool" }, goals: 16, assists: 8, penalties: 2 },
    { player: { id: 12, name: "Bukayo Saka" }, team: { id: 1, name: "Arsenal" }, goals: 13, assists: 9, penalties: 1 },
    { player: { id: 13, name: "Alexander Isak" }, team: { id: 6, name: "Newcastle United" }, goals: 12, assists: 3, penalties: 1 },
    { player: { id: 14, name: "Cole Palmer" }, team: { id: 4, name: "Chelsea" }, goals: 12, assists: 7, penalties: 4 },
    { player: { id: 15, name: "Son Heung-min" }, team: { id: 5, name: "Tottenham Hotspur" }, goals: 11, assists: 6, penalties: 1 }
  ]
};
