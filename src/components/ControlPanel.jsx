import React from "react";

export default function ControlPanel({ start, reset, triggerPedestrian, triggerEmergency }) {
  const btn = (label, color, onClick) => (
    <button
      onClick={onClick}
      className={`${color} py-3 px-6 rounded-lg text-white font-semibold shadow-md hover:scale-105 transition-all duration-300`}
    >
      {label}
    </button>
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mt-8">
      {btn("▶️ Start", "bg-green-500", start)}
      {btn("🔁 Reset", "bg-blue-600", reset)}
      {btn("🚶 Pedestrian Request", "bg-yellow-500", triggerPedestrian)}
      {btn("🚨 Emergency Override", "bg-red-600", triggerEmergency)}
    </div>
  );
}
