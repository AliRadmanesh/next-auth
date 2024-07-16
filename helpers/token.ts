import { USER_TOKEN } from '@/constants/token';

const saveUserToken = (token: string) => localStorage.setItem(USER_TOKEN, token);

const getUserToken = () => localStorage.getItem(USER_TOKEN);

const clearUserToken = () => localStorage.removeItem(USER_TOKEN);

export { saveUserToken, getUserToken, clearUserToken };
