import { useState } from "react";

function DiceInput({ onRoll }) {
    const [input, setInput] = useState("");
    const [error, setError] = useState("ready...");


    const handleSubmit = (e) => {
        e.preventDefault();
        const value = parseInt(input, 10);

        if (value >= 1 && value <= 6) {
            onRoll(value);
            setInput("");
            setError("ready..."); // Reset error
        } else {
            setInput("");
            setError("Only numbers 1–6 are allowed.");
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
                    className="border p-2 rounded mr-2 w-24"
                    placeholder="Youre Roll 1–6"
                />
                <button type="submit" className="button-add-roll">
                    Add
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
        </div>

    );
}

export default DiceInput;
