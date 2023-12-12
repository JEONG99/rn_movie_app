import { atom } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const headerBackgroundShowAtom = atom<boolean>({
  key: "headerBackgroundShow",
  default: false,
});

export const tabRouteNameAtom = atom<string>({
  key: "tabRouteName",
  default: "Movie",
});

export const searchQueryAtom = atom<string>({
  key: "searchQuery",
  default: "",
});

export const WISHLIST_STORAGE_KEY = "@wishList";

const getWishList = async () => {
  try {
    const _wishList = await AsyncStorage.getItem(WISHLIST_STORAGE_KEY);
    if (_wishList) {
      return JSON.parse(_wishList);
    }
    return [];
  } catch (e) {
    Alert.alert(e as string);
    return [];
  }
};

export const wishListAtom = atom<
  {
    id: number;
    title: string;
    isMovie: boolean;
    posterPath: string;
    backdropPath: string;
  }[]
>({
  key: "wishList",
  default: getWishList(),
});
