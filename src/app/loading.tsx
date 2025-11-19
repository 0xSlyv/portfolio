"use client";

import { Player } from "@lottiefiles/react-lottie-player";

export default function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black z-[9999] fixed top-0 left-0">
      <Player
        autoplay
        loop
        src="/lottie/loading.json"
        style={{ height: "300px", width: "300px" }}
      />
    </div>
  );
}
