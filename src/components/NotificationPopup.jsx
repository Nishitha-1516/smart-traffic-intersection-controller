import React from "react";

export default function NotificationPopup({ message }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-lg px-6 py-3 rounded-xl shadow-lg animate-fadeIn z-50">
      {message}
    </div>
  );
}
