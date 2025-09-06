// src/App.js
import DiceInput from "./components/DiceInput.js";
import StatsOverview from "./components/StatsOverview.js";
import BarChart from "./components/BarChart.js";
import { useDiceData } from "./hooks/useDiceData.js";
import "./app.css";

function Dashboard() {
    const {
        rolls,
        counts,
        sixStats,
        longestNoSixStreak,
        addRoll,
        resetStats,
        exportRolls,
        importRolls,
    } = useDiceData();

    return (
        <div className="main-app-container">
            <div>
                <h1>🎲 Dice Dashboard</h1>
                <DiceInput onRoll={addRoll} />
            </div>

            <div className="stats-and-chart-container">
                <StatsOverview
                    rolls={rolls}
                    sixStats={sixStats}
                    longestNoSixStreak={longestNoSixStreak}
                    onReset={resetStats}
                    showResetButton={true}
                />
                <BarChart counts={counts} />
            </div>

            <div className="action-buttons">
                <button onClick={exportRolls} className="button-export-import">
                    Export Rolls
                </button>
                <label className="button-export-import">
                    <input
                        type="file"
                        accept=".txt"
                        onChange={importRolls}
                        placeholder={"Import Rolls"}
                    />
                    Import Rolls
                </label>
            </div>
        </div>
    );
}

export default Dashboard;