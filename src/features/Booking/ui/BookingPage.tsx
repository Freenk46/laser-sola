import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './BookingPage.module.scss';
import { getCartItems } from 'features/Cart/model/selectors/getCartItems';
import { ProgressSteps } from './ProgressSteps/ProgressSteps';
import { ConfirmationCard } from './components/ConfirmationCard';
import { SelectedProcedures } from './components/SelectedProcedures';
import { CalendarGrid } from './components/CalendarGrid';
import { TimeSlotSelector } from './components/TimeSlotSelector';
import { OrderSummarySidebar } from './components/OrderSummarySidebar';
import { generateCalendarDates } from '../utils/dateUtils';
import { generateAvailableSlots } from '../model/services/generateAvailableSlots';

export default function BookingPage() {
  const cartItems = useSelector(getCartItems);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const calendarDates = generateCalendarDates();
  const totalDuration = cartItems.reduce((sum, item) => sum + item.duration, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  const calendarRef = useRef<HTMLDivElement>(null);
  const timeSlotRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
const сonfirmationRef =useRef<HTMLDivElement>(null);
  // Offset-based scroll helper
  const scrollWithOffset = (element: HTMLElement, offset: number = 80) => {
    const y = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!selectedDate) return;
    const bookedSlots = ['11:00', '14:30', '16:00'];
    const slots = generateAvailableSlots({
      startTime: '10:00',
      endTime: '20:00',
      duration: totalDuration,
      bookedSlots
    });
    setAvailableSlots(slots);
  }, [selectedDate, totalDuration]);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    setCurrentStep(2);
    setTimeout(() => {
      if (timeSlotRef.current) {
        scrollWithOffset(timeSlotRef.current, 80);
      }
    }, 100);
  };

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
    setCurrentStep(3);
    setTimeout(() => {
      if (summaryRef.current) {
        scrollWithOffset(summaryRef.current, 80);
      }
    }, 100);
  };

  const handleBooking = () => {
    if (!selectedSlot) return;
    setBookingConfirmed(true);
    setTimeout(() => {
      if (сonfirmationRef.current) {
        scrollWithOffset(сonfirmationRef.current, 10);
      }
    }, 100);
    
  };

  if (!cartItems.length) {
    return <div className={styles.emptyCart}>კალათა ცარიელია</div>;
  }

  if (bookingConfirmed && selectedDate && selectedSlot) {
    return (
        <div ref={сonfirmationRef}>
      <ConfirmationCard
        selectedDate={selectedDate}
        selectedSlot={selectedSlot}
        totalPrice={totalPrice}
        onBack={() => setBookingConfirmed(false)}
      />
      </div>
    );
  }

  return (
    <div className={styles.bookingPage}>
      <div className={styles.layout}>
        {/* Left Column: ProgressSteps */}
        <aside className={styles.leftColumn}>
          <ProgressSteps currentStep={currentStep} />
        </aside>

        {/* Center Column: Date + Time */}
        <main className={styles.centerColumn}>
          <div ref={calendarRef}>
            <CalendarGrid
              dates={calendarDates}
              selectedDate={selectedDate}
              onSelectDate={handleDateSelect}
            />
          </div>
          {selectedDate && (
            <div ref={timeSlotRef}>
              <TimeSlotSelector
                availableSlots={availableSlots}
                selectedSlot={selectedSlot}
                onSelect={handleSlotSelect}
              />
            </div>
          )}
        </main>

        {/* Right Column: Summary */}
        <aside className={styles.rightColumn}>
           
          <SelectedProcedures items={cartItems} />
          <div ref={summaryRef}>
            <OrderSummarySidebar
              proceduresCount={cartItems.length}
              totalDuration={totalDuration}
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              totalPrice={totalPrice}
              onConfirm={handleBooking}
              confirmEnabled={!!selectedSlot}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
