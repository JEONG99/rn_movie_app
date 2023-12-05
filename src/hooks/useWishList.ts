import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useMemo } from "react";
import { Alert } from "react-native";
import { useRecoilState } from "recoil";
import { WISHLIST_STORAGE_KEY, wishListAtom } from "../utils/atom";

const useWishList = (id: number) => {
  const [wishList, setWishList] = useRecoilState(wishListAtom);
  const isContained = useMemo(() => {
    return wishList.find((v) => v === id) !== undefined;
  }, [wishList]);

  const addToWishList = async () => {
    try {
      const newWishList = [...wishList, id];
      await AsyncStorage.setItem(
        WISHLIST_STORAGE_KEY,
        JSON.stringify(newWishList)
      );
      setWishList(newWishList);
    } catch (e) {
      Alert.alert(e as string);
    }
  };

  const deleteToWishList = async () => {
    try {
      const newWishList = wishList.filter((v) => v !== id);
      await AsyncStorage.setItem(
        WISHLIST_STORAGE_KEY,
        JSON.stringify(newWishList)
      );
      setWishList(newWishList);
    } catch (e) {
      Alert.alert(e as string);
    }
  };

  const setWishListToStorage = useCallback(() => {
    if (isContained) {
      deleteToWishList();
    } else {
      addToWishList();
    }
  }, [isContained]);

  return { isContained, setWishListToStorage };
};

export default useWishList;
