import { useState } from "react";
import DiceInput from "./components/DiceInput";
import StatsOverview from "./components/StatsOverview";
import BarChart from "./components/BarChart";


// TODO
//  - add rest of statistics:and expected values for consecutive 6es statistic
//  - add reset confirmation
//  - add data persistence via .txt
//  - style everything
function App() {
    const [rolls, setRolls] = useState([]);
    const[counts, setCounts] = useState([0,0,0,0,0,0]); // aka [countOnes, countTwos...]
    const [sixStats, setSixStats] = useState([0, 0, 0, 0]); // aka [total6s, pairs, triplets, quadruplets]
    const [sixStreak, setSixStreak] = useState(0);
    const [noSixStreak, setNoSixStreak] = useState(0);
    const [longestNoSixStreak, setLongestNoSixStreak] = useState(0);

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

        // No-6 streak tracking
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

    const resetStats = () => {
        setRolls([]);
        setCounts([0, 0, 0, 0, 0, 0]);
        setSixStats([0, 0, 0, 0]);
        setSixStreak(0);
        setNoSixStreak(0);
        setLongestNoSixStreak(0);

    };

    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">🎲 Dice Dashboard</h1>
        <DiceInput onRoll={addRoll} />
          <StatsOverview
              rolls={rolls}
              sixStats={sixStats}
              longestNoSixStreak={longestNoSixStreak}
              onReset={resetStats}
          />

          <BarChart counts={counts} />
      </div>
  );
}

export default App;
