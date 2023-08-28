import { useContext } from 'react';
import CalendarContext from '../../context/CalendarContext';

export default function CreateEventButton() {
  const { setShowEventModal } = useContext(CalendarContext);
  return (
    <button
      onClick={() => setShowEventModal(true)}
      className="border p-2 rounded-full flex items-center shadow-md hover:shadow">
      <span className="pl-3 pr-3">+ Add Event</span>
    </button>
  );
}
