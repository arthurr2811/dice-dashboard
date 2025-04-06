function StatsOverview({ rolls, sixStats, onReset, longestNoSixStreak }) {
    const totalRolls = rolls.length;
    const sixPercent = totalRolls > 0 ? ((sixStats[0] / totalRolls) * 100).toFixed(1) : 0;

    return (
        <div className="container">
            <h2 className="heading">📊 Statistics</h2>
            <div className="stats-grid">
                <ul>
                    <li>Total rolls: <strong>{totalRolls}</strong></li>
                    <li>Percentage of 6s: <strong>{sixPercent}%</strong></li>
                    <li>Number of 2 consecutive sixes: <strong>{sixStats[1]}</strong></li>
                    <li>Number of 3 consecutive sixes: <strong>{sixStats[2]}</strong></li>
                    <li>Number of 4 consecutive sixes: <strong>{sixStats[3]}</strong></li>
                    <li>Longest streak without a 6: <strong>{longestNoSixStreak}</strong></li>
                </ul>
                <ul>
                    <li>–</li>
                    <li>Expected: <strong>{(100 / 6).toFixed(2)}%</strong></li>
                    <li>Expected: <strong>{(totalRolls - 1) * Math.pow(1/6, 2) | 0}</strong></li>
                    <li>Expected: <strong>{(totalRolls - 2) * Math.pow(1/6, 3) | 0}</strong></li>
                    <li>Expected: <strong>{(totalRolls - 3) * Math.pow(1/6, 4) | 0}</strong></li>
                    <li>–</li>
                </ul>
            </div>

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
