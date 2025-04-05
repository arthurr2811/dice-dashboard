import { useState } from "react";
import DiceInput from "./components/DiceInput";
import StatsOverview from "./components/StatsOverview";
import BarChart from "./components/BarChart";

function App() {
  const [rolls, setRolls] = useState([]);

  const addRoll = (n) => {
    if (n >= 1 && n <= 6) {
      setRolls([...rolls, n]);
    }
  };

  const resetStats = () => {
    setRolls([]);
  };

  return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">🎲 Dice Dashboard</h1>
        <DiceInput onRoll={addRoll} />
        <StatsOverview rolls={rolls} onReset={resetStats} />
        <BarChart rolls={rolls} />
      </div>
  );
}

export default App;
