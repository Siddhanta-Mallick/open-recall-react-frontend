import SubjectDropdown from "./SubjectDropdown"

const GridButton = ({ title, color }) => {
    return (
        <div className={`
            group cursor-pointer
            flex flex-col items-center justify-center
            w-72 h-48
            rounded-xl border
            transition-all duration-300 ease-in-out

            bg-base border-${color}/30
            hover:bg-${color}/10 hover:border-${color}
            hover:shadow-lg hover:scale-105
        `}>
            <div className={`
                text-2xl font-semibold
                text-subtext-1
                transition-colors duration-300
                group-hover:text-${color}
            `}>
                {title}
            </div>
        </div>
    )
}

export default function SubjectSelection() {
    return (
        <div id="main-card" className="
            flex flex-col items-center
            w-3/4 mt-20 gap-10
        ">
            <SubjectDropdown options={["Vocabulary", "DSA", "Option 3"]} />

            <div id="button-grid" className="
                grid grid-cols-2 gap-6
            ">
                <GridButton title="Edit Material" color="blue" />
                <GridButton title="Take Tests" color="green" />
                <GridButton title="Assisted Revision" color="mauve" />
                <GridButton title="Full Revision" color="peach" />
            </div>
        </div>
    )
}