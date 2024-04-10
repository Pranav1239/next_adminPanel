import React from "react";
import Image from "next/image";
import { ContainerScroll } from "../ui/container-scroll-animation";

export function Hero2Dasboard() {
    return (
        <div className="flex flex-col bg-black text-white overflow-hidden">
            <ContainerScroll
                titleComponent={
                    <>
                        <h1 className="text-4xl font-semibold dark:text-white">

                            Preview of the Dashboard<br />
                            <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                                Scroll Animations
                            </span>
                        </h1>
                    </>
                }
            >
                <Image
                    src={`/linear.webp`}
                    alt="hero"
                    height={720}
                    width={1400}
                    className="mx-auto rounded-2xl object-cover h-full object-left-top"
                    draggable={false}
                />
            </ContainerScroll>
        </div>
    );
}
