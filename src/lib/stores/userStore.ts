import { writable } from 'svelte/store';

// Define the User interface
export interface User {
  id: number;
  name: string;
  email: string;
  completedQuestionnaire: boolean;
}

// Create the store with User or null as the default type
export const user = writable<User | null>(null);
