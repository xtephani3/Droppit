import { Navbar } from "@/component/waiting-list/nav-bar"
import { Hero } from "@/component/waiting-list/hero"
import { Stats } from "@/component/waiting-list/stats"

export default function WaitingList(){
    return(
        <div className="bg-[#F2F1EF] h-screen">
        <Navbar/>
        <Hero/>
        <Stats/>
        </div>
        
    )
}