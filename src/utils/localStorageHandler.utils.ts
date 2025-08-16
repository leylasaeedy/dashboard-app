import { AuthUser } from "@/types/user.type";

export const localStorageKeys = {
  usersList: "users",
  auth: "auth",
};

export const registerUser = (user: AuthUser) => {
  const users: AuthUser[] = JSON.parse(
    localStorage.getItem(localStorageKeys.usersList) || "[]"
  );
  users.push(user);
  localStorage.setItem(localStorageKeys.usersList, JSON.stringify(users));
};

export const findUser = (email: string, password: string) => {
  const users: AuthUser[] = JSON.parse(
    localStorage.getItem(localStorageKeys.usersList) || "[]"
  );
  const found = users.find((u) => u.email === email && u.password === password);
  if (found) {
    setAuth(email);
    return true;
  } else return false;
};

export const setAuth = (email: string) => {
  return localStorage.setItem(localStorageKeys.auth, JSON.stringify({ email }));
};

export const getAuth = () => {
  return localStorage.getItem(localStorageKeys.auth);
};

export const removeAuth = () => {
  localStorage.removeItem(localStorageKeys.auth);
};
