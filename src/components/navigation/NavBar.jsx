import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import logo from '../../assets/logo.png';
import { logoutUser } from '../../services/authService';

export function NavBar() {
  const { user, setUser } = useContext(AuthContext);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleShowLogoutModal = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);
  const navigate = useNavigate();
  const onLogout = () => {
    logoutUser().then(() => {
      setUser({
        user: null
      });
      handleCloseLogoutModal();
      navigate('/home');
    });
  };

  return (
    <>
      {user !== null && showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-stone-800 opacity-75"></div>
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white p-10 rounded-2xl shadow-lg font-mono">
              <h2 className="text-2xl font-semibold mb-10 mt-5 ml-5 mr-5 text-center text-stone-500">
                Are you sure you want to log out?
              </h2>
              <div className="flex justify-center mb-5">
                <button
                  onClick={onLogout}
                  href="#_"
                  className="relative inline-flex items-center justify-center p-4 px-4 py-3
                  overflow-hidden font-large text-indigo-600 transition duration-300 ease-out
                  border-2 border-rose-400 rounded-full shadow-md group mr-6">
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-rose-400 group-hover:translate-x-0 ease">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-rose-500 transition-all duration-300 transform group-hover:translate-x-full ease text-lg font-semibold">
                    Log out
                  </span>
                  <span className="relative invisible">Button Text</span>
                </button>
                <button
                  onClick={handleCloseLogoutModal}
                  href="#_"
                  className="inline-flex items-center justify-center w-full px-8 py-4 font-bold leading-6 text-stone-500 bg-stone-50 border-2 border-stone-400 rounded-full md:w-auto hover:bg-stone-400 hover:text-white text-lg focus:outline-none shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <nav className="bg-gray-100 text-gray-700 shadow h-20 flex items-center justify-between w-full">
        <div className="flex items-center ml-2">
          <Link to="/home" className="h-12 w-20 mx-auto mb-4">
            <img className="h-16 w-16 mx-auto" src={logo} alt="SpectraSchedule logo" />
          </Link>
          <span className="text-lg font-semibold">SpectraSchedule</span>
        </div>

        <div className="relative flex items-center w-1/4 h-11 rounded-full focus-within:shadow-lg bg-white overflow-hidden mr-auto ml-20">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="text"
            id="search"
            placeholder="Search..."
          />
        </div>
        {/* <div className="flex flex-row justify-between toggle mr-20">
          <label htmlFor="dark-toggle" className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                name="dark-mode"
                id="dark-toggle"
                className="checkbox hidden"
              />
              <div className="block border-[1px] dark:border-white border-gray-300 w-12 h-6 rounded-full"></div>
              <div className="dot absolute left-1 top-1 dark:bg-white bg-gray-800 w-4 h-4 rounded-full transition"></div>
            </div>
            <div className="ml-2 dark:text-white text-gray-400 font-medium text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4">
                <path
                  fillRule="evenodd"
                  d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </label>
        </div> */}
        <div className="mr-5">
          {user === null && (
            <Link
              to="/log-in"
              href="#_"
              className="relative inline-flex items-center justify-center p-3 px-5 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-cyan-500  rounded-full shadow-md group">
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-cyan-500  group-hover:translate-x-0 ease">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-cyan-500 transition-all duration-300 transform group-hover:translate-x-full ease font-semibold">
                Log in
              </span>
              <span className="relative invisible">Log in</span>
            </Link>
          )}
          {user === null && (
            <Link
              to="/register"
              href="#_"
              className="relative inline-flex items-center justify-center p-3 px-6 py-2 ml-5 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-teal-500 rounded-full shadow-md group">
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-teal-500 group-hover:translate-x-0 ease">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-teal-500 transition-all duration-300 transform group-hover:translate-x-full ease font-semibold">
                Sign up
              </span>
              <span className="relative invisible">Sign up</span>
            </Link>
          )}
        </div>
        <div className="flex items-center ml-4">
          {user !== null && (
            <button
              type="button"
              className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-200 rounded-full h-14 w-14 mr-2 dark:hover:bg-gray-800 group">
              <svg
                className="w-7 h-7 text-gray-600 dark:text-gray-400 group-hover:text-amber-500 dark:group-hover:text-blue-500"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
          {user !== null && (
            <Link
              to="/userprofile"
              type="button"
              className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-200 rounded-full h-14 w-14 mr-2 dark:hover:bg-gray-800 group">
              <svg
                className="w-7 h-7 text-gray-600 dark:text-gray-400 group-hover:text-amber-500 dark:group-hover:text-blue-500"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </Link>
          )}
          {user !== null && (
            <button
              className="h-14 w-14 rounded-full mx-auto mr-4 flex justify-center items-center focus:text-rose-500 hover:bg-rose-100 focus:outline-none"
              onClick={handleShowLogoutModal}>
              <svg
                className="h-6 w-6 text-rose-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>
          )}
        </div>
      </nav>
      {user !== null && (
        <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium mt-3 mb-3">
          <Link
            to="/home"
            type="button"
            className="inline-flex flex-col items-center justify-center px-12 hover:bg-gray-100 rounded-full h-14  dark:hover:bg-gray-800 group">
            <svg
              className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-blue-500"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true">
              <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
              <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
            </svg>
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-blue-500">
              Home
            </span>
          </Link>
          <Link
            to="/calendar"
            type="button"
            className="inline-flex flex-col items-center justify-center px-12 hover:bg-gray-100 rounded-full h-14  dark:hover:bg-gray-800 group">
            <svg
              className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-blue-500"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true">
              <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
              <path
                fillRule="evenodd"
                d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-blue-500">
              Calendar
            </span>
          </Link>
          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-12 hover:bg-gray-100 rounded-full h-14  dark:hover:bg-gray-800 group">
            <svg
              className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-blue-500"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true">
              <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
            </svg>
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-blue-500">
              Contacts
            </span>
          </button>
        </div>
      )}
    </>
  );
}

export default NavBar;
