export const generateCalendarDates = (): {
  date: string;
  day: number;
  dayName: string;
  isToday: boolean;
  isWeekend: boolean;
}[] => {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push({
      date: date.toISOString().split('T')[0],
      day: date.getDate(),
      dayName: date.toLocaleDateString('ka-GE', { weekday: 'short' }),
      isToday: i === 0,
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
    });
  }

  return dates;
};