'use client';
 
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import LaserFlow from '../laserflow';
import sampleImage from '@/app/component/three_component/biswas.jpg';
import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger,SplitText);


const REVEAL_MASK =
  'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,0.9) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)';

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
  useEffect(()=>{

    const split = new SplitText('.spiralText', { 
      type: "chars, lines" ,
      linesClass:"cursor-target"
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
  },[])
   

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        height: '800px',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#120F17'
      }}
    >
      <LaserFlow
        horizontalBeamOffset={0.3}
        verticalBeamOffset={0.0}
        color="#CF9EFF"
      />

      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '0',
          width: '86%',
          height: '50%',
          padding:'5%',
          backgroundColor: 'rgba(2,2,2,0.7)',
          borderRadius: '20px',
          border: '2px solid #FF79C6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 6
        }}
      >
        <p className="spiralText w-full text-[clamp(16px,3vw,42px)]">
          I am passionate about my work with dedication. I focus on my work with research,
          academics and developing skills. I consider myself as a self-motivated, responsible,
          punctual, quick learner and deadline-oriented person who can work under pressure and
          able to solve problems analytically with latest technologies in minimal supervision
        </p>
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