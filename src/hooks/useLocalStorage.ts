import { Dispatch, SetStateAction, useState } from 'react';
// Define a generic type for the hook

type UseLocalStorage<T> = [T, Dispatch<SetStateAction<T>>];

function useLocalStorage<T>(key: string, defaultValue: T): UseLocalStorage<T> {
  // Create state variable to store
  // localStorage value in state
  const [localStorageValue, setLocalStorageValue] = useState(() => {
    try {
      const value = localStorage.getItem(key);
      // If value is already present in
      // localStorage then return it

      // Else set default value in
      // localStorage and then return it
      if (value) {
        return JSON.parse(value);
      } else {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (error) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
  });

  // this method update our localStorage and our state
  const setLocalStorageStateValue = (valueOrFn: any) => {
    let newValue;
    if (typeof valueOrFn === 'function') {
      newValue = valueOrFn(localStorageValue);
    } else {
      newValue = valueOrFn;
    }
    localStorage.setItem(key, JSON.stringify(newValue));
    setLocalStorageValue(newValue);
  };

  return [localStorageValue, setLocalStorageStateValue];
}

export default useLocalStorage;
