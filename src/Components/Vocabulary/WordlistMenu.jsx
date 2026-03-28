import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { apiService } from "../../apiService";

const WordEntry = ({ word, meaning, edit }) => {
    return (
        <div className="flex items-center justify-between px-6 py-4 rounded-lg border border-mantle bg-base hover:shadow-md hover:border-blue/40 transition-all duration-200">
            <div className="flex flex-col">
                <span className="text-lg font-semibold text-text">
                    {word}
                </span>
                <span className="text-sm text-subtext-1">
                    {meaning}
                </span>
            </div>

            <div className="flex gap-4">
                <button
                    className="text-sm px-3 py-1 rounded-md text-blue hover:bg-blue/10 transition"
                    onClick={(e) => edit()}>
                    Edit
                </button>
                <button className="text-sm px-3 py-1 rounded-md text-red hover:bg-red/10 transition">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default function WordlistMenu() {
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchWords = async () => {
            try {
                const data = await apiService.viewMaterial({ subject: "wordlist" });
                if (data) {
                    setWords(data);
                }
            } catch (error) {
                console.error("Failed to fetch words:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWords();
    }, []);

    function handleEditWord(pk) {
        console.log("primary key to edit : " + pk)
        navigate("/vocabulary/edit-input", { state: { pk: pk } })
    }

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-base text-text">
                Loading vocabulary...
            </div>
        );
    }

    return (
        <div className="h-screen w-full bg-base flex flex-col overflow-hidden">

            <div className="flex items-center justify-between px-10 py-6 border-b border-mantle shrink-0">
                <div className="text-3xl font-bold text-text">
                    Vocabulary
                </div>
                <Link to="/">
                    <button className="px-4 py-2 rounded-lg text-sm font-medium text-blue hover:bg-blue/10 transition">
                        Home
                    </button>
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto flex justify-center py-10">

                <div className="w-full max-w-2xl flex flex-col gap-4 px-4">

                    {words.length > 0 ? (
                        words.map((e, index) => (
                            <WordEntry
                                key={e.pk}
                                word={e.title || e.word}
                                meaning={e.content || e.meaning}
                                edit={() => handleEditWord(e.pk)}
                            />
                        ))
                    ) : (
                        <div className="text-center text-subtext-1 mt-10">
                            No words found. Add some!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}