import { create } from 'zustand';
import { AcademicEvent, EventCategory, FilterState } from '../types/calendar.types';
import { MOCK_ACADEMIC_EVENTS } from '../api/mockEvents';
import { useAuthStore } from '@/store';

interface CalendarStoreState {
  events: AcademicEvent[];
  selectedDate: string; // "YYYY-MM-DD" e.g. "2026-09-16"
  activeMonthYear: { year: number; month: number }; // 0-indexed month (8 = Sep)
  activeCategory: EventCategory | 'All';
  remindersMap: Record<string, boolean>;

  // Actions
  setSelectedDate: (dateStr: string) => void;
  setMonthYear: (year: number, month: number) => void;
  setActiveCategory: (cat: EventCategory | 'All') => void;
  toggleReminder: (eventId: string) => void;
  getFilteredEvents: () => AcademicEvent[];
  getNextUpcomingEvent: () => AcademicEvent | null;
  getEventsForDate: (dateStr: string) => AcademicEvent[];
}

export const useCalendarStore = create<CalendarStoreState>((set, get) => ({
  events: MOCK_ACADEMIC_EVENTS,
  selectedDate: '2026-09-16',
  activeMonthYear: { year: 2026, month: 8 }, // September 2026
  activeCategory: 'All',
  remindersMap: { 'evt-ia1': true },

  setSelectedDate: (dateStr) => set({ selectedDate: dateStr }),

  setMonthYear: (year, month) => set({ activeMonthYear: { year, month } }),

  setActiveCategory: (cat) => set({ activeCategory: cat }),

  toggleReminder: (eventId) =>
    set((state) => ({
      remindersMap: {
        ...state.remindersMap,
        [eventId]: !state.remindersMap[eventId],
      },
    })),

  getFilteredEvents: () => {
    const { events, activeCategory } = get();
    const user = useAuthStore.getState().user;
    const userSem = user?.semester || 5;

    return events.filter((evt) => {
      const matchCategory = activeCategory === 'All' || evt.category === activeCategory;
      const matchSem = evt.semester === userSem || evt.semester === 0;
      return matchCategory && matchSem;
    });
  },

  getNextUpcomingEvent: () => {
    const { events } = get();
    const sorted = [...events].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    const todayStr = '2026-09-03';
    return sorted.find((e) => e.date >= todayStr) || sorted[0];
  },

  getEventsForDate: (dateStr) => {
    const { events } = get();
    return events.filter((e) => e.date === dateStr);
  },
}));
