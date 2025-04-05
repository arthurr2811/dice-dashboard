import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ReferenceLine,
} from "recharts";

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
                <Tooltip />
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
