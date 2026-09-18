
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
            const headings = gsap.utils.toArray('.custom_pattern_1');

            // Split each heading into characters
            const splits = headings.map((heading) => {
                return new SplitText(heading, {
                    type: 'lines,words',
                    mask: "lines",
                    wordsClass: 'h1_word_mask',
                });
            });
            let tl = gsap.timeline()

            
            tl.to('.fromLeft', {
                scaleX: '0',
                duration: 1,
                ease: 'power1.out',
                delay:0.05,
            });
            tl.to('.fromRight', {
                scaleX: '0',
                duration: 1,
                ease: 'power1.out',
                delay:0.05
            },'<');
            // Animate characters
            splits.forEach((split) => {
                tl.from(split.words, {
                    yPercent: 150,
                    duration: 0.1,
                    stagger: 0.06,
                    ease: 'power1.out',
                });
            });

        }, bannerRef);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <section className="w-full bg-[var(--bg-color)]">
            <div ref={bannerRef} className=" w-full p-5">

                {/* First Heading */}
                <div className="w-full border-b border-[var(--text-color)] overflow-hidden relative">
                    <h1 className="custom_pattern_1 cursor-target  text-[8vw] w-fit">
                        Pronob biswas
                    </h1>
                    <div className="fromLeft absolute top-0 left-0 w-full h-full bg-[var(--text-color)] z-[111] origin-right"></div>
                </div>

                {/* Second Heading */}
                <div className="w-full border-b border-white flex justify-end overflow-hidden relative">
                    <h1 className=" custom_pattern_1 cursor-target text-[8vw] w-fit">
                        web developer
                    </h1>
                    <div className="fromRight absolute top-0 left-0 w-full h-full bg-[var(--text-color)] z-[111] origin-left"></div>
                </div>

            </div>
        </section>
    );
};

export default Banner;

