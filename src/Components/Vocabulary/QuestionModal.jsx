import { useState, useEffect } from "react";
import { Link } from "react-router"; // Note: In React Router v6+, this is usually "react-router-dom"
import axios from "axios";

import TestResults from "./TestResults";

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

const QuestionStatus = Object.freeze({
    UNANSWERED: "unanswered",
    CORRECT: "correct",
    INCORRECT: "incorrect"
});

export default function QuizModal() {

    const [wordList, setWordList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answerInput, setAnswerInput] = useState("");
    const [observation, setObservation] = useState("");

    const [questionStatus, setQuestionStatus] = useState(QuestionStatus.UNANSWERED);
    const [isLoading, setIsLoading] = useState(true);

    const [totalCorrect, setTotalCorrect] = useState(0);

    useEffect(() => {
        const fetchWords = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/wordlist/get-question-list/`);
                console.log(response.data)
                setWordList(response.data || []);
            } catch (error) {
                console.error("Failed to fetch wordlist", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWords();
    }, []);

    const currentWord = wordList[currentIndex];
    const isFinished = currentIndex >= wordList.length && wordList.length > 0;

    const handleSubmit = async () => {
        if (!answerInput.trim()) return;

        setObservation("Checking...")

        const response = await axios.post(`${API_BASE_URL}/evaluator/check-answer/`, {
            title: currentWord.word,
            content: currentWord.meaning,
            answer: answerInput
        });

        if (response.data.evaluation.toLowerCase() == QuestionStatus.CORRECT) {
            setTotalCorrect((prev) => prev + 1);
            setQuestionStatus(QuestionStatus.CORRECT);
        } else
            setQuestionStatus(QuestionStatus.INCORRECT);

        setObservation(response.data.observation)
    };

    const handleAdvance = () => {
        setCurrentIndex((prev) => prev + 1);
        setAnswerInput("");
        setQuestionStatus(QuestionStatus.UNANSWERED);
        setObservation("");
    };

    let cardFeedbackClass = "border-mantle shadow-lg"; // default state
    if (questionStatus === QuestionStatus.CORRECT) {
        cardFeedbackClass = "border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.15)]";
    } else if (questionStatus === QuestionStatus.INCORRECT) {
        cardFeedbackClass = "border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)]";
    }

    // Loading State
    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center text-text">Loading words...</div>;
    }

    // Completed State
    if (isFinished) {
        return (
            <TestResults
                correct={totalCorrect}
                total_questions={wordList.length}
            />
        );
    }

    // Empty state safeguard
    if (!wordList.length) {
        return <div className="min-h-screen flex items-center justify-center text-text">No words found in the database.</div>;
    }

    return (
        <div className="min-h-screen w-full bg-base flex flex-col transition-colors duration-300">
            {/* Header */}
            <div className="flex items-center justify-between px-10 py-6 border-b border-mantle">
                <div className="text-3xl font-bold text-text">
                    Vocabulary Quiz
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-text font-medium">
                        Word {currentIndex + 1} of {wordList.length}
                    </span>
                    <Link to="/">
                        <button className="px-4 py-2 rounded-lg text-sm font-medium text-blue hover:bg-blue/10 transition">
                            Home
                        </button>
                    </Link>
                </div>
            </div>

            <div className="flex-1 flex justify-center items-start">
                <div className={`
                    w-full h-fit max-w-xl
                    p-6 mt-20 rounded-xl bg-base
                    border-2 transition-all duration-300
                    ${cardFeedbackClass}
                    flex flex-col gap-5 
                `}>
                    <div className="text-sm uppercase tracking-wide font-semibold text-text">
                        What is the meaning of:
                    </div>

                    {/* The Word to guess */}
                    <div className="text-4xl font-bold text-center py-4 text-text">
                        {currentWord.title || currentWord.word}
                    </div>

                    {/* Meaning Input */}
                    <textarea
                        placeholder="Type the meaning here..."
                        value={answerInput}
                        onChange={(e) => setAnswerInput(e.target.value)}
                        disabled={questionStatus === QuestionStatus.CORRECT}
                        rows={3}
                        className={`
                            px-4 py-3 rounded-lg
                            border bg-base
                            text-text placeholder-subtext-0
                            resize-none transition-all duration-200
                            focus:outline-none focus:ring-2
                            disabled:opacity-50 disabled:cursor-not-allowed
                            ${questionStatus === QuestionStatus.CORRECT
                                ? "border-green-500/50 focus:border-green-500 focus:ring-green-500/20"
                                : questionStatus === QuestionStatus.INCORRECT
                                    ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                                    : "border-surface-0 focus:border-blue focus:ring-blue/20"
                            }
                        `}
                    />

                    <div className="flex gap-3 mt-2">
                        {/* Submit Button */}
                        {questionStatus !== QuestionStatus.CORRECT && (
                            <button
                                onClick={handleSubmit}
                                disabled={!answerInput.trim()}
                                className="
                                    flex-1 py-3 rounded-lg font-medium text-base
                                    bg-blue text-base hover:bg-blue/90
                                    disabled:bg-surface-0 disabled:text-subtext-0 disabled:cursor-not-allowed
                                    transition-all duration-200 text-text
                                "
                            >
                                Submit Answer
                            </button>
                        )}

                        {/* Skip / Next logic */}
                        <button
                            onClick={handleAdvance}
                            className={`
                                flex-1 py-3 rounded-lg font-medium text-base transition-all duration-200
                                ${questionStatus === QuestionStatus.CORRECT
                                    ? "bg-green-600 text-white hover:bg-green-700 shadow-md shadow-green-600/20"
                                    : "bg-surface-0 text-text hover:bg-surface-1"
                                }
                            `}
                        >
                            {questionStatus === QuestionStatus.CORRECT ? "Next Word" : "Skip"}
                        </button>
                    </div>

                    {/* Feedback Message */}
                    {questionStatus === QuestionStatus.UNANSWERED && (
                        <div className="text-text font-semibold text-center mt-2 animate-fade-in">
                            {observation}
                        </div>
                    )}
                    {questionStatus === QuestionStatus.CORRECT && (
                        <div className="text-green-500 font-semibold text-center mt-2 animate-fade-in">
                            {observation}
                        </div>
                    )}
                    {(questionStatus === QuestionStatus.INCORRECT) && (
                        <div className="text-red-500 font-semibold text-center mt-2 animate-fade-in">
                            {observation}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}