import { createContext, useState } from 'react';
import dayjs from 'dayjs';
import { useEffect } from 'react';

/**
 * @typedef {Object} DateContextValues
 * @property {string} calView - Current calendar view mode.
 * @property {Function} setCalView - Update calendar view mode.
 * @property {dayjs.Dayjs} displayDate - Currently displayed date.
 * @property {Function} setDisplayDate - Update displayed date.
 * @property {dayjs.Dayjs | null} selectedDate - Selected date.
 * @property {Function} setSelectedDate - Update selected date.
 */

/**
 * Context managing date-related state.
 * @type {React.Context<DateContextValues>}
 */
export const DateContext = createContext({
  calView: '',
  setCalView: () => {},
  displayDate: null,
  setDisplayDate: () => {},
  selectedDate: null,
  setSelectedDate: () => {},
});

/**
 * Wrapper providing date-related context.
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components to be wrapped.
 * @returns {JSX.Element} Component with date context.
 */
export function DateContextWrapper({ children }) {
  const [calView, setCalView] = useState('month');
  const [displayDate, setDisplayDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    // Log formatted display date.
    const logDisplayDate = () => {
      console.log(
        `${displayDate.date()}-${
          displayDate.month() + 1
        }-${displayDate.year()} / ${displayDate.week()}w`
      );
    };

    logDisplayDate(displayDate);
  }, [displayDate]);

  return (
    <DateContext.Provider
      value={{
        calView,
        setCalView,
        displayDate,
        setDisplayDate,
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </DateContext.Provider>
  );
}
