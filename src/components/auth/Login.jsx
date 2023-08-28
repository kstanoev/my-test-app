import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { loginUser } from '../../services/authService';
import logo from '../../assets/logo.png';

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const updateForm = (prop) => (e) => {
    setForm({
      ...form,
      [prop]: e.target.value
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onLogin();
    }
  };

  const onLogin = () => {
    if (!form.email) {
      return alert('Email is required');
    }

    if (!form.password || form.password.length < 6) {
      return alert('Password is required and must be at least 6 characters');
    }

    loginUser(form.email, form.password)
      .then((credential) => {
        setUser({
          user: credential.user
        });
      })
      .then(() => {
        navigate('/home');
      })
      .catch((error) => {
        setErrorMessage('Incorrect email or password');
        console.error('Error during login:', error);
      });
  };

  return (
    <div
      className="flex flex-col items-center justify-start px-6 mx-auto md:h-screen lg:py-0"
      style={{
        backgroundImage:
          'url("https://img.freepik.com/free-vector/neumorphic-round-shape-design-empty-white-banner_1017-43171.jpg?w=2000&t=st=1692810749~exp=1692811349~hmac=0c5267f5294936511cf35da4e3f185f8d35878b3678fa452f05a1622d5eb401e")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
      <a
        href="#"
        className="flex items-center mb-6 mt-14 text-2xl font-semibold text-gray-900 dark:text-white">
        <img className="w-8 h-8 mr-2" src={logo} alt="SpectraSchedule logo" />
        SpectraSchedule
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Log in to your account
          </h1>
          <div className="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={updateForm('email')}
                onKeyDown={handleKeyDown}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={form.password}
                onChange={updateForm('password')}
                onKeyDown={handleKeyDown}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                    Remember me
                  </label>
                </div>
              </div>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button
              type="submit"
              onClick={onLogin}
              className="w-full text-white bg-cyan-500 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
