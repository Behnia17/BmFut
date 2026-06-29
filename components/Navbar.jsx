import Brand from "./Brand";

export default function Navbar({ onRefresh }) {
  return (
    <nav className="navbar">
      <Brand />

      <div className="nav-links">
        <a href="#matches">Matches</a>
        <a href="#table">Standings</a>
        <a href="#scorers">Scorers</a>
        <a href="#analysis">Analysis</a>
      </div>

      <div className="nav-actions">
        <button className="btn secondary" onClick={onRefresh}>Refresh</button>
      </div>
    </nav>
  );
}
