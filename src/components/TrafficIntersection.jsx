import React from "react";
import TrafficLight from "./TrafficLight";

export default function TrafficIntersection({ nsLight, ewLight, timeLeft, phase }) {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 mt-8">
      <div className="flex justify-center gap-20">
        <TrafficLight label="N-S Signal" color={nsLight} />
        <TrafficLight label="E-W Signal" color={ewLight} />
      </div>
      <div className="mt-6">
        <p className="text-xl font-semibold text-white">{timeLeft}s Remaining</p>
        <p className="text-gray-300 text-sm mt-1">
          Current Phase: <span className="text-white font-medium">{phase}</span>
        </p>
      </div>
    </div>
  );
}
