export interface SlotConfig {
  startTime: string;
  endTime: string;
  duration: number;         // in minutes, e.g. 90
  bookedSlots?: string[];   // e.g. ['12:30', '15:00']
}

export const generateAvailableSlots = ({
  startTime,
  endTime,
  duration,
  bookedSlots = [],
}: SlotConfig): string[] => {
  const SLOT_INTERVAL = 30; // Step in 30-minute blocks

  const toMinutes = (time: string): number => {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  };

  const toTimeString = (minutes: number): string => {
    const h = Math.floor(minutes / 60).toString().padStart(2, '0');
    const m = (minutes % 60).toString().padStart(2, '0');
    return `${h}:${m}`;
  };

  const start = toMinutes(startTime);
  const end = toMinutes(endTime);

  // Transform bookedSlots into minutes for easier comparison
  const bookedMinutes = bookedSlots.map(toMinutes);

  const availableSlots: string[] = [];

  for (let t = start; t + duration <= end; t += SLOT_INTERVAL) {
    const isConflict = bookedMinutes.some(
      (booked) =>
        // booked slot overlaps with [t, t + duration)
        booked >= t && booked < t + duration
    );

    if (!isConflict) {
      availableSlots.push(toTimeString(t));
    }
  }

  return availableSlots;
};
