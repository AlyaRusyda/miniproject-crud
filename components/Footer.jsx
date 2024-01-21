import Link from "next/link";
import React from "react";
import FooterSosmed from "./FooterSosmed";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer aria-label="Site Footer" className="bg-gray-100">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center text-black-600 text-3xl font-bold">
          <Link href="/" prefetch={false}>
            <h1
              className="
          text-4xl text-center"
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

        <p className="mx-auto mt-4 max-w-md text-center leading-relaxed text-gray-500">
          &copy; {currentYear} by Alya Rusyda. All rights reserved.
        </p>
        <FooterSosmed />
      </div>
    </footer>
  );
};

export default Footer;
