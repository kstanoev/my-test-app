import { get, set, ref, query, orderByChild, equalTo, update } from 'firebase/database';
import { db } from '../services/firebase';

export const getUserByHandle = (handle) => {
  return get(ref(db, `users/${handle}`));
};

export const createUserHandle = (
  handle,
  uid,
  email,
  firstName,
  lastName,
  phoneNumber,
  role = 'regular',
  blocked = false
) => {
  return set(ref(db, `users/${handle}`), {
    uid,
    email,
    firstName,
    handle,
    lastName,
    phoneNumber,
    role,
    blocked,
    createdOn: Date.now()
  });
};

export const getUserData = (uid) => {
  return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
};

export const changeFirstName = (handle, newFirstName) => {
  const userRef = ref(db, `users/${handle}`);
  return update(userRef, {
    firstName: newFirstName
  });
};

export const changeLastName = (handle, newLastName) => {
  const userRef = ref(db, `users/${handle}`);
  return update(userRef, {
    lastName: newLastName
  });
};

export const changePhoneNumber = (handle, newPhoneNumber) => {
  const userRef = ref(db, `users/${handle}`);
  return update(userRef, {
    phoneNumber: newPhoneNumber
  });
};

export const changeAddress = (handle, newAddress) => {
  const userRef = ref(db, `users/${handle}`);
  return update(userRef, {
    address: newAddress
  });
};

export const getAllUsers = async () => {
  const usersRef = ref(db, 'users');
  const usersSnapshot = await get(usersRef);

  if (usersSnapshot.exists()) {
    const userData = usersSnapshot.val();
    const userList = Object.values(userData);
    return userList;
  } else {
    return [];
  }
};

export const updateUserRoleInFirebase = (handle, newRole) => {
  const userRef = ref(db, `users/${handle}`);
  return update(userRef, {
    role: newRole
  });
};

export const blockUser = (handle) => {
  const userRef = ref(db, `users/${handle}`);
  return update(userRef, {
    blocked: true
  });
};

export const unblockUser = (handle) => {
  const userRef = ref(db, `users/${handle}`);
  return update(userRef, {
    blocked: false
  });
};
