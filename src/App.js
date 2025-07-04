import { useState } from "react";
import DiceInput from "./components/DiceInput";
import StatsOverview from "./components/StatsOverview";
import BarChart from "./components/BarChart";


function App() {
    const [rolls, setRolls] = useState([]);
    const[counts, setCounts] = useState([0,0,0,0,0,0]); // aka [countOnes, countTwos...]
    const [sixStats, setSixStats] = useState([0, 0, 0, 0]); // aka [total6s, pairs, triplets, quadruplets]
    const [sixStreak, setSixStreak] = useState(0);
    const [noSixStreak, setNoSixStreak] = useState(0);
    const [longestNoSixStreak, setLongestNoSixStreak] = useState(0);

    // add a new dice roll
    const addRoll = (n) => {
        if (n < 1 || n > 6) return;
        // add roll to rolls
        const updatedRolls = [...rolls, n];
        setRolls(updatedRolls);
        // update counts
        const updatedCounts = [...counts];
        updatedCounts[n - 1] += 1; // n ist 1–6 → index 0–5
        setCounts(updatedCounts);
        // update six stats
        const newSixStats = [...sixStats];
        if (n === 6) {
            const newStreak = sixStreak + 1;
            setSixStreak(newStreak);
            newSixStats[0] += 1; // total 6s
            if (newStreak === 2) newSixStats[1] += 1; // pair
            if (newStreak === 3) newSixStats[2] += 1; // triplet
            if (newStreak === 4) newSixStats[3] += 1; // quadruplet
        } else {
            setSixStreak(0);
        }
        setSixStats(newSixStats);
        if (n !== 6) {
            const newNoSixStreak = noSixStreak + 1;
            setNoSixStreak(newNoSixStreak);
            if (newNoSixStreak > longestNoSixStreak) {
                setLongestNoSixStreak(newNoSixStreak);
            }
        } else {
            setNoSixStreak(0);
        }
    };

    // resets all stats
    const resetStats = () => {
        const confirmed = window.confirm("Are you sure you want to reset all statistics?");
        if (!confirmed) return;

        setRolls([]);
        setCounts([0, 0, 0, 0, 0, 0]);
        setSixStats([0, 0, 0, 0]);
        setSixStreak(0);
        setNoSixStreak(0);
        setLongestNoSixStreak(0);
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

    // calculate all statistics new, when imported rolls
    const processImportedRolls = (newRolls) => {
        const newCounts = [0, 0, 0, 0, 0, 0];
        const newSixStats = [0, 0, 0, 0];
        let sixStreak = 0;
        let noSixStreak = 0;
        let longestNoSixStreak = 0;

        newRolls.forEach((n) => {
            if (n < 1 || n > 6) return;
            // update counts
            newCounts[n - 1] += 1;
            // update sixes-stats
            if (n === 6) {
                sixStreak += 1;
                noSixStreak = 0;
                newSixStats[0] += 1;
                if (sixStreak === 2) newSixStats[1] += 1;
                if (sixStreak === 3) newSixStats[2] += 1;
                if (sixStreak === 4) newSixStats[3] += 1;
            } else {
                sixStreak = 0;
                noSixStreak += 1;
                if (noSixStreak > longestNoSixStreak) {
                    longestNoSixStreak = noSixStreak;
                }
            }
        });

        //set new statistics
        setRolls(newRolls);
        setCounts(newCounts);
        setSixStats(newSixStats);
        setSixStreak(sixStreak);
        setNoSixStreak(noSixStreak);
        setLongestNoSixStreak(longestNoSixStreak);
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
                />
                <BarChart counts={counts} />
            </div>

            <div className="action-buttons">
                <button
                    onClick={exportRolls}
                    className="button-export-import"
                >
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
