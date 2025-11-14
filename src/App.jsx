import React from "react";
import useSimulator from "./hooks/useSimulator";
import TrafficIntersection from "./components/TrafficIntersection";
import ControlPanel from "./components/ControlPanel";
import NotificationPopup from "./components/NotificationPopup";

export default function App() {
  const sim = useSimulator();

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex flex-col justify-between items-center text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="mt-8 text-center bg-black/50 px-6 py-4 rounded-2xl">
        <h1 className="text-4xl font-bold tracking-wide">
          SMART INTERSECTION CONTROLLER 🚦
        </h1>
        <p className="text-gray-300 mt-1 text-sm">
          Coordinated N–S and E–W Signals with Pedestrian & Emergency Modes
        </p>
      </div>

      <TrafficIntersection
        nsLight={sim.nsLight}
        ewLight={sim.ewLight}
        timeLeft={sim.timeLeft}
        phase={sim.phase}
      />

      <div className="mb-12">
        <ControlPanel
          start={sim.start}
          reset={sim.reset}
          triggerPedestrian={sim.triggerPedestrian}
          triggerEmergency={sim.triggerEmergency}
        />
      </div>

      <NotificationPopup message={sim.notification} />
    </div>
  );
}
