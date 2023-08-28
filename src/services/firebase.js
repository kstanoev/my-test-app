import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCDd9qWx0ufuLuxuqSyEsSwJmnFsygsXQE',
  authDomain: 'event-calendar-team-nine.firebaseapp.com',
  projectId: 'event-calendar-team-nine',
  storageBucket: 'event-calendar-team-nine.appspot.com',
  messagingSenderId: '1029228563657',
  appId: '1:1029228563657:web:2c63a25ddf8c7c37e45118',
  databaseURL: 'https://event-calendar-team-nine-default-rtdb.europe-west1.firebasedatabase.app/'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);

export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}

export async function upload(file, currentUser) {
  const fileRef = ref(storage, currentUser.uid + '.png');

  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, { photoURL });

  return photoURL;
}
