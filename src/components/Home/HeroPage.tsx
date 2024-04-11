import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

import heroImage from '../../../public/heroImage.gif';

export default function HeroPage() {
  return (
    <div className="text-white bg-black">
      <div className="justify-center relative min-h-screen xl:bg-transparent flex flex-col xl:flex-row items-center xl:min-h-screen">
        <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
          <div className="flex flex-col mb-16 sm:text-center sm:mb-0">
            <Link href="/">
              <div className="mb-6 sm:mx-auto">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-deep-purple-accent-400">
                  <svg
                    className="w-10 h-10 text-white"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                  >
                    <polygon
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"
                    />
                  </svg>
                </div>
              </div>
            </Link>
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight sm:text-4xl">
                <span className="relative inline-block">
                  The quick, brown fox jumps over a lazy dog
                </span>
              </h2>
              <p className="text-base text-white md:text-lg">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque rem aperiam, eaque ipsa quae.
              </p>
            </div>
            <div>
              <Link
                href={"/"}
                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-black transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none bg-slate-100 hover:bg-slate-200"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom decorative shape */}
      <div className="custom-shape-divider-top-1712719238">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            className="shape-fill"
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          />
        </svg>
      </div>
    </div>
  );
}
