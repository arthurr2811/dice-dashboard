import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import StatsOverview from "./components/StatsOverview.js";

const SERVER = "http://localhost:4000";

function OverlayStats() {
    const [data, setData] = useState(null);
    useEffect(() => {
        const socket = io(SERVER);
        socket.on("stateUpdate", (newState) => {
            setData(newState);
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    if (!data) return <div style={{ color: "white" }}>Loading...</div>;
    return (
        <div>
            <StatsOverview
                rolls={data.rolls}
                sixStats={data.sixStats}
                longestNoSixStreak={data.longestNoSixStreak}
                showResetButton={false}
                variant={"overlay"}
            />
        </div>
    );
}
export default OverlayStats;
