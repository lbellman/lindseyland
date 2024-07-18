import Image from "next/image";

export default function Home() {
  return (
    <div className="relative flex flex-col flex-nowrap">
      {/* Image */}
      <div className="md:w-sidebar w-screen fixed top-0 opacity-90 h-screen min-h-screen bg-cover bg-right bg-no-repeat bg-[url('/static/purple_mountain.JPG')]" />
      {/* Topbar */}
      <div className="w-full pt-3 sticky top-0 px-3 h-topbar z-20">
        <div className="flex h-[60px] rounded-full sticky top-0 opacity-90 flex-nowrap items-center p-5 bg-card">
          <p className="font-bold text-secondary-foreground">LINDSEYLAND</p>
        </div>
      </div>
      <div className=" z-10 h-screen w-screen">
        <div className="flex mt-10 justify-center w-full">
          <div className="flex flex-col p-10 max-w-screen-lg md:grid md:grid-cols-2 gap-10  w-full">
            {[1, 2, 3, 4].map((i) => {
              return (
                <div
                  className="bg-primary aspect-square opacity-90 rounded-3xl"
                  key={i}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
