export const competitions = [
  { code: "PL", name: "Premier League", country: "England" },
  { code: "CL", name: "Champions League", country: "Europe" },
  { code: "BL1", name: "Bundesliga", country: "Germany" },
  { code: "PD", name: "La Liga", country: "Spain" },
  { code: "SA", name: "Serie A", country: "Italy" },
  { code: "FL1", name: "Ligue 1", country: "France" },
  { code: "DED", name: "Eredivisie", country: "Netherlands" },
  { code: "PPL", name: "Primeira Liga", country: "Portugal" },
  { code: "BSA", name: "Brasileirão Série A", country: "Brazil" },
  { code: "WC", name: "FIFA World Cup", country: "World" }
];

export function getCompetitionName(code) {
  return competitions.find((item) => item.code === code)?.name || "Football";
}
