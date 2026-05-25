/** Durations tuned for ~60Hz (~16.7ms/frame, ~12–20 frames). */
export const motionDuration = {
  pressIn: 150,
  pressOut: 220,
  micro: 260,
  standard: 300,
  fadeIn: 280,
  fadeOut: 220,
  layout: 320,
  progress: 520,
} as const;

/** Spring presets that settle smoothly on 60Hz without harsh overshoot. */
export const motionSpring = {
  settle: { stiffness: 160, damping: 26, mass: 0.8 },
} as const;
