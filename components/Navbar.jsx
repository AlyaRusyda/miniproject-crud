"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Bar from "./Bar";
import TodayDate from "./Date";

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 0 ? setSticky(true) : setSticky(false);
    });
  }, []);
  return (
    <>
      <nav
        className={`fixed w-full left-0 top-0 z-[999] md:px-24 ${
          sticky
            ? "bg-white/90 w-full fixed md:drop-shadow-md"
            : "bg-white w-full fixed"
        }`}
      >
        <Bar />
      </nav>
      <header>
        <div className="p-8 items-center mt-20 md:mt-12">
          <Link href="/" prefetch={false}>
            <h1
              className="font-bold
          md:text-4xl text-2xl text-center"
            >
              E{" "}
              <span
                className="underline 
            decoration-6 decoration-orange-400"
              >
                Shopper
              </span>{" "}
            </h1>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Navbar;
