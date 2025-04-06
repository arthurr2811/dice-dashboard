function StatsOverview({ rolls, sixStats, onReset, longestNoSixStreak }) {
    const totalRolls = rolls.length;
    const sixPercent = totalRolls > 0 ? ((sixStats[0] / totalRolls) * 100).toFixed(1) : 0;

    return (
        <div className="container">
            <h2 className="heading">📊 Statistics</h2>
            <ul className="mb-4">
                <li>Total rolls: <strong>{totalRolls}</strong></li>
                <li>Percentage of 6: <strong>{sixPercent}%</strong></li>
                <li>Number of 2 consecutive sixes: <strong>{sixStats[1]}</strong></li>
                <li>Number of 3 consecutive sixes: <strong>{sixStats[2]}</strong></li>
                <li>Number of 4 consecutive sixes: <strong>{sixStats[3]}</strong></li>
                <li>Longest streak without a six: <strong>{longestNoSixStreak}</strong></li>
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
