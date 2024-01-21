import React from "react";
import TodayDate from "./Date";

const Bar = () => {
  return (
    <section className="py-6 border-t border-gray-100 sm:flex sm:items-center sm:justify-between md:mx-40">
      <nav aria-label="Notif Bar" className="flex">
        <div className="flex flex-wrap justify-center text-xs lg:justify-end md:mb-0 md:mx-auto mx-4">
          <div className="absolute right-4 -mt-3 md:right-[260px] text-sm text-orange-700">
            <TodayDate/>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Bar;
