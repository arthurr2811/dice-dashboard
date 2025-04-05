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
            <div className="bg-white p-2 rounded shadow border text-sm">
                <p><strong>Number:</strong> {label}</p>
                <p><strong>Rolled:</strong> {actual}×</p>
                <p><strong>Expected:</strong> {expected.toFixed(2)}×</p>
            </div>
        );
    }

    return null;
};

function FrequencyBarChart({ counts }) {
    const totalRolls = counts.reduce((sum, count) => sum + count, 0);
    const expected = totalRolls / 6;

    const frequencies = [1, 2, 3, 4, 5, 6].map((num, i) => ({
        number: num,
        count: counts[i],
    }));

    return (
        <div className="container">
            <h2 className="heading">📈 Roll frequency</h2>
            <BarChart width={500} height={300} data={frequencies}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="number" />
                <YAxis allowDecimals={false} />
                <Tooltip content={<CustomTooltip expected={expected} />} />
                <Bar dataKey="count" fill="#3b82f6" />
                <ReferenceLine
                    y={expected}
                    stroke="red"
                    strokeDasharray="3 3"
                    label="Expected"
                />
            </BarChart>
        </div>
    );
}

export default FrequencyBarChart;
