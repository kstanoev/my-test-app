import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getUserByHandle, createUserHandle } from '../../services/userService';
import { registerUser } from '../../services/authService';
import logo from '../../assets/logo.png';
import {
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH
} from '../../utils/constants';

export default function Register() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    handle: '',
    firstName: '',
    lastName: '',
    phoneNumber: ''
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

  const onRegister = () => {
    if (
      !form.firstName ||
      form.firstName.length < MIN_NAME_LENGTH ||
      form.firstName.length > MAX_NAME_LENGTH ||
      !/^[A-Za-z]{1,30}$/.test(form.firstName)
    ) {
      setErrorMessage(
        'First name must be between 1 and 30 characters and must contain only uppercase and lowercase letters.'
      );
      return;
    }

    if (
      !form.lastName ||
      form.lastName.length < MIN_NAME_LENGTH ||
      form.lastName.length > MAX_NAME_LENGTH ||
      !/^[A-Za-z]{1,30}$/.test(form.lastName)
    ) {
      setErrorMessage(
        'Last name must be between 1 and 30 characters and must contain only uppercase and lowercase letters'
      );
      return;
    }

    if (!form.email) {
      setErrorMessage('Email is required');
      return;
    }

    if (!form.phoneNumber || !/^[0-9]{10}$/.test(form.phoneNumber)) {
      setErrorMessage('Please enter a valid 10-digit phone number');
      return;
    }

    if (
      !form.password ||
      form.password.length < MIN_PASSWORD_LENGTH ||
      form.password.length > MAX_PASSWORD_LENGTH
    ) {
      setErrorMessage('Password is required and must be between 8 and 30 characters');
      return;
    }

    if (!form.handle) {
      setErrorMessage('User name is required');
      return;
    }

    getUserByHandle(form.handle)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setErrorMessage('User name already exists');
          return;
        }

        return registerUser(form.email, form.password);
      })
      .then((credential) => {
        return createUserHandle(
          form.handle,
          credential.user.uid,
          form.email,
          form.firstName,
          form.lastName,
          form.phoneNumber
        ).then(() => {
          setUser({
            user: credential.user
          });
        });
      })
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Error during registration:', error);
      });
  };

  return (
    <section
      className="bg-gray-50 dark:bg-gray-900"
      style={{
        backgroundImage:
          'url("https://img.freepik.com/free-vector/neumorphic-round-shape-design-empty-white-banner_1017-43171.jpg?w=2000&t=st=1692810749~exp=1692811349~hmac=0c5267f5294936511cf35da4e3f185f8d35878b3678fa452f05a1622d5eb401e")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
      <div className="flex flex-col items-center justify-center px-6 py-4 mx-auto md:h-screen">
        <a
          href="#"
          className="flex items-center mb-6 mt-4 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src={logo} alt="SpectraSchedule logo" />
          SpectraSchedule
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mb-40">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-stone-600 md:text-2xl dark:text-white text-center pb-3">
              Create account
            </h1>
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={form.firstName}
                  onChange={updateForm('firstName')}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="First name"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={form.lastName}
                  onChange={updateForm('lastName')}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Last name"
                />
              </div>
              <div>
                <label
                  htmlFor="handle"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  User name
                </label>
                <input
                  type="text"
                  name="handle"
                  id="handle"
                  value={form.handle}
                  onChange={updateForm('handle')}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="User name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={updateForm('email')}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={form.phoneNumber}
                  onChange={updateForm('phoneNumber')}
                  pattern="[0-9]{10}"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="1234567890"
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
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                  I accept the{' '}
                  <a
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    href="#">
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="flex justify-center">
              <button
                type="submit"
                onClick={onRegister}
                className="w-full text-white bg-teal-500 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Create an account
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
