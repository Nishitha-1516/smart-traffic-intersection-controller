import React from "react";

export default function Dashboard({ density, cycleCount, phase }) {
  return (
    <div className="fixed top-4 right-4 bg-black/60 backdrop-blur-md text-white rounded-2xl p-4 text-sm w-56 shadow-lg">
      <p className="font-semibold text-cyan-400 mb-1">🧭 Simulation Stats</p>
      <p>Current Phase: <span className="text-yellow-300">{phase}</span></p>
      <p>Traffic Density: <span className="text-green-400">{density}%</span></p>
      <p>Cycle Count: <span className="text-blue-400">{cycleCount}</span></p>
    </div>
  );
}
