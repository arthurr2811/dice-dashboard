import { useState, useEffect } from "react";
import { loadState, saveState } from "../services/stateService.js";

export function useDiceData() {
    const [rolls, setRolls] = useState([]);
    const [counts, setCounts] = useState([0, 0, 0, 0, 0, 0]);
    const [sixStats, setSixStats] = useState([0, 0, 0, 0]);
    const [sixStreak, setSixStreak] = useState(0);
    const [noSixStreak, setNoSixStreak] = useState(0);
    const [longestNoSixStreak, setLongestNoSixStreak] = useState(0);

    // load initial data
    useEffect(() => {
        loadState().then((data) => {
            if (!data) return;
            setRolls(data.rolls || []);
            setCounts(data.counts || [0, 0, 0, 0, 0, 0]);
            setSixStats(data.sixStats || [0, 0, 0, 0]);
            setSixStreak(data.sixStreak || 0);
            setNoSixStreak(data.noSixStreak || 0);
            setLongestNoSixStreak(data.longestNoSixStreak || 0);
        });
    }, []);

    // add a new dice roll
    const addRoll = (n) => {
        if (n < 1 || n > 6) return;

        const updatedRolls = [...rolls, n];
        const updatedCounts = [...counts];
        updatedCounts[n - 1] += 1;

        const newSixStats = [...sixStats];
        let newSixStreak = sixStreak;
        let newNoSixStreak = noSixStreak;
        let newLongestNoSixStreak = longestNoSixStreak;

        if (n === 6) {
            newSixStreak += 1;
            newNoSixStreak = 0;
            newSixStats[0] += 1;
            if (newSixStreak === 2) newSixStats[1] += 1;
            if (newSixStreak === 3) newSixStats[2] += 1;
            if (newSixStreak === 4) newSixStats[3] += 1;
        } else {
            newSixStreak = 0;
            newNoSixStreak += 1;
            if (newNoSixStreak > newLongestNoSixStreak) {
                newLongestNoSixStreak = newNoSixStreak;
            }
        }

        setRolls(updatedRolls);
        setCounts(updatedCounts);
        setSixStats(newSixStats);
        setSixStreak(newSixStreak);
        setNoSixStreak(newNoSixStreak);
        setLongestNoSixStreak(newLongestNoSixStreak);

        saveState({
            rolls: updatedRolls,
            counts: updatedCounts,
            sixStats: newSixStats,
            sixStreak: newSixStreak,
            noSixStreak: newNoSixStreak,
            longestNoSixStreak: newLongestNoSixStreak,
        });
    };

    // reset stats
    const resetStats = () => {
        const confirmed = window.confirm("Are you sure you want to reset all statistics?");
        if (!confirmed) return;

        const fresh = {
            rolls: [],
            counts: [0, 0, 0, 0, 0, 0],
            sixStats: [0, 0, 0, 0],
            sixStreak: 0,
            noSixStreak: 0,
            longestNoSixStreak: 0,
        };

        setRolls(fresh.rolls);
        setCounts(fresh.counts);
        setSixStats(fresh.sixStats);
        setSixStreak(fresh.sixStreak);
        setNoSixStreak(fresh.noSixStreak);
        setLongestNoSixStreak(fresh.longestNoSixStreak);

        saveState(fresh);
    };

    // export rolls
    const exportRolls = () => {
        const content = rolls.join(",");
        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "diceRolls.txt";
        link.href = url;
        link.click();
    };

    // import rolls
    const importRolls = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target.result;
            const parsed = text
                .split(",")
                .map((s) => parseInt(s.trim()))
                .filter((n) => !isNaN(n) && n >= 1 && n <= 6);

            setRolls([]);
            processImportedRolls(parsed);
        };
        reader.readAsText(file);
    };

    const processImportedRolls = (newRolls) => {
        const newCounts = [0, 0, 0, 0, 0, 0];
        const newSixStats = [0, 0, 0, 0];
        let sixStreakLocal = 0;
        let noSixStreakLocal = 0;
        let longestNoSixStreakLocal = 0;

        newRolls.forEach((n) => {
            if (n < 1 || n > 6) return;
            newCounts[n - 1] += 1;
            if (n === 6) {
                sixStreakLocal += 1;
                noSixStreakLocal = 0;
                newSixStats[0] += 1;
                if (sixStreakLocal === 2) newSixStats[1] += 1;
                if (sixStreakLocal === 3) newSixStats[2] += 1;
                if (sixStreakLocal === 4) newSixStats[3] += 1;
            } else {
                sixStreakLocal = 0;
                noSixStreakLocal += 1;
                if (noSixStreakLocal > longestNoSixStreakLocal) {
                    longestNoSixStreakLocal = noSixStreakLocal;
                }
            }
        });

        setRolls(newRolls);
        setCounts(newCounts);
        setSixStats(newSixStats);
        setSixStreak(sixStreakLocal);
        setNoSixStreak(noSixStreakLocal);
        setLongestNoSixStreak(longestNoSixStreakLocal);

        saveState({
            rolls: newRolls,
            counts: newCounts,
            sixStats: newSixStats,
            sixStreak: sixStreakLocal,
            noSixStreak: noSixStreakLocal,
            longestNoSixStreak: longestNoSixStreakLocal,
        });
    };

    return {
        rolls,
        counts,
        sixStats,
        sixStreak,
        noSixStreak,
        longestNoSixStreak,
        addRoll,
        resetStats,
        exportRolls,
        importRolls,
    };
}
