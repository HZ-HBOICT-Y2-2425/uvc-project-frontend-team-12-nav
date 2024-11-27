import { writable } from "svelte/store";

// Define the TypeScript type for an item
export interface Item {
  id: number;
  name: string;
  type: "hats" | "shirts" | "pants" | "shoes" | "accessories"; // One of the five defined types
  discount: string; // e.g., "10%", "15%", etc.
  status: "locked" | "unlocked" | "equipped"; // New status field for item lifecycle
  bundleCombo?: string; // Optional bundle combo string
}

// Initial items data
const initialItems: Item[] = [
  { id: 1, name: "Cool Hat", type: "hats", discount: "10%", status: "unlocked" },
  {
    id: 2,
    name: "Green Shirt",
    type: "shirts",
    discount: "15%",
    status: "locked",
    bundleCombo:
      "Combine this with matching pants for a 20% discount on your next purchase!",
  },
  { id: 3, name: "Comfortable Pants", type: "pants", discount: "20%", status: "locked" },
  {
    id: 4,
    name: "Eco-friendly Sneakers",
    type: "shoes",
    discount: "25%",
    status: "unlocked",
    bundleCombo: "Buy with accessories to get free delivery!",
  },
  { id: 5, name: "Stylish Sunglasses", type: "accessories", discount: "30%", status: "equipped" },
  { id: 6, name: "Bucket Hat", type: "hats", discount: "5%", status: "locked" },
  { id: 7, name: "Team Jersey", type: "shirts", discount: "10%", status: "unlocked" },
  { id: 8, name: "Sporty Pants", type: "pants", discount: "20%", status: "locked" },
  { id: 9, name: "Hiking Boots", type: "shoes", discount: "15%", status: "unlocked" },
  { id: 10, name: "Leather Gloves", type: "accessories", discount: "25%", status: "locked" }
];

// Create a writable store with the initial data
export const items = writable<Item[]>(initialItems);

// Utility functions to manipulate the store
export const unlockItem = (id: number) => {
  items.update((allItems) =>
    allItems.map((item) =>
      item.id === id ? { ...item, status: "unlocked" } : item
    )
  );
};

export const lockItem = (id: number) => {
  items.update((allItems) =>
    allItems.map((item) =>
      item.id === id ? { ...item, status: "locked" } : item
    )
  );
};

export const equipItem = (id: number) => {
  items.update((allItems) =>
    allItems.map((item) =>
      item.id === id ? { ...item, status: "equipped" } : { ...item, status: item.status === "equipped" ? "unlocked" : item.status }
    )
  );
};

export const resetItems = () => {
  items.set(initialItems);
};

// Utility function to filter items by type
export const filterItemsByType = (type: Item["type"]) => {
  return items.update((allItems) => allItems.filter((item) => item.type === type));
};
