'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import LaserFlow from '../laserflow';
import sampleImage from '@/app/component/three_component/biswasBanner.jpg';
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);


const REVEAL_MASK =
  'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.65) 60px, rgba(255,255,255,0.5) 120px, rgba(255,255,255,0.1) 180px, rgba(255,255,255,0.05) 240px)';

export default function LaserFlowBoxExample() {
  const revealImgRef = useRef(null);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const el = revealImgRef.current;
    if (el) {
      el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      el.style.setProperty('--my', `${e.clientY - rect.top}px`);
    }
  };

  const handleLeave = () => {
    const el = revealImgRef.current;
    if (el) {
      el.style.setProperty('--mx', '-9999px');
      el.style.setProperty('--my', '-9999px');
    }
  };
  useEffect(() => {

    const split = new SplitText('.spiralText', {
      type: "chars, lines",
      linesClass: "cursor-target"
    });
    gsap.timeline({
      scrollTrigger: {
        trigger: ".spiralText",
        start: "top 90%",
        end: "+=250",
        scrub: true,
        // markers: true
      }
    })
      .from(split.chars, {
        rotationX: 270,
        opacity: 1,
        duration: 1,
        stagger: 0.05,
        ease: "power2.out"
      });
  }, [])


  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        width: '100%',
        height: '800px',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#5482ff',

      }}
    >
      <LaserFlow
        horizontalBeamOffset={0.3}
        verticalBeamOffset={0.0}
        color="#2d4cff"
      />

      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '0',
          width: '86%',
          height: '50%',
          padding: '5%',
          background: `linear-gradient(0deg, #cfcfff, #00005f)`,
          backgroundSize:'100% 100%',
          borderRadius: '20px',
          border: '2px solid rgba(233,233,233,1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          overflow: 'hidden'
        }}
      >
        <p className="spiralText w-full text-[clamp(16px,3vw,42px)]">
          I am passionate about my work with dedication. I focus on my work with research,
          academics and developing skills. I consider myself as a self-motivated, responsible,
          punctual, quick learner and deadline-oriented person who can work under pressure and
          able to solve problems analytically with latest technologies in minimal supervision
        </p>

        
      <div className='absolute inset-0 z-[-1] bg-[blue]/50'></div>
      </div>

      <Image
        ref={revealImgRef}
        src={sampleImage}
        alt="Reveal effect"
        fill
        sizes="100vw"
        style={{
          zIndex: 5,
          objectFit: 'cover',
          mixBlendMode: 'lighten',
          opacity: 1,
          pointerEvents: 'none',
          WebkitMaskImage: REVEAL_MASK,
          maskImage: REVEAL_MASK,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          '--mx': '-9999px',
          '--my': '-9999px'
        }}
      />
    </div>
  );
}