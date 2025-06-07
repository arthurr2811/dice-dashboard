function StatsOverview({ rolls, sixStats, onReset, longestNoSixStreak }) {
    const totalRolls = rolls.length;
    const sixPercent = totalRolls > 0 ? ((sixStats[0] / totalRolls) * 100).toFixed(1) : 0;

    return (
        <div className="container">
            <h2 className="heading">📊 Statistics</h2>
            <div className="stats-grid-new">

                {/* Total Rolls Stat Box */}
                <div className="stat-box">
                    <span className="stat-value">{totalRolls}</span>
                    <span className="stat-label">Total rolls</span>
                </div>

                {/* Sixes Stat Box */}
                <div className="stat-box">
                    <span className="stat-value">{sixStats[0]}</span>
                    <span className="stat-label">Sixes ({sixPercent}%)</span>
                    <span className="stat-expected">Expected: {(totalRolls / 6).toFixed(0)}</span>
                </div>

                {/* Two Consecutive Sixes Stat Box */}
                <div className="stat-box">
                    <span className="stat-value">{sixStats[1]}</span>
                    <span className="stat-label">2 consecutive sixes</span>
                    <span className="stat-expected">Expected: {
                        Math.max(0, (totalRolls - 1) * Math.pow(1/6, 2)).toFixed(0)
                    }</span>
                </div>

                {/* Three Consecutive Sixes Stat Box */}
                <div className="stat-box">
                    <span className="stat-value">{sixStats[2]}</span>
                    <span className="stat-label">3 consecutive sixes</span>
                    <span className="stat-expected">Expected: {
                        Math.max(0, (totalRolls - 2) * Math.pow(1/6, 3) || 0).toFixed(0)
                    }</span>
                </div>

                {/* Four Consecutive Sixes Stat Box */}
                <div className="stat-box">
                    <span className="stat-value">{sixStats[3]}</span>
                    <span className="stat-label">4 consecutive sixes</span>
                    <span className="stat-expected">Expected: {
                        Math.max(0, (totalRolls - 3) * Math.pow(1/6, 4) || 0).toFixed(0)
                    }</span>
                </div>

                {/* Longest No Six Streak Stat Box */}
                <div className="stat-box">
                    <span className="stat-value">{longestNoSixStreak}</span>
                    <span className="stat-label">Longest streak without a 6</span>
                </div>

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
