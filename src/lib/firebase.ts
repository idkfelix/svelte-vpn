import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import { writable } from "svelte/store";
import type { User } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCaWDtYMcxMUDzH_dlmjTA2cYoRKoL38ZM",
  authDomain: "svelte-vpn.firebaseapp.com",
  projectId: "svelte-vpn",
  storageBucket: "svelte-vpn.appspot.com",
  messagingSenderId: "1024126618955",
  appId: "1:1024126618955:web:d95ac2cab8933593c0acce"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();



function userStore() {
  let unsubscribe: () => void;

  if (!auth || !globalThis.window) {
    console.warn('Auth is not initialized or not in browser');
    const { subscribe } = writable<User | null>(null);
    return {
      subscribe,
    }
  }

  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
  };
}

export const user = userStore();