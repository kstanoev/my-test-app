import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import LogIn from './Views/LogIn';
import NavBar from './components/NavBar';
import Calendar from './/Views/Calendar';
import './App.css';
import SignUpOne from './Views/SignUpOne';
import SignUpTwo from './Views/SignUpTwo';
import { DateContextWrapper } from './context/DateContext';

const theme = createTheme({});

export default function App() {
  const noNavBar = ['/login', '/signup1', '/signup2'];
  const currLocation = window.location.pathname;
  const showNavBar = !noNavBar.includes(currLocation);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateContextWrapper>
            <div className="nav-bar">{showNavBar && <NavBar />}</div>
            <div className="page">
              <BrowserRouter basename="/">
                <Routes>
                  <Route path="/" element={<Calendar />} />
                  <Route path="/login" element={<LogIn />} />
                  <Route path="/signup1" element={<SignUpOne />} />
                  <Route path="/signup2" element={<SignUpTwo />} />
                </Routes>
              </BrowserRouter>
            </div>
          </DateContextWrapper>
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
}
