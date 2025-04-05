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
        <div className="container">
            <h2 className="heading">📊 Statistics</h2>
            <ul className="mb-4">
                <li>Total rows: <strong>{totalRolls}</strong></li>
                <li>Percentage of 6: <strong>{sixPercent}%</strong></li>
                <li>Number of consecutive sixes: <strong>{sixPairs}</strong></li>
            </ul>
            <button
                onClick={onReset}
                className="button-reset"
            >
                Reset statistics
            </button>
        </div>
    );
}

export default StatsOverview;
