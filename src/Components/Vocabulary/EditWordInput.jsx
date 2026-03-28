import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

export default function EditWordInput() {
    const [word, setWord] = useState("");
    const [meaning, setMeaning] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        const { state: { pk } } = location;

        async function fetchWord() {
            const response = await axios.get(`${API_BASE_URL}/wordlist/get-by-pk/`, {
                params: {
                    pk: pk
                }
            });
            setWord(response.data.word);
            setMeaning(response.data.meaning);
            console.log(response.data);
        }
        fetchWord()

    }, [])

    const handleEdit = async () => {
        if (!word.trim() || !meaning.trim()) return;

        const { state: { pk } } = location;

        const response = await axios.post(`${API_BASE_URL}/wordlist/edit/`, {
            pk: pk,
            title: word,
            content: meaning
        });

        setWord("");
        setMeaning("");

        navigate("/vocabulary/edit");
    };

    return (
        <div className="min-h-screen w-full bg-base flex flex-col">

            <div className="flex items-center justify-between px-10 py-6 border-b border-mantle">
                <div className="text-3xl font-bold text-text">
                    Vocabulary
                </div>
                <Link to="/">
                    <button className="px-4 py-2 rounded-lg text-sm font-medium text-blue hover:bg-blue/10 transition">
                        Home
                    </button>
                </Link>
            </div>

            <div className="flex-1 flex justify-center items-start">

                <div className="
                    w-full h-fit max-w-xl
                    p-6 mt-20 rounded-xl
                    border border-mantle
                    bg-base shadow-sm
                    flex flex-col gap-5
                ">
                    <div className="text-2xl font-semibold text-text">
                        Edit Word
                    </div>

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
                        onClick={handleEdit}
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
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}