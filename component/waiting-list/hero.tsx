export function Hero() {
  return (
    <div className="flex flex-col mt-16 sm:mt-25 justify-center items-center px-4 sm:px-0">
      <div className="bg-white px-2.5 font-extrabold mb-3 py-1 text-[8.5px] shadow-[0_12px_50px_10px_rgba(204,204,204,1)] rounded-full">
        LAUNCHING SOON
      </div>
      <h2 className="font-bold text-2xl sm:text-4xl text-center mb-3">
        Every Big Idea <br /> starts with a waitlist
      </h2>
      <p className="text-center mb-4 text-sm text-gray-500 max-w-md sm:max-w-none">
        Looking for a new way to have fun with your friends? Step into a world
        of unforgettable moments, and endless laughter. Create,
        share, and take on exciting challenges together. join the waitlist.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto px-4 sm:px-0">
        <input
          placeholder="name@example.com"
          className="bg-white px-4 py-2 rounded-full w-full sm:w-auto"
        />
        <button className="bg-black text-white py-2 px-3 rounded-full w-full sm:w-auto">
          Join now
        </button>
      </div>
    </div>
  );
}
