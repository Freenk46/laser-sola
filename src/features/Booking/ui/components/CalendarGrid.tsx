// src/features/Booking/ui/CalendarGrid.tsx

import React from 'react';
import styles from '../BookingPage.module.scss';

interface CalendarDate {
  date: string;
  day: number;
  dayName: string;
  isToday: boolean;
  isWeekend: boolean;
}

interface Props {
  dates: CalendarDate[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export const CalendarGrid: React.FC<Props> = ({ dates, selectedDate, onSelectDate }) => {
  return (
    <div className={`${styles.card} ${styles.fadeIn}`}>
      <h3 className={styles.cardTitle}>აირჩიეთ თარიღი</h3>
      <div className={styles.calendar}>
        {dates.map((dateObj, index) => (
          <button
            key={index}
            onClick={() => onSelectDate(dateObj.date)}
            disabled={dateObj.isWeekend}
            className={`${styles.calendarDay} ${
              selectedDate === dateObj.date
                ? styles.calendarDaySelected
                : dateObj.isWeekend
                ? styles.calendarDayDisabled
                : dateObj.isToday
                ? styles.calendarDayToday
                : styles.calendarDayDefault
            }`}
          >
            <div className={styles.calendarDayName}>{dateObj.dayName}</div>
            <div className={styles.calendarDayNumber}>{dateObj.day}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
