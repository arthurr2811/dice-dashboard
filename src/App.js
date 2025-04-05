import { useState } from "react";
import DiceInput from "./components/DiceInput";
import StatsOverview from "./components/StatsOverview";
import BarChart from "./components/BarChart";


// TODO
//  - bar chart neben count auch erwarteter count
//  - add rest of statistics: most rolled number
//  - add reset confirmation
//  - add data persistence via .txt
//  - style everything
function App() {
    const [rolls, setRolls] = useState([]);
    const[counts, setCounts] = useState([0,0,0,0,0,0]); // aka [countOnes, countTwos...]
    const [sixStats, setSixStats] = useState([0, 0, 0, 0]); // aka [total6s, pairs, triplets, quadruplets]
    const [sixStreak, setSixStreak] = useState(0);


    const addRoll = (n) => {
        if (n < 1 || n > 6) return;
        // Neuen Wurf speichern
        const updatedRolls = [...rolls, n];
        setRolls(updatedRolls);
        // counts aktualisieren
        const updatedCounts = [...counts];
        updatedCounts[n - 1] += 1; // n ist 1–6 → index 0–5
        setCounts(updatedCounts);
        // 6er-Stats aktualisieren
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
    };


    const resetStats = () => {
        setRolls([]);
        setCounts([0, 0, 0, 0, 0, 0]);
        setSixStats([0, 0, 0, 0]);
        setSixStreak(0);
    };


    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">🎲 Dice Dashboard</h1>
        <DiceInput onRoll={addRoll} />
        <StatsOverview rolls={rolls} sixStats={sixStats} onReset={resetStats} />
        <BarChart counts={counts} />
      </div>
  );
}

export default App;
