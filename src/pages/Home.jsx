import Weather from '../components/weather/Weather';
import Calendar from '../components/calendar/Calendar';

export const Home = () => {
  return (
    <>
      <div>
        <Weather />
      </div>
      <div>
        <Calendar />
      </div>
    </>
  );
};
