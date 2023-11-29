import { atom } from "recoil";

export const headerBackgroundShowAtom = atom<boolean>({
  key: "headerBackgroundShow",
  default: false,
});

export const tabRouteNameAtom = atom<string>({
  key: "tabRouteName",
  default: "",
});
