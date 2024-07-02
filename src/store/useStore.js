// src/store/useStore.js
import { create } from 'zustand'
import { getFromLocalStorage, removeFromLocalStorage, setInLocalStorage, getSimpleFromLocalStorage } from '../utils/storage';

const localStorageKey = 'club-session';
const localStorageThemeKey = 'club-theme';
const sessionData = getFromLocalStorage(localStorageKey);
const themeData = getSimpleFromLocalStorage(localStorageThemeKey) || 'light';
document.documentElement.classList.toggle('dark', themeData === 'dark');

const useStore = create((set) => ({
    userData: sessionData,
    theme: themeData,
    setUserData: (userData) => {
        set({ userData: userData });
        if (!userData) {
            removeFromLocalStorage(localStorageKey);
        } else {
            setInLocalStorage(localStorageKey, JSON.stringify(userData));
        }
    },
    setTheme: (theme) => {
        set({ theme: theme });
        setInLocalStorage(localStorageThemeKey, theme);
        document.documentElement.classList.toggle('dark', theme === 'dark');
    },
}));

export default useStore;