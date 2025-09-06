import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard.js";
import OverlayStats from "./OverlayStats.js";
import OverlayChart from "./OverlayChart.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/stats" element={<OverlayStats />} />
            <Route path="/chart" element={<OverlayChart />} />
        </Routes>
    </BrowserRouter>
);