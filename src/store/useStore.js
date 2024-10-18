// src/store/useStore.js
import { create } from 'zustand'
import { getFromLocalStorage, removeFromLocalStorage, setInLocalStorage, getSimpleFromLocalStorage } from '../utils/storage';

const localStorageKey = 'club-session';
const localStorageThemeKey = 'club-theme';
const sessionData = getFromLocalStorage(localStorageKey);
const themeData = getSimpleFromLocalStorage(localStorageThemeKey) || 'light';
const clubId = getSimpleFromLocalStorage('club_id');
const clubName = getSimpleFromLocalStorage('club_name');
document.documentElement.classList.toggle('dark', themeData === 'dark');

const useStore = create((set) => ({
    userData: sessionData,
    theme: themeData,
    club_id: clubId,
    club_name: clubName,
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
    setClubId: (clubId) => {
        set({ club_id: clubId });
        setInLocalStorage('club_id', clubId);
    },
    setClubName: (clubName) => {
        set({ club_name: clubName });
        setInLocalStorage('club_name', clubName);
    }
}));

export default useStore;