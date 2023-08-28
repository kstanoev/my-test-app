import { Box } from '@mui/material';
import { getMonth } from '../common/utils';
import { useContext } from 'react';
import { DateContext } from '../context/DateContext';
import SideCalendar from '../components/SideCalendar';
import Labels from '../components/Labels';
import YearGrid from '../components/YearGrid/YearGrid';
import MonthGrid from '../components/MonthGrid/MonthGrid';
import WeekGrid from '../components/WeekGrid/WeekGrid';
import DayGrid from '../components/DayGrid/DayGrid';

/**
 * Calendar component displays a calendar view based on the selected mode.
 *
 * @returns {JSX.Element} The JSX element representing the Calendar component.
 */
export default function Calendar() {
  const { calView } = useContext(DateContext);

  return (
    <Box sx={{ display: 'flex', height: 1 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <SideCalendar />
        <Labels />
      </Box>
      <Box sx={{ overflow: 'auto' }}>
        {calView === 'year' && <YearGrid />}
        {calView === 'month' && <MonthGrid />}
        {calView === 'week' && <WeekGrid />}
        {calView === 'day' && <DayGrid />}
      </Box>
    </Box>
  );
}
