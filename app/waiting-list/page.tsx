import { Navbar } from "@/component/waiting-list/nav-bar";
import { Hero } from "@/component/waiting-list/hero";
import { Stats } from "@/component/waiting-list/stats";

export default function WaitingList() {
  return (
    <div className="bg-[#f5f5f3]  min-h-screen w-full">
        <Navbar />
        <Hero />
        <Stats />
    </div>
  );
}
