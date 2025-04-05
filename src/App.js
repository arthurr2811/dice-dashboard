import { useState } from "react";
import DiceInput from "./components/DiceInput";
import StatsOverview from "./components/StatsOverview";
import BarChart from "./components/BarChart";


// TODO
//  - add all statistics
//  - update false input feedback to be less
//  - add reset confirmation
//  - add data persistence via .txt
//  - style everything
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
