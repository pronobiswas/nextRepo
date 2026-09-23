
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DirectionalScrollCard = () => {
    const carouselRefs = useRef([]);
    const animationsRef = useRef([]);

    const rows = [
        {
            direction: "left",
            speed: 30,
            items: [
                "html5",
                "css3",
                "scss",
                "bootstrap",
                "javascript",
                "tailwind-css",
                "react",
                "redux-toolkit",
                "jwt",
                "node",
                "express",
                "mongodb",
                "mongoose",
                "jwt",
                "github",
                "figma",
                "canvas",
                "svg",
                "gsap",
                "threejs",
                "r3f",
                "drie",
            ],
        },
        {
            direction: "right",
            speed: 30,
            items: [
                "canvas",
                "svg",
                "gsap",
                "threejs",
                "r3f",
                "drie",
                "html5",
                "css3",
                "scss",
                "bootstrap",
                "javascript",
                "tailwind-css",
                "react",
                "redux-toolkit",
                "jwt",
                "node",
                "express",
                "mongodb",
                "mongoose",
                "jwt",
                "github",
                "figma",
            ],
        },
    ];

    useEffect(() => {
        const animations = [];



        carouselRefs.current.forEach((track, index) => {
            if (!track) return;

            const row = rows[index];

            // Get original cards
            const cards = Array.from(
                track.children
            );

            if (!cards.length) return;



            cards.forEach((card) => {
                track.appendChild(
                    card.cloneNode(true)
                );
            });


            const totalWidth =
                track.scrollWidth / 2;

            const isRight =
                row.direction === "right";

            /*
            Starting position
            */

            gsap.set(track, {
                x: isRight
                    ? -totalWidth
                    : 0,
            });


            const animation = gsap.to(track, {
                x: isRight
                    ? 0
                    : -totalWidth,

                duration: row.speed,

                ease: "none",

                repeat: -1,

                paused: false,
            });



            animations.push(animation);



            const allCards = Array.from(
                track.children
            );

            allCards.forEach((card) => {
                const pauseAnimation = () => {
                    animation.pause();
                };

                const resumeAnimation = () => {
                    animation.resume();
                };

                card.addEventListener(
                    "mouseenter",
                    pauseAnimation
                );

                card.addEventListener(
                    "mouseleave",
                    resumeAnimation
                );

                /*
                Save listeners for cleanup
                */

                card._pauseAnimation =
                    pauseAnimation;

                card._resumeAnimation =
                    resumeAnimation;
            });
        });

        animationsRef.current = animations;


        let lastDirection = 1;

        ScrollTrigger.create({
            trigger: "#banner",
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
                const direction = self.direction;
                if (direction === lastDirection) {
                    return;
                }
                lastDirection = direction;
                animations.forEach(
                    (animation) => {
                        gsap.to(animation, {
                            timeScale: direction === 1 ? 1 : -1,
                            duration: 0.5,
                            ease: "power2.out",
                            overwrite: true,
                        });
                    }
                );
            },
        });

        return () => {
            animations.forEach(
                (animation) => {
                    animation.kill();
                }
            );

            animationsRef.current = [];

            carouselRefs.current.forEach(
                (track) => {
                    if (!track) return;

                    const cards =
                        Array.from(
                            track.children
                        );
                    cards.forEach(
                        (card) => {
                            if (
                                card._pauseAnimation
                            ) {
                                card.removeEventListener(
                                    "mouseenter",
                                    card._pauseAnimation
                                );
                            }

                            if (
                                card._resumeAnimation
                            ) {
                                card.removeEventListener(
                                    "mouseleave",
                                    card._resumeAnimation
                                );
                            }
                        }
                    );
                }
            );

            ScrollTrigger.getAll().forEach(
                (trigger) => {
                    trigger.kill();
                }
            );
        };
    }, []);

    return (
        <section
            className="w-full bg-[var(--bg-color)] overflow-x-hidden p-5"
        >
            <div className="mx-auto w-full">

                {rows.map(
                    (row, rowIndex) => (
                        <div
                            key={rowIndex}
                            className="relative overflow-hidden py-3"
                        >
                            <div
                                ref={(element) => {
                                    carouselRefs.current[
                                        rowIndex
                                    ] = element;
                                }}
                                className="flex gap-3"
                            >
                                {row.items.map(
                                    (
                                        item,
                                        index
                                    ) => (
                                        <div
                                            key={index}
                                            className="flex h-fit w-fit shrink-0 cursor-pointer items-center justify-center rounded-md border border-gray-400 px-2 py-1 md:px-4 lg:py-3 md:px-5 text-center text-[var(--text-color)] cursor-target"
                                        >
                                            <span className="text-base lg:text-lg font-medium capitalize">
                                                {item}
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )
                )}

            </div>
        </section>
    );
};

export default DirectionalScrollCard;

