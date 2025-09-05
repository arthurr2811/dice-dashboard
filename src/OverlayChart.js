import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import BarChart from "./components/BarChart.js";

const SERVER = "http://localhost:4000";

function OverlayChart() {
    const [counts, setCounts] = useState([0, 0, 0, 0, 0, 0]);
    useEffect(() => {
        const socket = io(SERVER);
        socket.on("stateUpdate", (newState) => {
            setCounts(newState.counts || [0, 0, 0, 0, 0, 0]);
        });
        return () => {
            socket.disconnect();
        };
    }, []);
    return (
        <div>
            <BarChart counts={counts}  variant="overlay"/>
        </div>
    );
}
export default OverlayChart;
