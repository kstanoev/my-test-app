/* eslint-disable no-unused-vars */

import React, { useContext, useState, useEffect } from 'react';
import CalendarContext from '../../context/CalendarContext';
import { auth, db } from '../../services/firebase';
import { getUserData } from '../../services/userService';
import { MAX_EVENT_TITLE_LENGTH, MIN_EVENT_TITLE_LENGTH } from '../../services/constants';
import { addEvent } from '../../services/eventService';
const labelsClasses = ['indigo', 'gray', 'green', 'blue', 'red', 'purple'];
const currentUser = auth.currentUser;

export default function EventModal() {
  const [event, setEvent] = useState({
    title: '',
    description: '',
    date: '',
    theme: '',
    participants: [currentUser],
    category: '',
    isPublic: false,
    author: '',
    day: '',
    label: '',
    id: ''
  });

  useEffect(() => {
    getUserData(auth.currentUser.uid)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const userAuthor = Object.values(userData)[0];
          if (!userAuthor.blocked) {
            setEvent({
              ...event,
              author: userAuthor.handle || ''
            });
          } else {
            // setBlockedUser(true);
          }
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const updateEvent = (prop) => (e) => {
    setEvent({
      ...event,
      [prop]: e.target.value
    });
  };

  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(CalendarContext);

  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent ? labelsClasses.find((lbl) => lbl === selectedEvent.label) : labelsClasses[0]
  );

  function handleSubmit(e) {
    e.preventDefault();
    // const calendarEvent = {
    //   title: '',
    //   description: '',
    //   isPublic: false,
    //   author: currentUser,
    //   day: daySelected.valueOf(),
    //   label: selectedLabel,

    //   id: selectedEvent ? selectedEvent.id : Date.now()
    // };
    if (!event.title) {
      return alert('Title is reqired!');
    }
    if (
      event.title.length < MIN_EVENT_TITLE_LENGTH ||
      event.title.length > MAX_EVENT_TITLE_LENGTH
    ) {
      return alert(
        `The title length must be between ${MAX_EVENT_TITLE_LENGTH} and ${MAX_EVENT_TITLE_LENGTH}!`
      );
    }
    if (!event.description) {
      return alert('Description is reqired!');
    }
    addEvent(
      event.title,
      event.description,
      event.date,
      event.theme,
      event.participants,
      event.category,
      event.isPublic,
      event.author,
      event.day,
      event.label
    ).then(() => {}); 
  }
  // if (selectedEvent) {
  //   dispatchCalEvent({ type: 'update', payload: calendarEvent });
  // } else {
  //   dispatchCalEvent({ type: 'push', payload: calendarEvent });
  // }

//  setShowEventModal(false);

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">drag_handle</span>
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({
                    type: 'delete',
                    payload: selectedEvent
                  });
                  setShowEventModal(false);
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer">
                delete
              </span>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <span className="material-icons-outlined text-gray-400">close</span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={event.title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={updateEvent('title')}
            />
            <span className="material-icons-outlined text-gray-400">schedule</span>
            <p>{daySelected.format('dddd, MMMM DD')}</p>
            <span className="material-icons-outlined text-gray-400">segment</span>
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={event.description}
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={updateEvent('description')}
            />
            <input
              type="text"
              name="participants"
              placeholder="Add participants"
              value={event.participants}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={updateEvent('participants')}
            />
            <select
              name="selectedCategory"
              id="category"
              value={event.category}
              onChange={updateEvent('category')}>
              <option value="party">Party</option>
              <option value="education">Education</option>
              <option value="work">Work</option>
            </select>
            <input
              type="text"
              name="category"
              placeholder="Add category"
              value={event.category}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={updateEvent('category')}
            />

            <span className="material-icons-outlined text-gray-400">bookmark_border</span>
            <div className="flex gap-x-2">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}>
                  {selectedLabel === lblClass && (
                    <span className="material-icons-outlined text-white text-sm">check</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white">
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
