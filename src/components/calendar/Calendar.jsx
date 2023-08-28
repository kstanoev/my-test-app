import React from 'react';
import { getMonth } from '../../services/calendarService';
import { useState, useEffect, useContext } from 'react';
import CalendarHeader from './CalendarHeader';
import Sidebar from './Sidebar';
import Month from './Month';
import CalendarContext from '../../context/CalendarContext';
import EventModal from './EventModal';

export default function Calendar() {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(CalendarContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <React.Fragment>
      {showEventModal && <EventModal />}
      <div className="bg-gray-100 mb-2 ml-6 mt-4 mr-6 pt-1 pb-4 rounded-3xl shadow-lg">
        <div className="h-screen flex flex-col">
          <CalendarHeader />
          <div className="flex flex-1">
            <Sidebar />
            <Month month={currenMonth} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
