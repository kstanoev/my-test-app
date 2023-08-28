import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useEffect, useContext, useState } from 'react';
import { DateContext } from '../context/DateContext';
import dayjs from 'dayjs';

/**
 * A component representing a small navigation calendar on the left side of the page.
 *
 * This component displays a compact calendar that allows users to navigate through months and select dates.
 *
 * @component
 * @returns {JSX.Element} The rendered SideCalendar component.
 */
export default function SideCalendar() {
  const { displayDate, setDisplayDate, selectedDate, setSelectedDate } =
    useContext(DateContext);

  const handleDateChange = (value) => {
    setSelectedDate(value);
    setDisplayDate(value);
  };

  return (
    <DateCalendar
      value={selectedDate}
      defaultCalendarMonth={displayDate}
      showDaysOutsideCurrentMonth
      onChange={(value) => handleDateChange(value)}
    />
  );
}
