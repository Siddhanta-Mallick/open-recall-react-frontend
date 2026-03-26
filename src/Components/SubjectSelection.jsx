import SubjectDropdown from "./SubjectDropdown"
import { useSubject } from "../Context/SubjectContext"
import { Link } from "react-router"

const colorMap = {
    blue: "border-blue/30 hover:bg-blue/10 hover:border-blue group-hover:text-blue",
    green: "border-green/30 hover:bg-green/10 hover:border-green group-hover:text-green",
    mauve: "border-mauve/30 hover:bg-mauve/10 hover:border-mauve group-hover:text-mauve",
    peach: "border-peach/30 hover:bg-peach/10 hover:border-peach group-hover:text-peach",
}

const GridButton = ({ title, color }) => {
    return (
        <div className={`
            group cursor-pointer
            flex flex-col items-center justify-center
            w-72 h-48
            rounded-xl border bg-base
            transition-all duration-300 ease-in-out
            hover:shadow-lg hover:scale-105
            ${colorMap[color]}
        `}>
            <div className="
                text-2xl font-semibold
                text-subtext-1
                transition-colors duration-300
            ">
                {title}
            </div>
        </div>
    )
}

export default function SubjectSelection() {

    const { subject } = useSubject();

    return (
        <div id="main-card" className="
            flex flex-col items-center
            w-3/4 mt-20 gap-10
        ">
            <SubjectDropdown />

            <div id="button-grid" className="
                grid grid-cols-2 gap-6
            ">
                <Link to={`/${subject}/add`}>
                    <GridButton title="Add Material" color="blue" />
                </Link>
                <Link to={`/${subject}/test`}>
                    <GridButton title="Take Tests" color="green" />
                </Link>
                <Link to={`/${subject}/revision`}>
                    <GridButton title="Revision" color="mauve" />
                </Link>
                <Link to={`/${subject}/edit`}>
                    <GridButton title="Edit Material" color="peach" />
                </Link>
            </div>
        </div>
    )
}