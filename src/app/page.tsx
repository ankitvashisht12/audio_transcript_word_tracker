"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { TRANSCRIPT } from "./transcript";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const trickRef = useRef<number>(0)
  const [highlightedWordIndex, setHightlightedWordIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playAudio = () => {
    if (!isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();

    setIsPlaying((val) => !val);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.ontimeupdate = () => {
        const currentTime = audioRef.current?.currentTime;
        if(currentTime  && currentTime > 4.7 + trickRef.current) {
          console.log( currentTime );
          trickRef.current += 0.1
          setHightlightedWordIndex((val) => val + 1);
        }
      };
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="flex flex-col justify-center items-center h-full w-full">
        <p className="max-h-[200px] text-lg overflow-auto">
          {TRANSCRIPT.split(" ").map((word, index) => (
            <span
              key={index}
              className={
                `${index === highlightedWordIndex ? "bg-white text-black" : "bg-transparent text-white"} m-1`
              }
            >
              {word}
            </span>
          ))}
        </p>
        <button
          onClick={playAudio}
          className={`border-2 rounded-full px-4 py-2 mb-3 text-2xl font-semibold`}
        >
          {!isPlaying ? " > Play audio" : " || Pause audio"}
        </button>
        <audio ref={audioRef} src="/assets/index.mp3" />
      </div>
    </main>
  );
}
