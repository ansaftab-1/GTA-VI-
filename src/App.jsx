import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

function App() {
  const [showContent, setShowContent] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(true);

  useGSAP(() => {
    // Initial states to prevent flash
    gsap.set(".main", { scale: 1.7, rotate: -10, opacity: 0 });
    gsap.set(".sky", { scale: 1.5, rotate: -20 });
    gsap.set(".bg", { scale: 1.8, rotate: -3 });
    gsap.set(".character", { bottom: "-150%", scale: 3, rotate: -20 });
    gsap.set(".text", { scale: 1.4, rotate: -10 });

    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 15,
      duration: 2,
      ease: "power4.inOut",
      transformOrigin: "50% 50%",
    })
    .to(".vi-mask-group", {
      scale: 30, // Much larger scale to ensure full coverage
      duration: 2,
      delay: -1.5,
      ease: "expo.inOut",
      transformOrigin: "50% 50%",
      onStart: () => {
        setShowContent(true);
      },
      onUpdate: function() {
        if (this.progress() > 0.1) {
          gsap.to(".main", { opacity: 1, duration: 0.1 });
        }
      }
    })
    .to(".svg-container", {
      opacity: 0,
      duration: 0.8,
      delay: -0.5,
      ease: "power2.inOut",
      onComplete: () => setLoaderVisible(false)
    });

  }, []);

  useGSAP(() => {
    if (!showContent) return;

    const mainTl = gsap.timeline();

    mainTl.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2.5,
      ease: "expo.inOut",
    }, "start")
    .to(".sky", {
      scale: 1.1,
      rotate: 0,
      duration: 2.5,
      ease: "expo.inOut",
    }, "start")
    .to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2.5,
      ease: "expo.inOut",
    }, "start")
    .to(".character", {
      scale: 1.4,
      x: "-50%",
      bottom: "-25%",
      rotate: 0,
      duration: 2.5,
      ease: "expo.inOut",
    }, "start")
    .to(".text", {
      scale: 1,
      rotate: 0,
      duration: 2.5,
      ease: "expo.inOut",
    }, "start");

    const handleMouseMove = (e) => {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".main .text", { x: `${xMove * 0.4}%`, duration: 0.8 });
      gsap.to(".sky", { x: xMove, duration: 1.2 });
      gsap.to(".bg", { x: xMove * 1.7, duration: 1.5 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [showContent]);

  return (
    <div className="bg-black w-full min-h-screen overflow-x-hidden">
      {loaderVisible && (
        <div className="svg-container fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-black flex items-center justify-center">
          <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
            <defs>
              <mask id="viMask">
                <rect width="100%" height="100%" fill="black" />
                <g className="vi-mask-group">
                  <text x="50%" y="50%" fontSize="250" textAnchor="middle" fill="white" dominantBaseline="middle" fontFamily="Arial Black">VI</text>
                </g>
              </mask>
            </defs>
            <image href="/bg.png" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" mask="url(#viMask)" />
          </svg>
        </div>
      )}
      
      <div className={`main w-full ${!showContent ? 'pointer-events-none' : ''}`} style={{ visibility: showContent ? 'visible' : 'hidden' }}>
        <div className="landing overflow-hidden relative w-full h-screen bg-black">
          <div className="navbar absolute top-0 left-0 z-[10] w-full py-10 px-10">
            <div className="logo flex gap-7">
              <div className="lines flex flex-col gap-[5px]">
                <div className="line w-15 h-2 bg-white"></div>
                <div className="line w-8 h-2 bg-white"></div>
                <div className="line w-5 h-2 bg-white"></div>
              </div>
              <h3 className="text-4xl -mt-[8px] leading-none text-white">
                Rockstar
              </h3>
            </div>
          </div>

          <div className="imagesdiv relative overflow-hidden w-full h-screen">
            <img
              className="absolute sky scale-[1.5] rotate-[-20deg] top-0 left-0 w-full h-full object-cover"
              src="/sky.png"
              alt=""
            />
            <img
              className="absolute scale-[1.8] rotate-[-3deg] bg top-0 left-0 w-full h-full object-cover"
              src="/bg.png"
              alt=""
            />
            <div className="text text-white flex flex-col gap-3 absolute top-20 left-1/2 -translate-x-1/2 scale-[1.4] rotate-[-10deg]">
              <h1 className="text-[12rem] leading-none -ml-40">grand</h1>
              <h1 className="text-[12rem] leading-none ml-20">theft</h1>
              <h1 className="text-[12rem] leading-none -ml-40">auto</h1>
            </div>
            <img
              className="absolute character -bottom-[150%] left-1/2 -translate-x-1/2  scale-[3] rotate-[-20deg]"
              src="/girlbg.png"
              alt=""
            />
          </div>
          <div className="btmbar text-white absolute bottom-0 left-0 w-full py-15 px-10 bg-gradient-to-t from-black to-transparent">
            <div className="flex gap-4 items-center">
              <i className="text-4xl ri-arrow-down-line"></i>
              <h3 className="text-xl font-[Helvetica_Now_Display]">
                Scroll Down
              </h3>
            </div>
            <img
              className="absolute h-[55px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              src="/ps5.png"
              alt=""
            />
          </div>
        </div>
        <div className="w-full h-screen flex items-center justify-center bg-black">
          <div className="cntnr flex text-white w-full h-[80%] ">
            <div className="limg relative w-1/2 h-full">
              <img
                className="absolute scale-[1.3] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src="/imag.png"
                alt=""
              />
            </div>
              <div className="rg w-[30%] py-30">
                <h1 className="text-8xl px-2">Still Running,</h1>
                <h1 className="text-8xl px-2">Not Hunting</h1>
                <p className="mt-10 text-xl font-[Helvetica_Now_Display]">
                  Welcome to Leonida, home to the neon-soaked streets of Vice City and beyond. 
                  Experience the most immersive evolution of the Grand Theft Auto series yet.
                </p>
                <p className="mt-3 text-xl font-[Helvetica_Now_Display]">
                  In a world of high-stakes crime and sun-drenched chaos, Lucia and Jason must navigate 
                  the ultimate criminal underworld. The city of Vice has never been more alive—or more dangerous.
                </p>
                <p className="mt-10 text-xl font-[Helvetica_Now_Display]">
                  Push the limits of freedom in an expansive open world that redefines the genre. 
                  From the Everglades to the heart of the strip, every corner holds a new story.
                </p>
                <button className="bg-yellow-500 px-10 py-10 text-black mt-10 text-4xl hover:bg-yellow-400 transition-colors uppercase font-bold">
                  Pre-Order Now
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
