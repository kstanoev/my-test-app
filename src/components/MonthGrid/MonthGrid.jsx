import { Grid } from '@mui/material';
import DayBox from './DayBox';
import React, { useContext, useEffect, useState } from 'react';
import { greyHair } from '../../common/constants';
import { DateContext } from '../../context/DateContext';
import { getMonth } from '../../common/utils';

/**
 * A component that displays a grid of DayBox components representing a month's calendar.
 *
 * @component
 * @param {Object} props - The component props.
 * @returns {JSX.Element} The rendered MonthGrid component.
 */
export default function MonthGrid() {
  const { displayDate } = useContext(DateContext);
  const [monthArr, setMonthArr] = useState([]);

  useEffect(() => {
    const monthArr = getMonth(displayDate.year(), displayDate.month());

    setMonthArr(monthArr);
  }, [displayDate]);

  return (
    <Grid
      container
      sx={{
        height: '100%',
        width: '100%',
      }}
    >
      {monthArr.map((weekArr, weekIndex) => (
        <React.Fragment key={weekIndex}>
          {weekArr.map((dayObj, dayIndex) => (
            <Grid
              item
              key={dayIndex}
              sx={{
                borderBottom: greyHair,
                borderLeft: greyHair,
                borderRight:
                  dayIndex === 6 ? 'solid 1px rgb(218, 220, 224)' : 'none',
                width: 'calc(100% / 7)',
              }}
            >
              <DayBox
                dayObj={dayObj}
                dayIndex={dayIndex}
                weekIndex={weekIndex}
              />
            </Grid>
          ))}
        </React.Fragment>
      ))}
    </Grid>
  );
}
