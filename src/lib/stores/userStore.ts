import { writable } from 'svelte/store';

export interface User {
  id: number;
  name: string;
  email: string;
  completedQuestionnaire: boolean;
}

// Check localStorage only in the browser (prevents SSR errors)
const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
export const user = writable<User | null>(storedUser ? JSON.parse(storedUser) : null);

// Sync store updates with localStorage
user.subscribe((value) => {
  if (typeof window !== 'undefined') {
    if (value) {
      localStorage.setItem('user', JSON.stringify(value));
    } else {
      localStorage.removeItem('user');
    }
  }
});
