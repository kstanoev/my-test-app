import React, { useContext, useState, useEffect } from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DateContext } from '../../context/DateContext';
import dayjs from 'dayjs';
import { Box } from '@mui/material';

/**
 * SmallCalendar displays a compact calendar for a specific month within a year.
 *
 * @component
 * @param {object} props - The component props.
 * @param {number} props.monthIndex - The index of the month (0-11) to display.
 * @returns {JSX.Element} SmallCalendar component displaying a compact calendar.
 */
export default function SmallCalendar({ monthIndex }) {
  const { displayDate, selectedDate, setSelectedDate } =
    useContext(DateContext);
  const [rerenderKey, setRerenderKey] = useState(0);
  const [textColor, setTextColor] = useState('');

  useEffect(() => {
    setTextColor(monthIndex < dayjs().month() ? 'GrayText' : '');
  }, []);

  useEffect(() => {
    setRerenderKey((key) => key + 1);
  }, [displayDate.year()]);

  const monthName = new Date(displayDate.year(), monthIndex).toLocaleString(
    'default',
    {
      month: 'long',
    }
  );

  return (
    <DateCalendar
      value={
        selectedDate &&
        selectedDate.month() === monthIndex &&
        selectedDate.year() === displayDate.year()
          ? selectedDate
          : null
      }
      onChange={(newDate) => setSelectedDate(newDate)}
      key={rerenderKey}
      defaultCalendarMonth={dayjs(`${displayDate.year()}-${monthIndex + 1}-01`)}
      slots={{
        calendarHeader: () => (
          <Box
            sx={{
              mt: '16px',
              mb: '8px',
              ml: '32px',
              color: textColor,
            }}
          >
            {monthName}
          </Box>
        ),
      }}
    />
  );
}
