import { useState } from "react";
import { apiService } from "../../apiService";
import { useSubject } from "../../Context/SubjectContext";
import { useNavigate, Link } from "react-router";

export default function AddWord({ onAdd }) {
    const [word, setWord] = useState("");
    const [meaning, setMeaning] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!word.trim() || !meaning.trim()) return;

        if (onAdd) {
            onAdd({ word, meaning });
        }

        await apiService.addMaterial({
            subject: "wordlist",
            title: word,
            content: meaning
        });

        setWord("");
        setMeaning("");

        navigate("/");
    };

    return (
        <div className="min-h-screen w-full bg-base flex flex-col">

            {/* Header */}
            <div className="flex items-center justify-between px-10 py-6 border-b border-mantle">
                <div className="text-3xl font-bold text-text">
                    Add Vocabulary
                </div>
                <Link to="/">
                    <button className="px-4 py-2 rounded-lg text-sm font-medium text-blue hover:bg-blue/10 transition">
                        Home
                    </button>
                </Link>
            </div>

            {/* Centered Content Wrapper */}
            <div className="flex-1 flex justify-center items-start">

                <div className="
                    w-full h-fit max-w-xl
                    p-6 mt-20 rounded-xl
                    border border-mantle
                    bg-base shadow-sm
                    flex flex-col gap-5
                ">
                    <div className="text-2xl font-semibold text-text">
                        Add New Word
                    </div>

                    {/* Word Input */}
                    <input
                        type="text"
                        placeholder="Enter word..."
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                        className="
                            px-4 py-3 rounded-lg
                            border border-surface-0
                            bg-base
                            text-text placeholder-subtext-0

                            focus:outline-none
                            focus:border-blue focus:ring-2 focus:ring-blue/20

                            transition-all duration-200
                        "
                    />

                    {/* Meaning Input */}
                    <textarea
                        placeholder="Enter meaning..."
                        value={meaning}
                        onChange={(e) => setMeaning(e.target.value)}
                        rows={3}
                        className="
                            px-4 py-3 rounded-lg
                            border border-surface-0
                            bg-base
                            text-text placeholder-subtext-0

                            resize-none
                            focus:outline-none
                            focus:border-blue focus:ring-2 focus:ring-blue/20

                            transition-all duration-200
                        "
                    />

                    {/* Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={!word.trim() || !meaning.trim()}
                        className="
                            mt-2 py-3 rounded-lg
                            font-medium text-base

                            bg-blue text-base
                            hover:bg-blue/90

                            disabled:bg-surface-0
                            disabled:text-subtext-0
                            disabled:cursor-not-allowed

                            transition-all duration-200
                        "
                    >
                        Add Word
                    </button>
                </div>
            </div>
        </div>
    );
}