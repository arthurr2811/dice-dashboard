import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.js";
import OverlayStats from "./OverlayStats.js";
import OverlayChart from "./OverlayChart.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/stats" element={<OverlayStats />} />
            <Route path="/chart" element={<OverlayChart />} />
        </Routes>
    </BrowserRouter>
);