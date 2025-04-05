import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

function FrequencyBarChart({ rolls }) {
    // Frequenz für Zahlen 1 bis 6
    const frequencies = [1, 2, 3, 4, 5, 6].map((num) => ({
        number: num,
        count: rolls.filter((n) => n === num).length,
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
            </BarChart>
        </div>
    );
}

export default FrequencyBarChart;
