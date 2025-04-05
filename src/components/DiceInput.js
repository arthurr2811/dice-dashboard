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
            alert("Number has to be 1-6");
        }
    };

    return (
        <div className="container">
            <h2 className="heading">➕ Add dice roll</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="number"
                    min="1"
                    max="6"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="border p-2 rounded mr-2"
                />
                <button type="submit" className="button-add-roll">
                    Add
                </button>
            </form>
        </div>

    );
}

export default DiceInput;
