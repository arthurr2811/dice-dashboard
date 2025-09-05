import { useState, useEffect } from "react";
import DiceInput from "./components/DiceInput.js";
import StatsOverview from "./components/StatsOverview.js";
import BarChart from "./components/BarChart.js";
import './app.css';

const SERVER = "http://localhost:4000";

// ToDo css aufräumen
//  restl code aufräumen, projekt sortieren
function App() {
    const [rolls, setRolls] = useState([]);
    const [counts, setCounts] = useState([0, 0, 0, 0, 0, 0]); // counts [1..6]
    const [sixStats, setSixStats] = useState([0, 0, 0, 0]);   // [total6s, pairs, triplets, quadruplets]
    const [sixStreak, setSixStreak] = useState(0);
    const [noSixStreak, setNoSixStreak] = useState(0);
    const [longestNoSixStreak, setLongestNoSixStreak] = useState(0);

    // Backend I/O
    const loadState = async () => {
        try {
            const res = await fetch(`${SERVER}/state`);
            const data = await res.json();
            setRolls(data.rolls || []);
            setCounts(data.counts || [0, 0, 0, 0, 0, 0]);
            setSixStats(data.sixStats || [0, 0, 0, 0]);
            setSixStreak(data.sixStreak || 0);
            setNoSixStreak(data.noSixStreak || 0);
            setLongestNoSixStreak(data.longestNoSixStreak || 0);
        } catch (e) {
            console.warn("Konnte State nicht laden:", e);
        }
    };

    const saveState = async (stateObj) => {
        try {
            await fetch(`${SERVER}/state`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(stateObj),
            });
        } catch (e) {
            console.warn("Konnte State nicht speichern:", e);
        }
    };

    // on start: load data from backend
    useEffect(() => {
        loadState();
    }, []);



    // add a new dice roll
    const addRoll = (n) => {
        if (n < 1 || n > 6) return;

        const updatedRolls = [...rolls, n];
        const updatedCounts = [...counts];
        updatedCounts[n - 1] += 1;

        const newSixStats = [...sixStats];
        let newSixStreak = sixStreak;
        let newNoSixStreak = noSixStreak;
        let newLongestNoSixStreak = longestNoSixStreak;

        if (n === 6) {
            newSixStreak += 1;
            newNoSixStreak = 0;
            newSixStats[0] += 1; // total 6s
            if (newSixStreak === 2) newSixStats[1] += 1; // pair
            if (newSixStreak === 3) newSixStats[2] += 1; // triplet
            if (newSixStreak === 4) newSixStats[3] += 1; // quadruplet
        } else {
            newSixStreak = 0;
            newNoSixStreak += 1;
            if (newNoSixStreak > newLongestNoSixStreak) {
                newLongestNoSixStreak = newNoSixStreak;
            }
        }

        // update local and write to backend
        setRolls(updatedRolls);
        setCounts(updatedCounts);
        setSixStats(newSixStats);
        setSixStreak(newSixStreak);
        setNoSixStreak(newNoSixStreak);
        setLongestNoSixStreak(newLongestNoSixStreak);

        saveState({
            rolls: updatedRolls,
            counts: updatedCounts,
            sixStats: newSixStats,
            sixStreak: newSixStreak,
            noSixStreak: newNoSixStreak,
            longestNoSixStreak: newLongestNoSixStreak,
        });
    };

    // resets all stats
    const resetStats = () => {
        const confirmed = window.confirm("Are you sure you want to reset all statistics?");
        if (!confirmed) return;

        const fresh = {
            rolls: [],
            counts: [0, 0, 0, 0, 0, 0],
            sixStats: [0, 0, 0, 0],
            sixStreak: 0,
            noSixStreak: 0,
            longestNoSixStreak: 0,
        };

        setRolls(fresh.rolls);
        setCounts(fresh.counts);
        setSixStats(fresh.sixStats);
        setSixStreak(fresh.sixStreak);
        setNoSixStreak(fresh.noSixStreak);
        setLongestNoSixStreak(fresh.longestNoSixStreak);

        saveState(fresh);
    };

    // Export Rolls to .txt
    const exportRolls = () => {
        const content = rolls.join(",");
        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "diceRolls.txt";
        link.href = url;
        link.click();
    };

    // Import Rolls from .txt
    const importRolls = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target.result;
            const parsed = text
                .split(",")
                .map((s) => parseInt(s.trim()))
                .filter((n) => !isNaN(n) && n >= 1 && n <= 6);
            // reset old rolls and process new rolls to calculate all statistics
            setRolls([]);
            processImportedRolls(parsed);
        };
        reader.readAsText(file);
    };

    // calculate all statistics new, when import
    const processImportedRolls = (newRolls) => {
        const newCounts = [0, 0, 0, 0, 0, 0];
        const newSixStats = [0, 0, 0, 0];
        let sixStreakLocal = 0;
        let noSixStreakLocal = 0;
        let longestNoSixStreakLocal = 0;

        newRolls.forEach((n) => {
            if (n < 1 || n > 6) return;
            newCounts[n - 1] += 1;
            if (n === 6) {
                sixStreakLocal += 1;
                noSixStreakLocal = 0;
                newSixStats[0] += 1;
                if (sixStreakLocal === 2) newSixStats[1] += 1;
                if (sixStreakLocal === 3) newSixStats[2] += 1;
                if (sixStreakLocal === 4) newSixStats[3] += 1;
            } else {
                sixStreakLocal = 0;
                noSixStreakLocal += 1;
                if (noSixStreakLocal > longestNoSixStreakLocal) {
                    longestNoSixStreakLocal = noSixStreakLocal;
                }
            }
        });

        setRolls(newRolls);
        setCounts(newCounts);
        setSixStats(newSixStats);
        setSixStreak(sixStreakLocal);
        setNoSixStreak(noSixStreakLocal);
        setLongestNoSixStreak(longestNoSixStreakLocal);

        saveState({
            rolls: newRolls,
            counts: newCounts,
            sixStats: newSixStats,
            sixStreak: sixStreakLocal,
            noSixStreak: noSixStreakLocal,
            longestNoSixStreak: longestNoSixStreakLocal,
        });
    };

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
                <BarChart counts={counts}/>
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

export default App;