import { USER_TOKEN } from '@/constants/token';

const saveAccessToken = (token: string) => localStorage.setItem(USER_TOKEN, token);

const getAccessToken = () => localStorage.getItem(USER_TOKEN);

const clearAccessToken = () => localStorage.removeItem(USER_TOKEN);

export { saveAccessToken, getAccessToken, clearAccessToken };
