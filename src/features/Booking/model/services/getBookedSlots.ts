import axios from 'axios';

export const getBookedSlots = async (date: string): Promise<string[]> => {
  try {
    const response = await axios.get(`http://localhost:4000/bookings?date=${date}`);
    return response.data.map((booking: { time: string }) => booking.time);
  } catch (error) {
    console.error('დაკავებული სლოტების წამოღება ვერ მოხერხდა:', error);
    return [];
  }
};
