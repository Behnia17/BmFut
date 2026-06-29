"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import FeaturedMatch from "@/components/FeaturedMatch";
import Matches from "@/components/Matches";
import Standings from "@/components/Standings";
import Predictor from "@/components/Predictor";
import Scorers from "@/components/Scorers";
import TeamProfile from "@/components/TeamProfile";
import PowerRankings from "@/components/PowerRankings";
import Insights from "@/components/Insights";
import { competitions, getCompetitionName } from "@/lib/competitions";
import { demoData } from "@/lib/demo-data";

export default function Home() {
  const [competition, setCompetition] = useState("PL");
  const [data, setData] = useState({
    matches: [],
    table: [],
    scorers: [],
    mode: "loading",
    fetchedAt: null
  });
  const [search, setSearch] = useState("");
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [loading, setLoading] = useState(true);

  const competitionName = useMemo(() => getCompetitionName(competition), [competition]);

  async function fetchPart(type) {
    const response = await fetch(`/api/football?type=${type}&competition=${competition}`, {
      cache: "no-store"
    });
    const json = await response.json();
    if (!response.ok || json.error) throw new Error(json.error || "Data unavailable");
    return json;
  }

  async function loadData() {
    setLoading(true);

    try {
      const [matchesData, standingsData, scorersData] = await Promise.all([
        fetchPart("matches"),
        fetchPart("standings"),
        fetchPart("scorers")
      ]);

      const table = standingsData.standings?.[0]?.table || [];
      const nextData = {
        matches: matchesData.matches || [],
        table,
        scorers: scorersData.scorers || [],
        mode: "real",
        fetchedAt: matchesData.fetchedAt || new Date().toISOString()
      };

      setData(nextData);
      syncTeamSelections(table);
    } catch {
      const nextData = {
        matches: demoData.matches,
        table: demoData.standings,
        scorers: demoData.scorers,
        mode: "demo",
        fetchedAt: new Date().toISOString()
      };

      setData(nextData);
      syncTeamSelections(nextData.table);
    } finally {
      setLoading(false);
    }
  }

  function syncTeamSelections(table) {
    const first = table[0]?.team?.name || "";
    const second = table[1]?.team?.name || first;
    setHomeTeam((value) => table.some((row) => row.team?.name === value) ? value : first);
    setAwayTeam((value) => table.some((row) => row.team?.name === value) ? value : second);
    setSelectedTeam((value) => table.some((row) => row.team?.name === value) ? value : first);
  }

  useEffect(() => {
    loadData();
  }, [competition]);

  return (
    <div className="page-shell">
      <div className="grid-bg" />
      <Navbar onRefresh={loadData} />

      <header className="hero">
        <section>
          <div className="badge">Real data · live tables · match intelligence</div>
          <h1>BmFut turns football data into a premium matchday command center.</h1>
          <p>
            Follow fixtures, results, league tables, top scorers, team form, and prediction estimates from one fast modern dashboard.
          </p>

          <div className="hero-controls">
            <select className="select" value={competition} onChange={(event) => setCompetition(event.target.value)}>
              {competitions.map((item) => (
                <option key={item.code} value={item.code}>{item.name}</option>
              ))}
            </select>
            <button className="btn" onClick={loadData}>{loading ? "Loading..." : "Load data"}</button>
          </div>

          <div className={`trust ${data.mode === "real" ? "good" : "warning"}`}>
            <b>Data status:</b>{" "}
            {data.mode === "real"
              ? "Connected to real football data through a secure server route."
              : "Demo fallback is active. Add FOOTBALL_DATA_TOKEN on Vercel to unlock real data."}
          </div>
        </section>

        <FeaturedMatch matches={data.matches} table={data.table} fetchedAt={data.fetchedAt} />
      </header>

      <main className="dashboard">
        <Matches matches={data.matches} search={search} setSearch={setSearch} />

        <Predictor
          table={data.table}
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          setHomeTeam={setHomeTeam}
          setAwayTeam={setAwayTeam}
        />

        <Standings table={data.table} />

        <TeamProfile table={data.table} selectedTeam={selectedTeam} setSelectedTeam={setSelectedTeam} />

        <Scorers scorers={data.scorers} />

        <PowerRankings table={data.table} />

        <Insights mode={data.mode} competitionName={competitionName} />
      </main>

      <footer className="footer">
        <strong>© BmFut</strong>
        <span>Stats are provided by third-party football data services. Predictions are estimates and may be wrong.</span>
      </footer>
    </div>
  );
}
