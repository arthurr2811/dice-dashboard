import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ReferenceLine,
} from "recharts";

const CustomTooltip = ({ active, payload, label, expected }) => {
    if (active && payload && payload.length) {
        const actual = payload[0].value;

        return (
            <div>
                <p><strong>Number:</strong> {label}</p>
                <p><strong>Rolled:</strong> {actual}×</p>
                <p><strong>Expected:</strong> {expected.toFixed(2)}×</p>
            </div>
        );
    }
    return null;
};

function FrequencyBarChart({ counts, variant='app'}) {
    // different styles if used for app or as overlay
    const containerClass = variant === "overlay" ? "bar-chart-container overlay" : "bar-chart-container";
    const headingClass = variant === "overlay" ? "heading-overlay" : "heading";

    const totalRolls = counts.reduce((sum, count) => sum + count, 0);
    const expected = totalRolls / 6;

    const frequencies = [1, 2, 3, 4, 5, 6].map((num, i) => ({
        number: num,
        count: counts[i],
    }));

    const barFill = variant === "overlay" ? "rgba(255,255,255,0.6)" : "#3b82f6";
    return (
        <div className={containerClass}>
            <h2 className={headingClass}>Roll counts</h2>
            <BarChart width={500} height={300} data={frequencies}>
                <CartesianGrid strokeDasharray="3 3" stroke={variant === "overlay" ? "rgba(255,255,255,0.3)" : "#ccc"} />
                <XAxis dataKey="number" stroke={variant === "overlay" ? "white" : "#333"} />
                <YAxis allowDecimals={false} stroke={variant === "overlay" ? "white" : "#333"} />
                <Tooltip content={<CustomTooltip expected={expected} />} />
                <Bar dataKey="count" fill={barFill} />
                <ReferenceLine
                    y={expected}
                    stroke={variant === "overlay" ? "rgba(255,0,0,0.7)" : "red"}
                    strokeDasharray="3 3"
                    label="Expected"
                />
            </BarChart>
        </div>
    );
}

export default FrequencyBarChart;
