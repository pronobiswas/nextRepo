
'use client';

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const Banner = () => {
    const bannerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            // Select both headings
            const headings = gsap.utils.toArray('.banner-heading');

            // Split each heading into characters
            const splits = headings.map((heading) => {
                return new SplitText(heading, {
                    type: 'lines,chars',
                    mask: "lines",
                });
            });

            // Animate characters
            splits.forEach((split) => {
                gsap.from(split.lines, {
                    y: 150,
                    duration: 0.8,
                    stagger: 0.06,
                    ease: 'power3.out',
                });
            });
            gsap.to('.fromLeft', {
                x: '-100%',
                duration: 1,
                ease: 'power3.out',
                delay:0.5
            });
            gsap.to('.fromRight', {
                x: '100%',
                duration: 1,
                ease: 'power3.out',
                delay:0.5
            });

        }, bannerRef);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <section className="w-full p-5">
            <div ref={bannerRef} className="text-white">

                {/* First Heading */}
                <div className="w-full border-b border-white overflow-hidden relative">
                    <h1 className="banner-heading cursor-target text-[8vw] w-fit">
                        Pronob biswas
                    </h1>
                    <div className="fromLeft absolute top-0 left-0 w-full h-full bg-black z-[-1]"></div>
                </div>

                {/* Second Heading */}
                <div className="w-full border-b border-white flex justify-end overflow-hidden relative">
                    <h1 className="banner-heading cursor-target text-[8vw] w-fit">
                        web developer
                    </h1>
                    <div className="fromRight absolute top-0 left-0 w-full h-full bg-black z-[-1]"></div>
                </div>

            </div>
        </section>
    );
};

export default Banner;

