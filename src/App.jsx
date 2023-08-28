import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './services/firebase';
import { AuthContext } from './context/AuthContext';
import { getUserData } from './services/userService';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import NavBar from './components/navigation/NavBar';
import { Home } from './pages/Home';
import Calendar from './components/calendar/Calendar';
import UserProfile from './pages/UserProfile';

function App() {
  const [user] = useAuthState(auth);
  const [appState, setAppState] = useState({
    user,
    userData: null
  });

  useEffect(() => {
    if (user === null) {
      setAppState({
        user: null,
        userData: null
      });
    } else {
      getUserData(user.uid)
        .then((snapshot) => {
          if (!snapshot.exists()) {
            throw new Error('Something went wrong!');
          }

          setAppState({
            ...appState,
            userData: snapshot.val()[Object.keys(snapshot.val())[0]]
          });
        })
        .catch((e) => alert(e.message));
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ ...appState, setUser: setAppState }}>
      <NavBar></NavBar>
      <Routes>
        <Route path="/log-in" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/userprofile" element={<UserProfile />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
