import { useEffect, useState } from 'react';
import { useAuth, upload } from '../services/firebase';
import {
  getUserByHandle,
  getUserData,
  changeFirstName,
  changeLastName,
  changePhoneNumber,
  changeAddress
} from '../services/userService';

export default function UserProfile() {
  const currentUser = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [phoneNumberInput, setPhoneNumberInput] = useState('');
  const [addressInput, setAddressInput] = useState('');
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
  );
  const [uploaded, setUploaded] = useState(false);
  const [originalPhotoURL, setOriginalPhotoURL] = useState('');

  function handleChange(e) {
    if (e.target.files[0]) {
      const selectedPhoto = e.target.files[0];
      setPhoto(selectedPhoto);
      setOriginalPhotoURL(photoURL);
      setPhotoURL(URL.createObjectURL(selectedPhoto));
      setUploaded(false);
    }
  }

  function handleClick() {
    setLoading(true);
    upload(photo, currentUser)
      .then((photoURL) => {
        setPhotoURL(photoURL);
        setLoading(false);
        setUploaded(true);
        setPhoto(null);
        setUploaded(false);
      })
      .catch((error) => {
        console.error('Error uploading profile photo:', error);
        setLoading(false);
      });
  }

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  const handleEditClick = () => {
    setEditMode(true);
    setFirstNameInput(userProfile.firstName || '');
    setLastNameInput(userProfile.lastName || '');
    setPhoneNumberInput(userProfile.phoneNumber || '');
    setAddressInput(userProfile.address || '');
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleSaveClick = async () => {
    try {
      await Promise.all([
        changeFirstName(userProfile.handle, firstNameInput),
        changeLastName(userProfile.handle, lastNameInput),
        changePhoneNumber(userProfile.handle, phoneNumberInput),
        changeAddress(userProfile.handle, addressInput)
      ]);

      setUserProfile((prevProfile) => ({
        ...prevProfile,
        firstName: firstNameInput,
        lastName: lastNameInput,
        phoneNumber: phoneNumberInput,
        address: addressInput
      }));

      setEditMode(false);
      console.log('User profile updated successfully!');
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  async function fetchUserProfile(handle) {
    try {
      const userProfileSnapshot = await getUserByHandle(handle);
      return userProfileSnapshot.val();
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  useEffect(() => {
    async function fetchUserProfileData() {
      if (currentUser) {
        const fetchedUserProfile = await fetchUserProfile(currentUser.handle);
        setUserProfile(fetchedUserProfile);
      }
    }

    fetchUserProfileData();
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      getUserData(currentUser.uid)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            const firstUser = Object.values(userData)[0];
            setUserProfile(firstUser);
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [currentUser]);

  const joinedDate = userProfile ? new Date(userProfile.createdOn) : null;
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const formattedJoinedDate = joinedDate ? joinedDate.toLocaleDateString(undefined, options) : '';

  return (
    <>
      {userProfile && (
        <div className="h-full bg-white pb-8 pl-8 pr-8">
          <div className="bg-white rounded-lg shadow-xl pb-8 pt-4">
            <div className="w-full h-[250px]">
              <img
                src="https://img.freepik.com/free-photo/solid-painted-concrete-wall-textured-background_53876-101613.jpg?w=1800&t=st=1692884397~exp=1692884997~hmac=e11747698acf099eba69ada610340cb4bd971d2576599630be10759b4b25debe"
                className="w-full h-full rounded-tl-lg rounded-tr-lg"
              />
            </div>
            <div className="flex flex-col items-center -mt-20">
              <label htmlFor="profilePhotoInput">
                <input
                  id="profilePhotoInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleChange}
                />
                <img
                  src={photoURL || userProfile.photoURL}
                  alt="Profile"
                  className="w-40 h-40 rounded-full cursor-pointer"
                />
              </label>
              {!uploaded && photo && (
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    onClick={handleClick}
                    disabled={loading}
                    className="flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-cyan-500 border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-cyan-500 hover:border-cyan-500 focus:outline-none">
                    Upload
                  </button>
                  <button
                    onClick={() => {
                      setPhoto(null);
                      setPhotoURL(originalPhotoURL);
                      setOriginalPhotoURL('');
                    }}
                    className="flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-rose-400 border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-rose-400 hover:border-rose-400 focus:outline-none">
                    Cancel
                  </button>
                </div>
              )}

              <div className="flex items-center space-x-2 mt-2">
                <p className="text-2xl text-gray-600 mb-4 mt-2">
                  {' '}
                  {userProfile.firstName} {userProfile.lastName}
                </p>
              </div>
              <ul className="mt-2">
                <li className="flex py-2">
                  <span className="font-bold w-24 text-gray-600">Username:</span>
                  <span className="text-gray-500">{userProfile.handle}</span>
                </li>
                <li className="flex py-2">
                  <span className="font-bold w-24 text-gray-600">Email:</span>
                  <span className="text-gray-500">{userProfile.email}</span>
                </li>
                <li className="flex py-2">
                  <span className="font-bold w-24 text-gray-600">Status:</span>
                  <span className="text-gray-500">{userProfile.role}</span>
                </li>
                <li className="flex py-2">
                  <span className="font-bold w-24 text-gray-600">Joined:</span>
                  <span className="text-gray-500">{formattedJoinedDate}</span>
                </li>
              </ul>
            </div>
            <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2"></div>
          </div>
          <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
            <div className="w-full flex flex-col">
              <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                <h4 className="text-xl text-gray-600 font-bold mb-4 flex items-center justify-between">
                  Personal Info
                  <div className="flex items-center space-x-4">
                    {!editMode ? (
                      <button
                        onClick={handleEditClick}
                        href="#_"
                        className="flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-cyan-500 border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-cyan-500 hover:border-cyan-500 focus:outline-none">
                        Edit
                      </button>
                    ) : (
                      <div className="flex space-x-4">
                        {' '}
                        <button
                          onClick={handleSaveClick}
                          href="#_"
                          className="flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-teal-500 border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-teal-500 hover:border-teal-500 focus:outline-none">
                          Save
                        </button>
                        <button
                          onClick={handleCancelClick}
                          href="#_"
                          className="flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-rose-400 border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-rose-400 hover:border-rose-400 focus:outline-none">
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </h4>

                <ul className="mt-2 text-gray-500">
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24 text-gray-600">First name:</span>
                    {editMode ? (
                      <input
                        type="text"
                        value={firstNameInput}
                        onChange={(e) => setFirstNameInput(e.target.value)}
                        className="border rounded px-2 py-1 w-40 text-gray-600"
                      />
                    ) : (
                      <span className="text-gray-500">{userProfile.firstName}</span>
                    )}
                  </li>
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24 text-gray-600">Last name:</span>
                    {editMode ? (
                      <input
                        type="text"
                        value={lastNameInput}
                        onChange={(e) => setLastNameInput(e.target.value)}
                        className="border rounded px-2 py-1 w-40 text-gray-600"
                      />
                    ) : (
                      <span className="text-gray-500">{userProfile.lastName}</span>
                    )}
                  </li>
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24 text-gray-600">Username:</span>
                    <span className="text-gray-500">{userProfile.handle}</span>
                  </li>
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24 text-gray-600">Email:</span>
                    <span className="text-gray-500">{userProfile.email}</span>
                  </li>
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24 text-gray-600">Phone:</span>
                    {editMode ? (
                      <input
                        type="tel"
                        value={phoneNumberInput}
                        onChange={(e) => setPhoneNumberInput(e.target.value)}
                        className="border rounded px-2 py-1 w-40 text-gray-600"
                      />
                    ) : (
                      <span className="text-gray-500">{userProfile.phoneNumber}</span>
                    )}
                  </li>
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24 text-gray-600">Address:</span>
                    {editMode ? (
                      <input
                        type="text"
                        value={addressInput}
                        onChange={(e) => setAddressInput(e.target.value)}
                        className="border rounded px-2 py-1 w-40 text-gray-600"
                      />
                    ) : (
                      <span className="text-gray-500">{userProfile.address}</span>
                    )}
                  </li>
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24 text-gray-600">Joined:</span>
                    <span className="text-gray-500">{formattedJoinedDate}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
