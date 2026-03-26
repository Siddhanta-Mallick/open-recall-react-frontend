import { useState } from "react";
import { useSubject } from "../Context/SubjectContext";

const ChevronDown = ({ isOpen }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`
            w-6 h-6 ml-3
            transition-transform duration-300
            ${isOpen ? "rotate-180" : ""}
        `}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
        />
    </svg>
);

const SubjectDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { subject, setSubject, subjectOptions } = useSubject();

    const handleSelect = (option) => {
        setSubject(option);
        setIsOpen(false);
    };

    return (
        <div className="relative w-fit">
            {/* Button */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="
                    group cursor-pointer
                    flex items-center justify-between
                    px-6 py-3

                    text-6xl font-semibold text-text
                    rounded-xl

                    bg-base border border-mantle
                    hover:border-sapphire hover:bg-sapphire/5
                    transition-all duration-300
                "
            >
                <span className="transition-colors duration-300 group-hover:text-sapphire">
                    {subject}
                </span>
                <ChevronDown isOpen={isOpen} />
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    className="
                        absolute z-10 mt-3 w-full
                        rounded-xl border border-mantle
                        bg-base shadow-lg

                        overflow-hidden
                        animate-fadeIn
                    "
                >
                    {subjectOptions.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => handleSelect(option)}
                            className="
                                px-6 py-3
                                cursor-pointer

                                text-lg text-subtext-1
                                transition-all duration-200

                                hover:bg-sapphire/10
                                hover:text-sapphire
                            "
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SubjectDropdown;