 const avatars = [
    '/avatar.png',
    '/avatar.png',
    '/avatar.png',
  ]

export function Stats(){
    return(
        <div className="bg-[#f6f6f6] border flex justify-center gap-1.5 py-6  mt-45 sm:mt-35 items-center border-y-[#e5e5e5]">
           <div className="flex ml-2">
        {avatars.map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt={`User ${index + 1}`}
            className="w-8 h-8 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover relative"
            style={{
              marginLeft: index === 0 ? '0' : '-10px',
              zIndex: 3 - index,
            }}
          />
        ))}
      </div>
            <p className="text-[#717171] text-sm">500+ people joined already</p>

        </div>
    )
}