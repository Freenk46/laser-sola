import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Settings, Users, BarChart3, Home, ChevronLeft, ChevronRight, Plus, Edit2, Trash2, X, Save, History, CalendarDays } from 'lucide-react';
import styles from './AdminPage.module.scss';
interface Booking {
  id: number;
  time: string;
  clientId: number;
  procedure: string;
  duration: number;
  status:  'დაჯავშნილი' | 'დასრულებული';
  date: string; // ← დაამატე ეს ველი
}

interface Client {
  id: number;
  name: string;
  surname: string;
  phone: string;
  email: string;
  registrationDate: string;
}
type BookingEditModalProps = {
  booking: Booking | null;
  onSave: () => void;
  onClose: () => void;
};

type ClientDetailsModalProps = {
  client: Client;
  onClose: () => void;
};
type BookingsMap = {
  [date: string]: Booking[];
};
const LaserEpilationAdmin = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [editingBooking, setEditingBooking] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [activeMenuItem, setActiveMenuItem] = useState('calendar');
  const [showNewBookingModal, setShowNewBookingModal] = useState(false);

  // Mock data for bookings
const [bookings, setBookings] = useState<Record<string, Booking[]>>({
    '2025-06-18': [
      { id: 1, time: '09:00', clientId: 1, procedure: 'სახის ეპილაცია', duration: 45, status: 'დაჯავშნილი',date: '2025-06-18' },
      { id: 2, time: '10:30', clientId: 2, procedure: 'ფეხების ეპილაცია', duration: 90, status: 'დაჯავშნილი',date: '2025-06-18' },
      { id: 3, time: '14:00', clientId: 3, procedure: 'ხელების ეპილაცია', duration: 60, status: 'დაჯავშნილი',date: '2025-06-18' }
    ],
    '2025-06-19': [
      { id: 4, time: '11:00', clientId: 4, procedure: 'ზურგის ეპილაცია', duration: 75, status: 'დაჯავშნილი',date: '2025-06-18'},
      { id: 5, time: '15:30', clientId: 5, procedure: 'სახის ეპილაცია', duration: 45, status: 'დაჯავშნილი',date: '2025-06-18' }
    ],
    '2025-06-20': [
      { id: 6, time: '10:00', clientId: 6, procedure: 'ფეხების ეპილაცია', duration: 90, status: 'დაჯავშნილი' ,date: '2025-06-18'},
      { id: 7, time: '13:00', clientId: 7, procedure: 'ხელების ეპილაცია', duration: 60, status: 'დაჯავშნილი',date: '2025-06-18' },
      { id: 8, time: '16:00', clientId: 8, procedure: 'სახის ეპილაცია', duration: 45, status: 'დაჯავშნილი',date: '2025-06-18' },
      { id: 9, time: '17:30', clientId: 9, procedure: 'მუცლის ეპილაცია', duration: 50, status: 'დაჯავშნილი',date: '2025-06-18' }
    ],
    '2025-06-15': [
      { id: 10, time: '14:00', clientId: 1, procedure: 'სახის ეპილაცია', duration: 45, status: 'დასრულებული' ,date: '2025-06-18' },
      { id: 11, time: '16:00', clientId: 2, procedure: 'ფეხების ეპილაცია', duration: 90, status: 'დასრულებული' ,date: '2025-06-18'}
    ]
  });

  // Mock clients data
  const [clients, setClients] = useState([
    { id: 1, name: 'ნინო', surname: 'გელაშვილი', phone: '555-123456', email: 'nino@example.com', registrationDate: '2025-01-15' },
    { id: 2, name: 'ანა', surname: 'მამედოვა', phone: '555-234567', email: 'ana@example.com', registrationDate: '2025-02-20' },
    { id: 3, name: 'მარიამი', surname: 'ლორთქიფანიძე', phone: '555-345678', email: 'mariam@example.com', registrationDate: '2025-03-10' },
    { id: 4, name: 'ელენე', surname: 'კვარაცხელია', phone: '555-456789', email: 'elene@example.com', registrationDate: '2025-01-25' },
    { id: 5, name: 'თამარა', surname: 'შენგელია', phone: '555-567890', email: 'tamara@example.com', registrationDate: '2025-02-05' },
    { id: 6, name: 'ნატალია', surname: 'აბრამიშვილი', phone: '555-678901', email: 'natalia@example.com', registrationDate: '2025-03-15' },
    { id: 7, name: 'სალომე', surname: 'ღვინიაშვილი', phone: '555-789012', email: 'salome@example.com', registrationDate: '2025-01-30' },
    { id: 8, name: 'ქეთი', surname: 'ნადარეიშვილი', phone: '555-890123', email: 'keti@example.com', registrationDate: '2025-02-12' },
    { id: 9, name: 'მანანა', surname: 'ჯაფარიძე', phone: '555-901234', email: 'manana@example.com', registrationDate: '2025-03-01' }
  ]);

  const procedureTypes = [
    'სახის ეპილაცია',
    'ფეხების ეპილაცია', 
    'ხელების ეპილაცია',
    'ზურგის ეპილაცია',
    'მუცლის ეპილაცია',
    'წიწვის ეპილაცია'
  ];

  const menuItems = [
    { id: 'dashboard', label: 'მთავარი', icon: Home },
    { id: 'calendar', label: 'კალენდარი', icon: Calendar },
    { id: 'clients', label: 'კლიენტები', icon: Users },
    { id: 'analytics', label: 'ანალიზი', icon: BarChart3 },
    { id: 'settings', label: 'პარამეტრები', icon: Settings }
  ];

const getClientById = (clientId: number): Client | undefined => {
    return clients.find(client => client.id === clientId);
  };

 const getClientBookings = (clientId: number): Booking[] => {
    const allBookings: Booking[] = [];
    Object.entries(bookings).forEach(([date, dayBookings]) => {
      dayBookings.forEach((booking) => {
        if (booking.clientId === clientId) {
          allBookings.push({ ...booking, date });
        }
      });
    });
    return allBookings.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

const updateBooking = (bookingId: number, updatedData: Partial<Booking>) => { 
    setBookings(prev => {
      const newBookings = { ...prev };
      Object.keys(newBookings).forEach((date) => {
        newBookings[date] = newBookings[date].map(booking =>
          booking.id === bookingId ? { ...booking, ...updatedData } : booking
        );
      });
      return newBookings;
    });
  };

const deleteBooking = (bookingId: number) => {
    setBookings(prev => {
      const newBookings = { ...prev };
      Object.keys(newBookings).forEach((date) => {
        newBookings[date] = newBookings[date].filter(booking => booking.id !== bookingId);
      });
      return newBookings;
    });
  };

const addNewBooking = (newBooking: Booking) => {

    const dateStr = formatDate(selectedDate);
    setBookings(prev => ({
      ...prev,
      [dateStr]: [...(prev[dateStr] || []), { ...newBooking, id: Date.now() }]
    }));
  };

const getDaysInMonth = (date: Date): (Date | null)[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };


const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

const getBookingsForDate = (date: Date): Booking[] => {
    const dateStr = formatDate(date);
    return bookings[dateStr] || [];
  };

const navigateMonth = (direction: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const monthNames = [
    'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი',
    'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
  ];

  const weekDays = ['ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ', 'კვი'];

 const BookingEditModal: React.FC<BookingEditModalProps> = ({ booking, onSave, onClose }) => {
    const [formData, setFormData] = useState({
      time: booking?.time || '',
      clientId: booking?.clientId || 0,
      procedure: booking?.procedure || '',
      duration: booking?.duration || 45,
    });

    const handleSave = () => {
      if (booking) {
        updateBooking(booking.id, formData);
      } else {
     addNewBooking({
  ...formData,
  status: 'დაჯავშნილი',
  id: Date.now(),
  date: formatDate(selectedDate!)
});
      }
      onSave();
      onClose();
    };

    return (
      <div className={styles.modal}>
        <div className={`${styles.modalContent} ${styles.small}`}>
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>
              {booking ? 'ჯავშნის რედაქტირება' : 'ახალი ჯავშანი'}
            </h3>
            <button onClick={onClose} className={styles.closeButton}>
              <X className={styles.icon} />
            </button>
          </div>

          <div className={styles.formFields}>
            <div className={styles.field}>
              <label className={styles.label}>დრო</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>კლიენტი</label>
              <select
                value={formData.clientId}
                onChange={(e) => setFormData(prev => ({ ...prev, clientId: parseInt(e.target.value) }))}
                className={styles.select}
              >
                <option value="">აირჩიეთ კლიენტი</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>
                    {client.name} {client.surname}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>პროცედურა</label>
              <select
                value={formData.procedure}
                onChange={(e) => setFormData(prev => ({ ...prev, procedure: e.target.value }))}
                className={styles.select}
              >
                <option value="">აირჩიეთ პროცედურა</option>
                {procedureTypes.map(procedure => (
                  <option key={procedure} value={procedure}>{procedure}</option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>ხანგრძლივობა (წუთი)</label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                className={styles.input}
                min="15"
                max="180"
                step="15"
              />
            </div>
          </div>

          <div className={styles.modalActions}>
            <button
              onClick={handleSave}
              className={`${styles.button} ${styles.primary}`}
            >
              <Save className={styles.icon} />
              შენახვა
            </button>
            <button
              onClick={onClose}
              className={`${styles.button} ${styles.secondary}`}
            >
              გაუქმება
            </button>
          </div>
        </div>
      </div>
    );
  };

const ClientDetailsModal: React.FC<ClientDetailsModalProps> = ({ client, onClose }) => {
    const clientBookings = getClientBookings(client.id);
    const pastBookings = clientBookings.filter((b: Booking) => new Date(b.date) < new Date() || b.status === 'დასრულებული');
    const futureBookings = clientBookings.filter((b: Booking) => new Date(b.date) >= new Date() && b.status !== 'დასრულებული');

    return (
      <div className={styles.modal}>
        <div className={`${styles.modalContent} ${styles.large}`}>
          <div className={styles.modalHeader}>
            <h3 className={`${styles.modalTitle} ${styles.large}`}>კლიენტის დეტალები</h3>
            <button onClick={onClose} className={styles.closeButton}>
              <X className={styles.icon} />
            </button>
          </div>

          <div className={styles.clientDetails}>
            <div className={styles.detailsGrid}>
              <div className={`${styles.infoCard} ${styles.personal}`}>
                <h4 className={styles.cardTitle}>პირადი ინფორმაცია</h4>
                <div className={styles.infoList}>
                  <div className={styles.infoItem}>
                    <span className={styles.label}>სახელი:</span> 
                    <span className={styles.value}>{client.name} {client.surname}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.label}>ტელეფონი:</span> 
                    <span className={styles.value}>{client.phone}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.label}>ელ-ფოსტა:</span> 
                    <span className={styles.value}>{client.email}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.label}>რეგისტრაცია:</span> 
                    <span className={styles.value}>{new Date(client.registrationDate).toLocaleDateString('ka-GE')}</span>
                  </div>
                </div>
              </div>

              <div className={`${styles.infoCard} ${styles.stats}`}>
                <h4 className={styles.cardTitle}>სტატისტიკა</h4>
                <div className={styles.infoList}>
                  <div className={styles.infoItem}>
                    <span className={styles.label}>სულ ვიზიტები:</span> 
                    <span className={styles.value}>{pastBookings.length}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.label}>მომავალი ჯავშნები:</span> 
                    <span className={styles.value}>{futureBookings.length}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.label}>ბოლო ვიზიტი:</span> 
                    <span className={styles.value}>
                      {pastBookings.length > 0
                        ? new Date(pastBookings[pastBookings.length - 1].date).toLocaleDateString('ka-GE')
                        : 'არ არის'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.historyGrid}>
              <div className={styles.historySection}>
                <h4 className={styles.sectionTitle}>
                  <History className={styles.icon} />
                  პროცედურების ისტორია
                </h4>
                <div className={styles.historyList}>
                  {pastBookings.length === 0 ? (
                    <p className={styles.emptyMessage}>ისტორია არ არის</p>
                  ) : (
                    pastBookings.map((booking:Booking) => (
                      <div key={booking.id} className={`${styles.historyItem} ${styles.completed}`}>
                        <div className={styles.itemContent}>
                          <div className={styles.itemInfo}>
                            <div className={styles.procedure}>{booking.procedure}</div>
                            <div className={styles.datetime}>
                              {new Date(booking.date).toLocaleDateString('ka-GE')} - {booking.time}
                            </div>
                          </div>
                          <span className={`${styles.statusBadge} ${styles.completed}`}>დასრულებული</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className={styles.historySection}>
                <h4 className={styles.sectionTitle}>
                  <CalendarDays className={styles.icon} />
                  მომავალი პროცედურები
                </h4>
                <div className={styles.historyList}>
                  {futureBookings.length === 0 ? (
                    <p className={styles.emptyMessage}>მომავალი ჯავშნები არ არის</p>
                  ) : (
                    futureBookings.map((booking: Booking) => (
                      <div key={booking.id} className={`${styles.historyItem} ${styles.upcoming}`}>
                        <div className={styles.itemContent}>
                          <div className={styles.itemInfo}>
                            <div className={styles.procedure}>{booking.procedure}</div>
                            <div className={styles.datetime}>
                              {new Date(booking.date).toLocaleDateString('ka-GE')} - {booking.time}
                            </div>
                          </div>
                          <span className={`${styles.statusBadge} ${styles.booked}`}>დაჯავშნილი</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCalendar = () => {
    const days = getDaysInMonth(currentMonth);
    
    return (
      <div className={styles.calendar}>
        <div className={styles.calendarHeader}>
          <h2 className={styles.calendarTitle}>
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
          <div className={styles.navigationButtons}>
            <button onClick={() => navigateMonth(-1)} className={styles.navButton}>
              <ChevronLeft className={styles.icon} />
            </button>
            <button onClick={() => navigateMonth(1)} className={styles.navButton}>
              <ChevronRight className={styles.icon} />
            </button>
          </div>
        </div>

        <div className={styles.weekDays}>
          {weekDays.map(day => (
            <div key={day} className={styles.weekDay}>
              {day}
            </div>
          ))}
        </div>

        <div className={styles.calendarGrid}>
          {days.map((day, index) => {
            if (!day) {
              return <div key={index} className={styles.emptyDay}></div>;
            }

            const dayBookings = getBookingsForDate(day);
            const isToday = formatDate(day) === formatDate(new Date());
            const isSelected = selectedDate && formatDate(day) === formatDate(selectedDate);

            const dayClasses = [
              styles.calendarDay,
              isSelected ? styles.selected : '',
              isToday ? styles.today : ''
            ].filter(Boolean).join(' ');

            return (
              <div
                key={index}
                onClick={() => setSelectedDate(day)}
                className={dayClasses}
              >
                <div className={styles.dayContent}>
                  <div className={isToday ? `${styles.dayNumber} ${styles.todayNumber}` : styles.dayNumber}>
                    {day.getDate()}
                  </div>
                  {dayBookings.length > 0 && (
                    <div className={styles.bookingsBadge}>
                      <span className={styles.badge}>
                        {dayBookings.length}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDayDetails = () => {
    if (!selectedDate) {
      return (
        <div className={`${styles.dayDetails} ${styles.emptyState}`}>
          აირჩიეთ დღე კალენდრიდან
        </div>
      );
    }

    const dayBookings = getBookingsForDate(selectedDate);
    const selectedDateStr = selectedDate.toLocaleDateString('ka-GE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return (
      <div className={styles.dayDetails}>
        <div className={styles.dayHeader}>
          <h3 className={styles.dayTitle}>
            <Calendar className={styles.icon} />
            {selectedDateStr}
          </h3>
          <button
            onClick={() => setShowNewBookingModal(true)}
            className={styles.addButton}
          >
            <Plus className={styles.icon} />
            ახალი ჯავშანი
          </button>
        </div>

        {dayBookings.length === 0 ? (
          <div className={styles.emptyBookings}>ამ დღეს ჯავშნები არ არის</div>
        ) : (
          <div className={styles.bookingsList}>
            {dayBookings.map((booking: Booking) => {
              const client = getClientById(booking.clientId);
              return (
                <div key={booking.id} className={styles.bookingItem}>
                    
                  <div className={styles.bookingHeader}>
                    <div className={styles.timeInfo}>
                      <Clock className={styles.icon} />
                      <span className={styles.time}>{booking.time}</span>
                    </div>
                    <div className={styles.actions}>
                      <span className={styles.durationBadge}>
                        {booking.duration} წუთი
                      </span>
                      <button
                        onClick={() => setEditingBooking(booking)}
                        className={`${styles.actionButton} ${styles.edit}`}
                      >
                        <Edit2 className={styles.icon} />
                      </button>
                      <button
                        onClick={() => deleteBooking(booking.id)}
                        className={`${styles.actionButton} ${styles.delete}`}
                      >
                        <Trash2 className={styles.icon} />
                      </button>
                    </div>
                  </div>

                  {client && (
                    <div className={styles.clientInfo}>
                      <div className={styles.infoItem}>
                        <User className={styles.icon} />
                        <span className={styles.name}>
                          {client.name} {client.surname}
                        </span>
                      </div>
                      <div className={styles.infoItem}>
                        <Phone className={styles.icon} />
                        <span>{client.phone}</span>
                      </div>
                    </div>
                  )}

                  <div className={styles.procedureInfo}>
                    <span className={styles.label}>პროცედურა: </span>
                    <span className={styles.value}>{booking.procedure}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderClientsPage = () => {
    return (
      <div className={styles.clientsPage}>
        <div className={styles.clientsHeader}>
          <h2 className={styles.title}>კლიენტები</h2>
          <div className={styles.stats}>
            სულ კლიენტები: {clients.length}
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th className={styles.headerCell}>სახელი გვარი</th>
                <th className={styles.headerCell}>ტელეფონი</th>
                <th className={styles.headerCell}>ელ-ფოსტა</th>
                <th className={styles.headerCell}>რეგისტრაცია</th>
                <th className={styles.headerCell}>ვიზიტები</th>
                <th className={styles.headerCell}>მოქმედება</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {clients.map(client => {
                const totalBookings = getClientBookings(client.id).length;
                const pastBookings = getClientBookings(client.id).filter((b: Booking)  =>
                  new Date(b.date) < new Date() || b.status === 'დასრულებული'
                ).length;

                return (
                  <tr key={client.id} className={styles.tableRow}>
                    <td className={`${styles.tableCell} ${styles.nameCell}`}>
                      <div className={styles.name}>{client.name} {client.surname}</div>
                    </td>
                    <td className={`${styles.tableCell} ${styles.textCell}`}>{client.phone}</td>
                    <td className={`${styles.tableCell} ${styles.textCell}`}>{client.email}</td>
                    <td className={`${styles.tableCell} ${styles.textCell}`}>
                      {new Date(client.registrationDate).toLocaleDateString('ka-GE')}
                    </td>
                    <td className={styles.tableCell}>
                      <span className={styles.visitsBadge}>
                        {pastBookings}/{totalBookings}
                      </span>
                    </td>
                    <td className={styles.tableCell}>
                      <button
                        onClick={() => setSelectedClient(client)}
                        className={styles.detailsButton}
                      >
                        დეტალები
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeMenuItem) {
      case 'clients':
        return renderClientsPage();
      case 'calendar':
      default:
        return (
          <div className={styles.gridLayout}>
            <div>{renderCalendar()}</div>
            <div>{renderDayDetails()}</div>
          </div>
        );
    }
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h1 className={styles.title}>ლაზერული ეპილაცია</h1>
        <nav className={styles.nav}>
          {menuItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveMenuItem(id)}
              className={`${styles.navItem} ${activeMenuItem === id ? styles.active : ''}`}
            >
              <Icon className={styles.icon} />
              {label}
            </button>
          ))}
        </nav>
      </aside>

      <main className={styles.main}>{renderContent()}</main>

      {editingBooking && (
        <BookingEditModal
          booking={editingBooking}
          onSave={() => setEditingBooking(null)}
          onClose={() => setEditingBooking(null)}
        />
      )}
      {showNewBookingModal && (
        <BookingEditModal
          booking={null}
          onSave={() => setShowNewBookingModal(false)}
          onClose={() => setShowNewBookingModal(false)}
        />
      )}
      {selectedClient && (
        <ClientDetailsModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
        />
      )}
    </div>
  );
};

export default LaserEpilationAdmin;