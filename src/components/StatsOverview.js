function StatsOverview({ rolls, onReset }) {
    const totalRolls = rolls.length;
    const sixes = rolls.filter((n) => n === 6).length;
    const sixPercent = totalRolls > 0 ? ((sixes / totalRolls) * 100).toFixed(1) : 0;

    // Zählt aufeinanderfolgende 6en
    const countSixPairs = () => {
        let count = 0;
        let i = 0;

        while (i < rolls.length) {
            if (rolls[i] === 6) {
                let streak = 0;
                while (i < rolls.length && rolls[i] === 6) {
                    streak++;
                    i++;
                }
                if (streak >= 2) {
                    count++; // ein Pasch gefunden
                }
            } else {
                i++;
            }
        }

        return count;
    };


    const sixPairs = countSixPairs();

    return (
        <div className="bg-gray-100 p-4 rounded mb-4 shadow">
            <h2 className="text-xl font-semibold mb-2">📊 Statistiken</h2>
            <ul className="mb-4">
                <li>Gesamtwürfe: <strong>{totalRolls}</strong></li>
                <li>Anteil 6en: <strong>{sixPercent}%</strong></li>
                <li>Anzahl 6er-Paschs: <strong>{sixPairs}</strong></li>
            </ul>
            <button
                onClick={onReset}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                Zurücksetzen
            </button>
        </div>
    );
}

export default StatsOverview;
