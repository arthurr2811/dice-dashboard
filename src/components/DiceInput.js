import { useState } from "react";

function DiceInput({ onRoll }) {
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const value = parseInt(input, 10);
        if (value >= 1 && value <= 6) {
            onRoll(value);
            setInput("");
        } else {
            alert("Bitte eine Zahl von 1 bis 6 eingeben");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="number"
                min="1"
                max="6"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="border p-2 rounded mr-2"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Würfelergebnis hinzufügen
            </button>
        </form>
    );
}

export default DiceInput;
