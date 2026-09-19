'use client'
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
const HOLD_DURATION = 2; // seconds

export default function ButtonSection({
    heading = "I am passionate about my work with dedication.",
    onComplete = () => alert("✅ Task Completed!"),
}) {
    const rootRef = useRef(null);
    const buttonRef = useRef(null);

    const holdTl = useRef(null);
    const holdTimer = useRef(null);
    const startTime = useRef(0);
    const isHolding = useRef(false);
    const [overlayWith, setOverlayWidth]= useState('0')

    // Build the hold timeline once, scoped to this component's DOM.
    useEffect(() => {
        const ctx = gsap.context(() => {
            holdTl.current = gsap
            // .timeline({ paused: true, defaults: { ease: "linear" } })
            // .to(".overlay", { width: "100%", duration: HOLD_DURATION }, 0)
            // .to(".icon02", { opacity: 1, scale: 15, duration: HOLD_DURATION }, 0)
            // .to(".btn_text_group", { y: -40, duration: 0.5 }, 0);
            holdTl.current = gsap.timeline({ paused: true })
                .fromTo(
                    ".overlay",
                    { width: "10%" },
                    { width: "100%", duration: HOLD_DURATION }
                )
                .fromTo(
                    ".btn_text_group",
                    { y: -20 },
                    { y: -40, duration: HOLD_DURATION },
                    0
                )
                .fromTo(
                    ".icon02",
                    { opacity: 1, scale: 1 },
                    { opacity: 1, scale: 15, duration: HOLD_DURATION },
                    0
                );

        }, rootRef);

        return () => {
            clearTimeout(holdTimer.current);
            ctx.revert();
        };
    }, []);

    const resetHoldTl = useCallback(() => {
        holdTl.current?.pause().progress(0);
    }, []);

    const handleEnter = useCallback(() => {
        if (isHolding.current) return;
        console.log("mouse entered")
        const ctx = gsap.context(() => {
            gsap.to(".overlay", { width: "10%", duration: 0.3, ease: "linear" });
            gsap.to(".icon02", { opacity: 1, scale: 1, duration: 0.3, ease: "linear" });
            gsap.to(".btn_text_group", { y: -20, duration: 0.5 });
        }, rootRef);
        // ctx.kill(); 
        // tweens keep running; the scope was only needed for selectors
    }, []);

    const handleLeaveAnim = useCallback(() => {
        const ctx = gsap.context(() => {
            gsap.to(".overlay", { width: "0%", duration: 0.3, ease: "linear" });
            gsap.to(".icon02", { opacity: 0, scale: 1, duration: 0.3 });
            gsap.to(".btn_text_group", { y: 0, duration: 0.5 });
        }, rootRef);
        // ctx.kill();
    }, []);

    const endHold = useCallback(
        (fromLeave = false) => {
            if (!isHolding.current) {
                if (fromLeave) handleLeaveAnim();
                return;
            }
            isHolding.current = false;
            clearTimeout(holdTimer.current);
            resetHoldTl();

            const duration = (Date.now() - startTime.current) / 1000;
            console.log(`Released after ${duration.toFixed(2)}s`);

            if (fromLeave) handleLeaveAnim();
            else handleEnter(); // pointer is still over the button
        },
        [handleEnter, handleLeaveAnim, resetHoldTl]
    );

    const startHold = useCallback(
        (e) => {
            if (e.button !== undefined && e.button !== 0) return;
            e.preventDefault();
            buttonRef.current?.setPointerCapture?.(e.pointerId);

            isHolding.current = true;
            startTime.current = Date.now();
            holdTl.current?.restart();

            holdTimer.current = setTimeout(() => {
                isHolding.current = false;
                resetHoldTl();
                handleLeaveAnim();
                onComplete();
            }, HOLD_DURATION * 1000);
        },
        [handleLeaveAnim, onComplete, resetHoldTl]
    );

    return (
        <main className="h-full w-full font-josefin-slab" ref={rootRef} >
            <section className="w-full bg-[var(--text-color)] p-5">
                <div className="relative flex h-auto w-full flex-row items-center justify-between bg-[var(--bg-color)]">
                    <h1 className=" z-[2] m-0 w-1/2 p-5 text-left text-[clamp(1.2rem,1.5vw,5rem)] text-[var(--text-color)]">
                        {heading}
                    </h1>

                    <div className="my-5 h-0.5 w-[clamp(50px,30%,200px)] bg-[var(--textInvert)]" />
                    {/* ====go button======= */}
                    <div
                        ref={buttonRef}
                        role="button"
                        tabIndex={0}
                        aria-label="Press and hold to confirm"
                        onPointerDown={startHold}
                        onPointerUp={() => endHold(false)}
                        onPointerEnter={handleEnter}
                        onPointerLeave={() => endHold(true)}
                        onPointerCancel={() => endHold(true)}
                        className="group z-[9] flex w-[clamp(100px,18vw,160px)] cursor-pointer touch-none select-none items-center justify-between rounded-[35px] bg-[var(--text-color)] p-[10px] text-[var(--bg-color)]"
                    >
                        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[var(--bg-color)] text-[var(--bg-color)]">
                            <div className="icon01 absolute inset-0 flex items-center justify-center text-2xl font-bold transition-transform duration-300 ease-in-out group-hover:-translate-y-[150%] group-hover:translate-x-full motion-reduce:transition-none text-[var(--text-color)]">
                                <span>↗</span>
                            </div>
                            <div className="icon02 absolute inset-0 flex items-center justify-center text-xs font-bold  opacity-0 text-[var(--text-color)]">
                                <span>●</span>
                            </div>
                        </div>

                        <div className="flex h-5 w-[110px] flex-col items-start justify-start overflow-clip ">
                            <div className="btn_text_group ">
                                <div className="pl-[5px] text-left text-base leading-5">
                                    <em>lets go</em>
                                </div>
                                <div className="pl-[5px] text-left text-base leading-5">
                                    <em>press and hold</em>
                                </div>
                                <div className="pl-[5px] text-left text-base leading-5">
                                    <em>Almost there</em>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='overlay pointer-events-none absolute left-0 top-0 z-[5] h-full w- {overlayWith} bg-white mix-blend-difference' />
                </div>
            </section>
        </main>
    );
}