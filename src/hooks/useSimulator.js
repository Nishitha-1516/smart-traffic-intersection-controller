import { useState, useEffect, useRef } from "react";

export default function useSimulator() {
  const [phase, setPhase] = useState("NS_GREEN");
  const [timeLeft, setTimeLeft] = useState(10);
  const [running, setRunning] = useState(false);
  const [pedestrian, setPedestrian] = useState(false);
  // NOTE: we no longer need an 'emergency' boolean flag used to trigger transition.
  const [notification, setNotification] = useState("");

  // state to store paused context when emergency starts
  const [pausedPhase, setPausedPhase] = useState(null);
  const [pausedTimeLeft, setPausedTimeLeft] = useState(null);

  const timer = useRef(null);

  const durations = {
    NS_GREEN: 10,
    NS_YELLOW: 3,
    EW_GREEN: 10,
    EW_YELLOW: 3,
    PEDESTRIAN: 5,
    EMERGENCY: 5,
  };

  const transitions = {
    NS_GREEN: "NS_YELLOW",
    NS_YELLOW: "EW_GREEN",
    EW_GREEN: "EW_YELLOW",
    EW_YELLOW: "NS_GREEN",
    PEDESTRIAN: "NS_GREEN",
    EMERGENCY: "NS_GREEN",
  };

  // main timer loop
  useEffect(() => {
    if (!running) return;

    clearInterval(timer.current);

    timer.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          handleNextPhase();
          // after handleNextPhase() we set next state's duration
          // below we return whatever duration was set in handleNextPhase
          // but to keep logic simple, return durations[transitions[phase]];
          // however since phase is stale here, we will instead return a safe default;
          return durations[transitions[phase]];
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer.current);
  }, [running, phase]);

  // next phase logic
  const handleNextPhase = () => {
    // ----- If currently in EMERGENCY: restore paused state (if any) -----
    if (phase === "EMERGENCY") {
      if (pausedPhase) {
        // restore the exact saved state/time
        setPhase(pausedPhase);
        setTimeLeft(pausedTimeLeft ?? durations[pausedPhase]);
        setPausedPhase(null);
        setPausedTimeLeft(null);
        setNotification("✅ Emergency cleared — resuming previous state.");
      } else {
        // no paused state saved: fallback to normal flow
        setPhase("NS_GREEN");
        setTimeLeft(durations.NS_GREEN);
        setNotification("✅ Emergency cleared — resuming normal flow.");
      }
      return;
    }

    // ----- If pedestrian request is queued, go to pedestrian next -----
    if (pedestrian) {
      // queue handled: switch to pedestrian and clear flag
      setPhase("PEDESTRIAN");
      setTimeLeft(durations.PEDESTRIAN);
      setPedestrian(false);
      setNotification("🚶 Pedestrian crossing activated!");
      return;
    }

    // ----- Normal cyclic transition -----
    setPhase((prev) => {
      const next = transitions[prev] || "NS_GREEN";
      // setTimeLeft will be set by the interval logic (we return durations for next)
      setTimeLeft(durations[next]);
      return next;
    });
  };

  // start/reset logic
  const start = () => {
    setRunning(true);
    setTimeLeft(durations[phase]);
  };

  const reset = () => {
    clearInterval(timer.current);
    setRunning(false);
    setPhase("NS_GREEN");
    setTimeLeft(durations.NS_GREEN);
    setPausedPhase(null);
    setPausedTimeLeft(null);
    setPedestrian(false);
    setNotification("");
  };

  // pedestrian trigger
  const triggerPedestrian = () => {
    if (!running) {
      setNotification("⚠️ Start simulation first!");
      return;
    }
    if (phase === "PEDESTRIAN" || pedestrian) {
      setNotification("🚶 Pedestrian already active or queued!");
      return;
    }
    // queue pedestrian to be handled at next phase change (or immediate if timer expires)
    setPedestrian(true);
    setNotification("🚶 Pedestrian request received — will activate soon!");
  };

  // emergency trigger: immediate; save previous state & time, go to EMERGENCY
  const triggerEmergency = () => {
    if (!running) {
      setNotification("⚠️ Start simulation first!");
      return;
    }

    // If already in EMERGENCY, do nothing (avoid re-saving pausedPhase)
    if (phase === "EMERGENCY") {
      setNotification("🚨 Already in emergency!");
      // optionally restart emergency timer:
      setTimeLeft(durations.EMERGENCY);
      return;
    }

    // Save the current state/time so we can resume after emergency
    setPausedPhase(phase);
    setPausedTimeLeft(timeLeft);

    // Immediately switch to EMERGENCY and set the emergency duration
    clearInterval(timer.current);
    setPhase("EMERGENCY");
    setTimeLeft(durations.EMERGENCY);
    setNotification("🚨 Emergency override activated!");
  };

  // auto-hide notification
  useEffect(() => {
    if (notification) {
      const timeout = setTimeout(() => setNotification(""), 3000);
      return () => clearTimeout(timeout);
    }
  }, [notification]);

  // lights for NS / EW signals (Moore machine outputs based on current phase)
  const nsLight =
    phase === "NS_GREEN"
      ? "GREEN"
      : phase === "NS_YELLOW"
      ? "YELLOW"
      : "RED";

  const ewLight =
    phase === "EW_GREEN"
      ? "GREEN"
      : phase === "EW_YELLOW"
      ? "YELLOW"
      : "RED";

  // global override for pedestrian/emergency => both red
  if (phase === "PEDESTRIAN" || phase === "EMERGENCY") {
    return {
      nsLight: "RED",
      ewLight: "RED",
      phase,
      timeLeft,
      running,
      notification,
      start,
      reset,
      triggerPedestrian,
      triggerEmergency,
    };
  }

  // default return for normal operation
  return {
    nsLight,
    ewLight,
    phase,
    timeLeft,
    running,
    notification,
    start,
    reset,
    triggerPedestrian,
    triggerEmergency,
  };
}
