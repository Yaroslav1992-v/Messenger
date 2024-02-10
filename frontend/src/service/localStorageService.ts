export interface Token {
  refreshToken: string;
  accessToken: string;
  _id: string;
  expiresIn: number;
}
const ACCESS_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USERID_KEY = "user-local-id";
const MODE = "mode";
const ACTIVE_CHAT = "active-chat";
export function setTokens({
  accessToken,
  refreshToken,
  _id,
  expiresIn = 90000,
}: Token) {
  const expiresDate = new Date().getTime() + expiresIn * 10;
  localStorage.setItem(ACCESS_KEY, accessToken);
  localStorage.setItem(USERID_KEY, _id);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_KEY, expiresDate.toString());
}
export function setMode({ mode }: { mode: "light" | "dark" }) {
  localStorage.setItem(MODE, mode);
}
export function setChat(chat: string | undefined) {
  if (chat) {
    localStorage.setItem(ACTIVE_CHAT, chat);
  } else localStorage.removeItem(ACTIVE_CHAT);
}
export function getChat() {
  return localStorage.getItem(ACTIVE_CHAT);
}
export function getMode(): "dark" | "light" | null {
  const mode = localStorage.getItem(MODE);
  if (mode) {
    return mode as "dark" | "light";
  } else return null;
}
export function getAccessToken() {
  return localStorage.getItem(ACCESS_KEY);
}
export function getUserId() {
  return localStorage.getItem(USERID_KEY);
}
export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}
export function getTokenExpiresDate() {
  return localStorage.getItem(EXPIRES_KEY);
}
export function removeAuthData() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(USERID_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXPIRES_KEY);
}

const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresDate,
  getUserId,
  removeAuthData,
  setMode,
  getMode,
  getChat,
  setChat,
};
export default localStorageService;
