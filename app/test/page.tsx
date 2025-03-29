"use client";
import { useRef, useState } from "react";

const tracks = [
  { title: "Track 1", src: "/audio/track1.mp3" },
  { title: "Track 2", src: "/audio/track2.mp3" },
  { title: "Track 3", src: "/audio/track3.mp3" },
];

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    const nextIndex = (currentTrack + 1) % tracks.length;
    setCurrentTrack(nextIndex);
    restartAndPlayIfPlaying(nextIndex);
  };

  const prevTrack = () => {
    const prevIndex = (currentTrack - 1 + tracks.length) % tracks.length;
    setCurrentTrack(prevIndex);
    restartAndPlayIfPlaying(prevIndex);
  };

  // Helper to load a new track and resume play if we were playing
  const restartAndPlayIfPlaying = (trackIndex) => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.load();
    if (isPlaying) {
      // Use a small timeout to ensure the new src is loaded before play
      setTimeout(() => {
        audioRef.current.play();
      }, 100);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gray-800">
      {/* Clutter (SVGs) */}
      <div className="absolute top-4 left-4 w-10 h-10 text-green-400">
        {/* Plant SVG */}
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 2C12.5523 2 13 2.44772 13 3V5.60483C15.2822 6.24711 17 8.36092 17 11V14C17 16.7614 14.7614 19 12 19C9.23858 19 7 16.7614 7 14V11C7 8.36092 8.71776 6.24711 11 5.60483V3C11 2.44772 11.4477 2 12 2Z"
          />
        </svg>
      </div>
      <div className="absolute top-4 right-4 w-10 h-10 text-blue-400">
        {/* Headphones SVG */}
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 13.5V12a7.5 7.5 0 0115 0v1.5"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 13.5a2.25 2.25 0 012.25-2.25h1.5A2.25 2.25 0 0110.5 13.5v3a2.25 2.25 0 01-2.25 2.25h-1.5A2.25 2.25 0 014.5 16.5v-3zm12 0a2.25 2.25 0 012.25-2.25h1.5A2.25 2.25 0 0122.5 13.5v3a2.25 2.25 0 01-2.25 2.25h-1.5A2.25 2.25 0 0116.5 16.5v-3z"
          />
        </svg>
      </div>
      <div className="absolute bottom-4 left-4 w-10 h-10 text-yellow-300">
        {/* Lamp SVG */}
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 2C12.5523 2 13 2.44772 13 3V6H11V3C11 2.44772 11.4477 2 12 2Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 10H20M4 10C4 8.89543 4.89543 8 6 8H18C19.1046 8 20 8.89543 20 10M4 10C2.89543 10 2 10.8954 2 12V14C2 15.1046 2.89543 16 4 16H20C21.1046 16 22 15.1046 22 14V12C22 10.8954 21.1046 10 20 10"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 16V19H15V16"
          />
        </svg>
      </div>

      {/* Player Container */}
      <div className="flex flex-col items-center">
        {/* "Player" background block (like the red block in your reference) */}
        <div className="bg-red-600 w-72 h-72 flex items-center justify-center relative shadow-xl">
          {/* The disc */}
          <div
            className={`relative w-56 h-56 rounded-full overflow-hidden ${
              isPlaying ? "animate-spin" : ""
            }`}
            style={{
              animationDuration: "5s",
              animationTimingFunction: "linear",
            }}
          >
            {/* You can replace the background image with your own album art */}
            <img
              src="/album-art.jpg"
              alt="Album Art"
              className="w-full h-full object-cover"
            />
            {/* The small center circle (the record's label/hole) */}
            <div className="absolute top-1/2 left-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full" />
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center space-x-4">
          {/* Previous Button */}
          <button
            onClick={prevTrack}
            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 focus:outline-none"
          >
            {/* Simple previous icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.25 6.75L8.75 12l6.5 5.25"
              />
            </svg>
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 focus:outline-none"
          >
            {isPlaying ? (
              // Pause Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 9v6m4-6v6"
                />
              </svg>
            ) : (
              // Play Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.752 11.168l-4.487-2.584A1 1 0 009 9.418v5.164a1 1 0 001.265.934l4.487-1.832a1 1 0 00.648-.934v-2.168a1 1 0 00-.648-.914z"
                />
              </svg>
            )}
          </button>

          {/* Next Button */}
          <button
            onClick={nextTrack}
            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 focus:outline-none"
          >
            {/* Simple next icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.75 6.75L15.25 12l-6.5 5.25"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef}>
        <source src={tracks[currentTrack].src} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
