import { atom } from "jotai";

export const state = atom<{ name: string; age: number }[]>([
  {
    name: "katayama",
    age: 20,
  },
  {
    name: "okuda",
    age: 30,
  },
]);
