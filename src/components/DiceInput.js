import { useState } from "react";

function DiceInput({ onRoll }) {
    const [input, setInput] = useState("");
    const [error, setError] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        const value = parseInt(input, 10);

        if (value >= 1 && value <= 6) {
            onRoll(value);
            setInput("");
            setError(""); // Reset error
        } else {
            setInput("");
            setError("Falsely Input (not a Number 1-6)");
        }
    };

    return (
        <div className="container">
            <h2 className="heading">➕ Add dice roll</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Youre Roll 1–6"
                />
                <button type="submit" className="button-add-roll">
                    Add
                </button>
                {error && <p>{error}</p>}
            </form>
        </div>

    );
}

export default DiceInput;
