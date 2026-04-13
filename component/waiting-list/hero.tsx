import { Mona_Sans } from 'next/font/google'

export const monaSans = Mona_Sans({
  weight: '700',
  subsets: ['latin'],
})

export function Hero() {
  return (
    <div className="flex flex-col pt-35 sm:pt-25 justify-center gap-5 items-center px-4 sm:px-0">
      <div className="bg-white px-4  font-mona-sans text-[#1a1a1a] py-1 text-[11px] border border-[#dedede] shadow-[0_12px_50px_10px_rgba(204,204,204,1)] rounded-full">
        LAUNCHING SOON
      </div>
      <h2 style={monaSans.style} className="font-bold text-3xl sm:text-4xl text-center">
        Every Big Idea <br /> starts with a waitlist
      </h2>
      <p className="text-center text-base  text-[#717171] max-w-md sm:max-w-none">
        Step into a world
        of unforgettable moments, and endless laughter. Create,
        share, and take on exciting challenges together.
      </p>
      <form className="flex  gap-4 mt-3 sm:mt-0 w-full sm:w-auto px-4 sm:px-0">
        <input
          placeholder="name@example.com"
          className="bg-white px-4 py-2 rounded-full text-[#1a1a1a] w-[70%] outline-0 sm:w-auto"
        />
        <button className="bg-black text-white py-2 px-3 rounded-full w-[30%] sm:w-auto">
          Join now
        </button>
      </form>
    </div>
  );
}
