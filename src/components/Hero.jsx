import { useState, useEffect } from "react";

const Hero = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [showLine, setShowLine] = useState(true);

  const fullText = [
    "We understand your vision,",
    "craft it to your specifications, and bring your dreams to life!"
  ];

  useEffect(() => {
    const videoElement = document.getElementById("hero-video");
    if (videoElement) {
      videoElement.oncanplaythrough = () => {
        setVideoLoaded(true);
      };
    }
  }, []);

  useEffect(() => {
    if (!showLine && index < fullText[0].length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + fullText[0][index]);
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else if (index >= fullText[0].length && index < fullText[0].length + fullText[1].length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + fullText[1][index - fullText[0].length]);
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index, showLine]);

  useEffect(() => {
    const lineTimeout = setTimeout(() => {
      setShowLine(false);
    }, 2000); // Line animation duration
    return () => clearTimeout(lineTimeout);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen">
      <video
        id="hero-video"
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/video.mp4"
        autoPlay
        loop
        muted
        preload="auto"
        poster="/videoPoster.png"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
      <div className="relative text-center z-10 text-white flex flex-col items-center justify-center h-full">
        <div className="text-center select-none">
          <h1
            className="text-4xl md:text-6xl font-light "
          >
            Genix Constructions
          </h1>
          <h2 className="text-lg md:text-2xl font-extralight text-gray-100">
            <span className="bg-[#CFA35D] px-1">
              {" "}
              You dream it, We build it!{" "}
            </span>
          </h2>
        </div>
        <div className="absolute bottom-16 text-center">
          {showLine && (
            <div className="w-2 h-24 bg-[#CFA35D] mb-4 animate-line"></div>
          )}
        </div>
        <div
          className={`absolute bottom-16 transition-opacity duration-500 ${
            !showLine ? "opacity-100 delay-500" : "opacity-0"
          }`}
        >
          <h2 className=" text-base md:text-xl font-bold p-2 md:w-96 h-24 w-screen text-white select-none">
            {text}
          </h2>
        </div>
      </div>
      <style jsx>{`
        @keyframes lineAnimation {
          0% {
            transform: translateY(100vh);
            opacity: 1;
          }
          50% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translate(-150px, 0);
            opacity: 0;
          }
        }

        .animate-line {
          animation: lineAnimation 2s forwards;
        }
      `}</style>
    </div>
  );
};

export default Hero;
