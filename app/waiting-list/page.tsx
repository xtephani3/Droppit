import { Navbar } from "@/component/waiting-list/nav-bar";
import { Hero } from "@/component/waiting-list/hero";
import { Stats } from "@/component/waiting-list/stats";

export default function WaitingList() {
  return (
    <div className="bg-[#f5f5f3] h-screen  min-h-screen w-full sm:px-14">
      <div className="sm:border-[#e5e5e5] sm:w-full h-full relative  sm:border-x">
        <Navbar />
        <Hero />
        <Stats />
      </div>
    </div>
  );
}
