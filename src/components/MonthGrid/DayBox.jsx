import { Box, Typography } from '@mui/material';
import { useContext, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { DateContext } from '../../context/DateContext';

/**
 * Represents an individual day in the MonthView component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {dayjs.Dayjs} props.dayObj - The dayjs object representing the current day.
 * @param {number} props.weekIndex - The index of the week in which the day is present.
 * @returns {JSX.Element} The rendered DayBox component.
 */
export default function DayBox({ dayObj, weekIndex }) {
  const { displayDate } = useContext(DateContext);
  const [textColor, setTextColor] = useState('');
  const [isToday, setIsToday] = useState(false);
  const [isFirstDay, setIsFirstDay] = useState(false);

  useEffect(() => {
    setTextColor(dayObj.$M !== displayDate.month() ? 'GrayText' : '');
    setIsToday(dayObj.format('DD-MM-YY') === dayjs().format('DD-MM-YY'));
    setIsFirstDay(dayObj.$D === 1);
  }, [dayObj, displayDate.month()]);

  return (
    <Box
      sx={{
        padding: '10px',
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="body2" sx={{ mb: 1, color: 'GrayText' }}>
          {weekIndex === 0 && dayObj.format('ddd').toUpperCase()}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: textColor,
            border: isToday ? '1px solid rgba(0, 0, 0, 0.6);' : '',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...(isFirstDay
              ? {
                  p: 1,
                  borderRadius: 1,
                }
              : {
                  borderRadius: 5,
                  width: '36px',
                  height: '36px',
                }),
          }}
        >
          {isFirstDay
            ? `${dayObj.format('MMM')} ${dayObj.format('D')}`
            : dayObj.format('D')}
        </Typography>
      </Box>
    </Box>
  );
}
