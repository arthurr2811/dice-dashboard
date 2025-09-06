const SERVER = "http://localhost:4000";

export async function loadState() {
    try {
        const res = await fetch(`${SERVER}/state`);
        if (!res.ok) throw new Error("Failed to load state");
        return await res.json();
    } catch (e) {
        console.warn("State could not be loaded:", e);
        return null;
    }
}

export async function saveState(stateObj) {
    try {
        const res = await fetch(`${SERVER}/state`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(stateObj),
        });
        if (!res.ok) throw new Error("Failed to save state");
    } catch (e) {
        console.warn("State could not be saved:", e);
    }
}
