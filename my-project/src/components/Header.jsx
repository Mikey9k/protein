import FilterBar from './FilterBar';
import { GiGorilla } from "react-icons/gi";

export default function Header() {
    return (
        <div>
            <div className="flex flex-col items-center cursor-pointer" onClick={() => window.location.reload()}>
                <div className="flex items-center mt-4 mb-4">
                    <GiGorilla size={70} color='white' />
                    <span className="font-bold text-white text-4xl ml-2">ProteinBuddy</span>
                </div>
         
            </div>
            <div className="flex flex-col items-center">

                <hr className="w-full border-t-1 border-white mb-4" />

                <h2 className="text-xl md:text-2xl lg:text-4xl font-semibold text-white mb-4">
                    What type of protein are you looking for?
                </h2>
                
            </div>
        </div>
    );
}