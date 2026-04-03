import { Link } from "react-router";

export default function TestResults({ correct, total_questions }) {
    const percentage = Math.round((correct / total_questions) * 100) || 0;

    let feedbackMessage = "";
    let scoreColor = "text-text";

    if (percentage >= 80) {
        feedbackMessage = "Excellent work!";
        scoreColor = "text-green-500";
    } else if (percentage >= 50) {
        feedbackMessage = "Good effort!";
        scoreColor = "text-blue";
    } else {
        feedbackMessage = "Keep practicing!";
        scoreColor = "text-red-500";
    }

    return (
        <div className="min-h-screen w-full bg-base flex flex-col transition-colors duration-300">
            {/* Header */}
            <div className="flex items-center justify-between px-10 py-6 border-b border-mantle">
                <div className="text-3xl font-bold text-text">
                    Vocabulary Quiz
                </div>
                <div className="flex items-center gap-4">
                    <Link to="/">
                        <button className="px-4 py-2 rounded-lg text-sm font-medium text-blue hover:bg-blue/10 transition">
                            Home
                        </button>
                    </Link>
                </div>
            </div>

            <div className="flex-1 flex justify-center items-center p-6">
                <div className="w-full max-w-md p-10 rounded-2xl bg-surface-0/50 border border-mantle shadow-xl flex flex-col items-center gap-6 animate-fade-in">

                    <h2 className="text-2xl font-bold text-text tracking-wide">
                        Quiz Complete!
                    </h2>

                    {/* Score Display */}
                    <div className="flex flex-col items-center justify-center py-4">
                        <div className={`text-7xl font-extrabold ${scoreColor} drop-shadow-sm`}>
                            {percentage}%
                        </div>
                        <div className="text-subtext-0 mt-4 text-lg font-medium">
                            You got <span className="text-text font-bold">{correct}</span> out of <span className="text-text font-bold">{total_questions}</span> correct
                        </div>
                    </div>

                    <div className="text-xl font-semibold text-text text-center pb-2">
                        {feedbackMessage}
                    </div>

                    <Link to="/" className="w-full mt-2">
                        <button className="w-full py-4 rounded-xl font-bold text-base bg-blue hover:bg-blue/90 text-surface-0 shadow-lg shadow-blue/20 transition-all duration-200 active:scale-[0.98]">
                            Return to Dashboard
                        </button>
                    </Link>

                </div>
            </div>
        </div>
    );
}