"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);




export default function HexagonVideo() {
    const labels = [
        { text: "HTML", x: 690, y: 145, rotate: 30 },
        { text: "CSS", x: 890, y: 460, rotate: 90 },
        { text: "JavaScript", x: 690, y: 845, rotate: -30 },
        { text: "NODE", x: 250, y: 830, rotate: 30 },
        { text: "REACT", x: 75, y: 485, rotate: -90 },
        { text: "NEXT", x: 255, y: 155, rotate: -28.8 },
    ];
    const triggerRef = useRef(null);
    const asideLeftRef = useRef(null);
    const asideRightRef = useRef(null);
    const labelListRef = useRef(null);
    const h2Ref = useRef([]);
    const h3Refs = useRef([]);
    const svgRef = useRef(null);
    const hexagonRef = useRef(null);
    const hexagonStrokeRef = useRef(null);
    const scrollIndicatorRef = useRef(null);
    const middleCircleRef = useRef(null);
    const centerElipsRef = useRef(null);
    const textMaskPathRef = useRef(null);
    const labelTextRefs = useRef([]);

    let proggress = 0;
    const [tlProggress, setTlProggress] = useState(0);

    useLayoutEffect(() => {

        const trigger = triggerRef.current;
        const asideLeft = asideLeftRef.current;
        const asideRight = asideRightRef.current;
        const svg = svgRef.current;
        const hexagon = hexagonRef.current;
        const hexagonStroke = hexagonStrokeRef.current;
        const scrollIndicator = scrollIndicatorRef.current;
        const middleCircle = middleCircleRef.current;
        const centerElips = centerElipsRef.current;
        const textMaskPath = textMaskPathRef.current;
        const labelList = labelListRef.current;
        const heading2 = h2Ref.current;
        const heading3 = h3Refs.current;
        if (!trigger || !asideLeft || !asideRight || !svg || !hexagon || !textMaskPath || !hexagonStroke || !middleCircle || !heading2 || !labelList) {
            return;
        }



        const ctx = gsap.context(() => {
            const hexagonStroke_length = textMaskPath.getTotalLength();
            const textPath_length = textMaskPath.getTotalLength();
            const middleCircle_length = middleCircle.getTotalLength();
            const svg = svgRef.current;

            const splits = heading3.map(
                (el) => el && SplitText.create(el, { type: "chars" })
            );
            splits.forEach((split) => {
                if (!split) return;
                gsap.set(split.chars, {
                    yPercent: 100,
                    autoAlpha: 0,
                    transformOrigin: "center center",
                });
            });



            gsap.set(hexagonStroke, {
                strokeDasharray: hexagonStroke_length,
                strokeDashoffset: hexagonStroke_length,
            });
            gsap.set(middleCircle, {
                strokeDasharray: middleCircle_length,
                strokeDashoffset: middleCircle_length,
            });
            gsap.set(textMaskPath, {
                strokeDasharray: textPath_length,
                strokeDashoffset: textPath_length,
            });
            gsap.set(heading2, {
                yPercent: 100,
                autoAlpha: 0,
                scaleY: 1.8,
                transformOrigin: "center center",
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: trigger,
                    start: "top top",
                    end: "+=2200",
                    scrub: true,
                    pin: true,
                    pinSpacing: true,
                    invalidateOnRefresh: true,
                    // markers: true,
                    onUpdate: (self) => {
                        setTlProggress(self.progress);
                    }

                },
            })
            tl.to(scrollIndicator, {
                rotate: 360,
                transformOrigin: "50% 100%",
                duration: 5.5,
                ease: "none",
            }).to(hexagonStroke, {
                strokeDashoffset: 0,
                duration: 6,
                ease: "none",
            }, 0).to(textMaskPath, {
                strokeDashoffset: 0,
                duration: 6,
                ease: "none",
            }, 0).to(middleCircle, {
                strokeDashoffset: 0,
                duration: 6,
                ease: "none",
            }, 0).to(middleCircle, {
                opacity: 0,
                duration: 1,
                ease: "none",
            }).to(textMaskPath, {
                opacity: 0,
                duration: 1,
                ease: "none",
            }, "<").to(hexagonStroke, {
                opacity: 0,
                duration: 1,
                ease: "none",
            }, "<").to(scrollIndicator, {
                opacity: 0,
                duration: 1,
                ease: "none",
            }, "<").to(hexagon, {
                opacity: 0,
                duration: 1,
                ease: "none",
            }, "<").to(centerElips, {
                opacity: 0,
                duration: 1,
                ease: "none",
            }, "<").to(asideLeft, {
                width: 0,
                duration: 1,
                ease: "none",
            }).to(asideRight, {
                width: "100%",
                duration: 1,
                ease: "none",
            }, "<")
                .to(asideRight, {
                    scale: "5",
                    duration: 2,
                    ease: "none",
                })
            splits.forEach((split, i) => {
                if (!split) return;
                tl.to(
                    split.chars,
                    {
                        yPercent: 0,
                        autoAlpha: 1,
                        scaleY:1,
                        stagger: 0.05,
                        duration: 0.51,
                        ease: "back.inOut",
                    }
                )
            });

            const totalDuration = 6;
            const labelCount = heading2.length;

            if (labelCount > 0) {
                const segmentDuration = totalDuration / labelCount;

                heading2.forEach((heading, index) => {
                    const start = index * segmentDuration;
                    tl.to(
                        heading,
                        {
                            yPercent: 0,
                            autoAlpha: 1,
                            scaleY: 1.2,
                            duration: segmentDuration * 0.25,
                            // ease: "elastic.out(1,0.3)",
                            ease: "none",
                        },
                        start
                    );
                    if (index < labelCount - 1) {

                        tl.to(
                            heading,
                            {
                                yPercent: -100,
                                autoAlpha: 0,
                                scaleY: 1.2,
                                duration: segmentDuration * 0.25,
                                ease: "none",
                            },
                            start + segmentDuration * 0.75
                        );
                    }

                });
            }

        }, triggerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={triggerRef}
            className="relative w-full h-screen flex items-center justify-center overflow-clip"
        >


            <div className="relative w-full h-fit p-0 bg-black">
                {/* ======ending text==== */}
                <div className="absolute inset-0 z-50 w-full h-full object-cover  flex flex-col items-center justify-center">
                    {["GSAP", "SVG"].map((text, i) => (
                        <h3
                            key={i}
                            ref={(el) => {
                                if (el) h3Refs.current[i] = el;
                            }}
                            className="text-[8vw] font-bold"
                        >
                            {text}
                        </h3>
                    ))}
                </div>

                <div className=" textBox  w-full h-fit min-h-[80vh] flex text-white  overflow-hidden">
                    <aside ref={asideLeftRef} className="relative w-1/2 h-initial bg-black flex items-center justify-center shrink-0">
                        <div className="w-full h-24 flex flex-col">
                            <ul ref={labelListRef} className="w-full h-full relative">
                                {labels.map((label, i) => (
                                    <li
                                        key={label.text}
                                    >
                                        <h2
                                            ref={(el) => {
                                                if (el) h2Ref.current[i] = el;
                                            }}
                                            className="text-[8vw] leading-[0.8] absolute bottom-0 p-5"
                                        >

                                            {label.text}
                                        </h2>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                    <aside ref={asideRightRef} className="SvgBox w-1/2 h-initial bg-black flex items-center justify-center z-40 relative p-0">
                        <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 968 968" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xl p-0">

                            <defs>
                                <clipPath
                                    id="clip0"
                                    clipPathUnits="userSpaceOnUse"
                                >
                                    <rect width="968" height="968" />
                                </clipPath>
                            </defs>
                            <foreignObject
                                x="5"
                                y="5"
                                width="960"
                                height="960"
                                clipPath="url(#hexClip)"
                            >

                                <video
                                    src='/video_1.mp4'
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover"
                                />

                            </foreignObject>


                            <g clipPath="url(#clip0)" x="0" y="0">
                                {/* ===Hexagon==== */}
                                <path ref={hexagonRef} d="M878 262L480 45.5L89.5 262V702.5L489.5 925.5L878 702.5V262Z" fill="#000000" fillOpacity="1" stroke="rgba(15,15,15,1)" strokeWidth="5" />
                                <path ref={hexagonStrokeRef} d="M481 48.5L875.5 263L875 701.5L489.5 921.5L91.5 701.5V263L481 48.5Z" fill="none" stroke="rgba(255,255,255,1)" strokeWidth="5" />
                                {/* ====scroll Idicator==== */}
                                <path ref={scrollIndicatorRef} d="M330 24L483.909 486.654L644.6 24L330 24Z" fill="white" fillOpacity="0.7" />
                                {/* ===middle circle=== */}
                                <circle ref={middleCircleRef} cx="486.135" cy="486.598" r="80" fill="black" stroke="white" strokeWidth="3" transform="rotate(-90 486.135 486.598)" />
                                {/* ====centerDot=== */}
                                <ellipse ref={centerElipsRef} cx="486.135" cy="486.598" rx="10.0833" ry="9.92822" fill="white" />
                                {/* ===Hexagon mask==== */}
                                <path d="M0 0H968V401.821L877.754 702.808V261.662L480.975 45.375L88.7333 261.662V702.808L489.546 924.137L877.754 702.808L968 401.821V968H0V0Z" fill="black"  />
                                {/* ===text mask== */}
                                {/* <path d="M911 241L478.5 7L56 241V726L489 964.5L911 726V241Z" stroke="green" strokeWidth="40" /> */}
                            </g>


                            <defs>

                                {/* TEXT MASK */}

                                <mask
                                    id="textMask"
                                    maskUnits="userSpaceOnUse"
                                    maskContentUnits="userSpaceOnUse"
                                    x="0"
                                    y="0"
                                    width="968"
                                    height="968"
                                >

                                    <path
                                        ref={textMaskPathRef}
                                        d="
                                                M484 7
                                                L911 241
                                                L911 726
                                                L489 964.5
                                                L56 726
                                                L56 241
                                                Z"
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="220"
                                        strokeLinecap="round"
                                    />


                                </mask>

                            </defs>

                            <g mask="url(#textMask)">

                                {labels.map((label) => (
                                    <text
                                        key={label.text}
                                        fontSize="32"
                                        x={label.x}
                                        y={label.y}
                                        textAnchor="middle"
                                        fill="white"
                                        transform={`
                                                rotate(
                                                    ${label.rotate}
                                                    ${label.x}
                                                    ${label.y}
                                                )
                                            `}
                                    >
                                        {label.text}
                                    </text>
                                ))}

                            </g>

                        </svg>


                    </aside>


                </div>


            </div>

        </section>
    );
}