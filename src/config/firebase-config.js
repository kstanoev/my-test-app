import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC7D5AJOQ7fNSmwuz12QU29afraBtw7dkU",
    authDomain: "devent-calendar.firebaseapp.com",
    databaseURL:
        'https://devent-calendar-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: "devent-calendar",
    storageBucket: "devent-calendar.appspot.com",
    messagingSenderId: "158295279398",
    appId: "1:158295279398:web:0a915300a765c5c652a3e7"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
