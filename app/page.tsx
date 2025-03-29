"use client";
import { cn } from "@/lib/utils";
import {
  Info,
  InstagramLogo,
  MicrophoneStage,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  SpotifyLogo,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

interface Track {
  mp3: string;
  cover: string;
  name: string;
  artist: string;
}

export default function Home() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null!);

  // Define your playlist – these paths are relative to the public folder.
  const playlist: Track[] = [
    {
      mp3: "/music/This_aint_for_you_unmixed.mp3",
      cover: "/music/covers/raaghav.jpg",
      name: "This Ain't For You",
      artist: "Raaghav",
    },
    {
      mp3: "/music/Dooba.mp3",
      cover: "/music/covers/Dooba.png",
      name: "Dooba",
      artist: "Raaghav",
    },
    {
      mp3: "/music/Secondcoming.mp3",
      cover: "/music/covers/raaghav.jpg",
      name: "Second Coming",
      artist: "Raaghav",
    },
    {
      mp3: "/music/RKD.mp3",
      cover: "/music/covers/RKD.png",
      name: "Rok Ke Toh Dekh",
      artist: "Raaghav, 8GB RAM",
    },
  ];

  // Toggle play/pause and update state
  const togglePlayPause = (): void => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Skip to next track (loops back to the start)
  const handleNext = (): void => {
    const nextTrack = (currentTrack + 1) % playlist.length;
    setCurrentTrack(nextTrack);
  };

  // Go to previous track (loops to the last song)
  const handlePrev = (): void => {
    const prevTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    setCurrentTrack(prevTrack);
  };

  // When the current track changes, load the new track and auto-play if needed.
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrack, isPlaying]);

  // Auto-play the next track when the current one ends.
  const handleEnded = (): void => {
    handleNext();
  };

  // Listen for keydown events:
  // - Space: toggle play/pause
  // - Ctrl + ArrowRight: next track
  // - Ctrl + ArrowLeft: previous track
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.code === "Space") {
        e.preventDefault(); // Prevent default scrolling
        togglePlayPause();
      }
      if (e.ctrlKey && e.code === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
      if (e.ctrlKey && e.code === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, currentTrack]);

  return (
    <div
      className={cn(
        "w-screen h-screen flex items-center justify-center bg-stone-500 relative overflow-hidden",
        poppins.className,
      )}
    >
      <div className="absolute lg:hidden bg-neutral-800 h-full w-full z-50 flex items-center justify-center p-5">
        <p className="text-neutral-400 text-xl text-center">
          Please switch to a larger screen for better experience!
        </p>
      </div>
      <Image
        src="/wood.jpg"
        layout="fill"
        // objectFit="cover"
        className="absolute top-0 left-0 w-full h-full mix-blend-multiply saturate-0 brightness-150"
        alt=""
      />
      <div className="absolute top-5 left-5">
        <Popover>
          <PopoverTrigger className="bg-neutral-800 p-2 rounded-full">
            <Info size={24} className="text-neutral-400" />
          </PopoverTrigger>
          <PopoverContent
            side="bottom"
            align="start"
            className="bg-neutral-800 border-neutral-800 text-neutral-400 flex flex-col gap-5"
          >
            <p className="font-medium">
              Shoutout to my friend, Raaghav, for allowing me to use his music
              for this project. Do check out his discography and socials!
            </p>
            <div className="flex gap-2 items-center">
              <Link
                target="_blank"
                href="https://open.spotify.com/artist/3TGpV6A1s9WTH10YmMW92e?si=ytMYH_dvTkOWOvZ-SS8h3A"
              >
                <SpotifyLogo weight="fill" size={24} />
              </Link>
              <Link target="_blank" href="https://www.instagram.com/raaghhzzz/">
                <InstagramLogo weight="fill" size={24} />
              </Link>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Image
        src="/plant.png"
        objectFit="contain"
        width={750}
        height={750}
        quality={100}
        alt=""
        className="absolute -top-80 -right-50 aspect-square"
      />
      <div className="bg-red-800 w-6/12 lg:w-auto h-auto lg:h-8/12 aspect-[13/17] rounded-2xl relative p-2 shadow-lg shadow-red-900">
        <div className="flex flex-col h-full w-full">
          <div className="bg-neutral-800 w-full aspect-square rounded-lg p-7 relative shadow-lg shadow-neutral-800">
            <div
              role="button"
              onClick={togglePlayPause}
              className="absolute z-20 w-52 h-52 bottom-5 right-12 origin-bottom-right transition-transform duration-500"
            >
              <div className="h-8 aspect-square w-8 absolute -bottom-2 rounded-full -right-2 bg-neutral-500"></div>
              <div
                style={{
                  transform: isPlaying ? "rotate(0deg)" : "rotate(15deg)",
                }}
                className="absolute bottom-0 right-0 w-4 rounded-t-full h-52 bg-neutral-500 origin-bottom-right transition-transform duration-500"
              />
            </div>
            <div
              style={{
                animationPlayState: isPlaying ? "running" : "paused",
              }}
              className="w-full h-full rounded-full relative animate-[spin_5s_linear_infinite]"
            >
              <Image
                src={playlist[currentTrack].cover}
                layout="fill"
                // objectFit="cover"
                className="rounded-full absolute top-0 left-0 w-full h-full"
                alt=""
              />
              <div className="absolute top-0 left-0 h-full w-full z-10">
                <div className="h-full w-full rounded-full flex items-center justify-center z-10">
                  <div className="h-[40%] aspect-square rounded-full bg-black/50 p-4">
                    <div className="rounded-full h-full w-full bg-neutral-300/40 flex flex-col items-center justify-center relative text-center">
                      <p className="font-semibold text-center text-sm">
                        {playlist[currentTrack].name}
                      </p>
                      <div className="flex items-center justify-center gap-1">
                        <MicrophoneStage size={10} weight="duotone" />
                        <p className="text-xs font-light">
                          {playlist[currentTrack].artist}
                        </p>
                      </div>
                      <div className="absolute top-0 left-0 h-full rounded-full w-full flex items-center justify-center">
                        <div className="h-[10px] aspect-square rounded-full bg-neutral-800"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-around w-full h-full">
            <div className="flex flex-col items-center gap-2">
              <div
                role="button"
                onClick={handlePrev}
                className="h-[50px] rounded-full aspect-square bg-black flex items-center justify-center"
              >
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <radialGradient id="knobGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ccc" />
                      <stop offset="100%" stopColor="#666" />
                    </radialGradient>
                  </defs>
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="url(#knobGradient)"
                    stroke="#333"
                    strokeWidth="2"
                  />
                  <circle cx="50" cy="50" r="35" fill="#444" />
                  <line
                    x1="50"
                    y1="50"
                    x2="50"
                    y2="15"
                    stroke="#fff"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <SkipBack weight="fill" size={24} className="text-red-400" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <div
                role="button"
                onClick={togglePlayPause}
                className="h-[50px] rounded-full aspect-square bg-black flex items-center justify-center"
              >
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <radialGradient id="knobGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ccc" />
                      <stop offset="100%" stopColor="#666" />
                    </radialGradient>
                  </defs>
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="url(#knobGradient)"
                    stroke="#333"
                    strokeWidth="2"
                  />
                  <circle cx="50" cy="50" r="35" fill="#444" />
                  <line
                    x1="50"
                    y1="50"
                    x2="50"
                    y2="15"
                    stroke="#fff"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              {isPlaying ? (
                <Pause weight="fill" size={24} className="text-red-400" />
              ) : (
                <Play weight="fill" size={24} className="text-red-400" />
              )}
            </div>
            <div className="flex flex-col items-center gap-2">
              <div
                role="button"
                onClick={handleNext}
                className="h-[50px] rounded-full aspect-square bg-black flex items-center justify-center"
              >
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <radialGradient id="knobGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ccc" />
                      <stop offset="100%" stopColor="#666" />
                    </radialGradient>
                  </defs>
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="url(#knobGradient)"
                    stroke="#333"
                    strokeWidth="2"
                  />
                  <circle cx="50" cy="50" r="35" fill="#444" />
                  <line
                    x1="50"
                    y1="50"
                    x2="50"
                    y2="15"
                    stroke="#fff"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <SkipForward weight="fill" size={24} className="text-red-400" />
            </div>
          </div>
        </div>
      </div>
      {/* Audio element to play music */}
      <audio ref={audioRef} onEnded={handleEnded} preload="metadata">
        <source src={playlist[currentTrack].mp3} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
