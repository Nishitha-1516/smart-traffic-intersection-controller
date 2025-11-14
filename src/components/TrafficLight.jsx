import React from "react";

export default function TrafficLight({ label, color }) {
  const colorMap = {
    RED: "bg-red-500 shadow-red-400/80",
    YELLOW: "bg-yellow-500 shadow-yellow-400/80",
    GREEN: "bg-green-500 shadow-green-400/80",
  };

  const light = (clr) => {
    const isActive = color === clr;
    const base =
      "w-20 h-20 rounded-full transition-all duration-700 shadow-lg border border-gray-800";
    const active = isActive
      ? `${colorMap[clr]} scale-105`
      : "bg-gray-700 opacity-40";
    return <div className={`${base} ${active}`}></div>;
  };

  return (
    <div className="flex flex-col items-center bg-gray-900/60 backdrop-blur-lg p-6 rounded-3xl space-y-3 shadow-lg border border-gray-700">
      <div className="text-sm font-semibold text-gray-200 mb-1">{label}</div>
      {light("RED")}
      {light("YELLOW")}
      {light("GREEN")}
    </div>
  );
}
