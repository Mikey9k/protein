import FilterBar from './FilterBar';
import { GiGorilla } from "react-icons/gi";

export default function Header() {
    return (
        <div className="flex flex-col items-center">
            <div className="flex items-center mt-4 mb-4">
                <GiGorilla size={70} color='white' />
                <span className="font-bold text-white text-4xl ml-2">ProteinBuddy</span>
            </div>
            <FilterBar />
        </div>
    );
}