import { ref, push, get, query, equalTo, orderByChild, update, remove } from 'firebase/database';
import { db } from '../services/firebase.js';

export const fromEventsDocument = snapshot => {
    const eventsDocument = snapshot.val();
  
    return Object.keys(eventsDocument).map((key) => {
      const event = eventDocument[key];
  
      return {
        ...event,
        id: key,
        createdOn: new Date(event.createdOn),
      };
    });
  };

export const addEvent = (title, date, theme, participants, category, isPublic, author, id) => {
  return push(ref(db, `events`), {
    title,
    date,
    theme,
    participants,
    category,
    isPublic: false,
    author,
    id,
    createdOn: Date.now()
  }).then((result) => {
    console.log(result, 'success');
    return getEventById(result.key);
  });
};

export const getEventById = (id) => {
  return get(ref(db, `events/${id}`)).then((result) => {
    if (!result.exists()) {
      throw new Error(`Event with id ${id} does not exist!`);
    }

    const event = result.val();
    event.id = id;
    event.createdOn = new Date(event.createdOn);

    return event;
  });
};

export const getAllEvents = () => {
    return get(ref(db, "events")).then((snapshot) => {
      if (!snapshot.exists()) {
        return [];
      }
  
        return fromEventsDocument(snapshot);
      });
  };

  export const getEventsByAuthor = (uid) => {
    return get(
      query(ref(db, "events"), orderByChild("author"), equalTo(uid))
    ).then((snapshot) => {
      if (!snapshot.exists()) return [];
  
      return fromEventsDocument(snapshot);
    });
  };

  export const getEventsByCategory = (category) => {

    return get(query(ref(db, 'events'), orderByChild('category'), equalTo(category)))
      .then(snapshot => {
        if (!snapshot.exists()) return [];
  
        return fromEventsDocument(snapshot);
      });
  };

  export const updateEvent = (eventId, newTitle, newDescription, newDate, newTheme, newCategory) => {
    const eventRef = ref(db, `events/${eventId}`);
    return update(eventRef, {
      title: newTitle,
      description: newDescription,
      date: newDate,
      theme: newTheme,
      category: newCategory
    });
  };

 
  
