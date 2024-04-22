import Image from 'next/image'
import React from 'react'
import startup from "../../../public/startup.png"

export default function HeroPage() {
  return (
    <div className="bg-gradient-to-b from-[#25092e] relative to-[#0a0009]">


      <section className="relative lg:min-h-[80vh] pt-24 pb-10 sm:pt-32 sm:pb-16 lg:pb-24">
        <div className="absolute opacity-25 inset-x-0 bottom-0 z-10 hidden lg:flex">
          <Image className="" width={800} src={startup} alt="" />
        </div>

        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-xl mx-auto text-center">
            <h1 className="text-4xl font-bold sm:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-white">  Admin Dashboard for free </span>
            </h1>
            <p className="mt-5 text-base text-white sm:text-xl">E-commerce Dashboard. Take this as a template for your next project</p>

            <a href="#" title="" className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-white transition-all duration-200 bg-purple-600 rounded-lg sm:mt-16 hover:bg-blue-700 focus:bg-blue-700" role="button">
              Get Started
              <svg className="w-6 h-6 ml-8 -mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </a>

          </div>
        </div>
      </section>
    </div>

  )
}
