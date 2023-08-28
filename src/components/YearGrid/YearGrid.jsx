import SmallCalendar from './SmallCalendar';
import { Grid } from '@mui/material';
import { useContext } from 'react';
import { DateContext } from '../../context/DateContext';

/**
 * YearGrid displays a grid of SmallCalendar components for each month in a year.
 *
 * @component
 * @returns {JSX.Element} The rendered YearGrid component.
 */
export default function YearGrid() {
  return (
    <Grid
      container
      sx={{
        height: '100%',
        width: '100%',
      }}
    >
      {new Array(12).fill(null).map((_, monthIndex) => {
        return (
          <Grid item key={monthIndex} lg={4}>
            <SmallCalendar monthIndex={monthIndex} />
          </Grid>
        );
      })}
    </Grid>
  );
}
