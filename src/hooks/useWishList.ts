import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useMemo, useState } from "react";
import { Alert } from "react-native";
import { useRecoilState } from "recoil";
import { WISHLIST_STORAGE_KEY, wishListAtom } from "../utils/atom";

const useWishList = (id: number, title: string, isMovie?: boolean) => {
  const [disabled, setDisabled] = useState(false);
  const [wishList, setWishList] = useRecoilState(wishListAtom);
  const isContained = useMemo(() => {
    return wishList.find((item) => item.id === id) !== undefined;
  }, [wishList]);

  const addToWishList = async (posterPath: string, backdropPath: string) => {
    if (isMovie === undefined) return;
    try {
      const newWishList = [
        ...wishList,
        { id, title, isMovie, posterPath, backdropPath },
      ];
      await AsyncStorage.setItem(
        WISHLIST_STORAGE_KEY,
        JSON.stringify(newWishList)
      );
      setWishList(newWishList);
    } catch (e) {
      Alert.alert(e as string);
    } finally {
      setTimeout(() => setDisabled(false), 300);
    }
  };

  const deleteToWishList = async () => {
    try {
      const newWishList = wishList.filter((item) => item.id !== id);
      await AsyncStorage.setItem(
        WISHLIST_STORAGE_KEY,
        JSON.stringify(newWishList)
      );
      setWishList(newWishList);
    } catch (e) {
      Alert.alert(e as string);
    } finally {
      setTimeout(() => setDisabled(false), 300);
    }
  };

  const setWishListToStorage = useCallback(
    (posterPath: string, backdropPath: string) => {
      setDisabled(true);
      if (isContained) {
        deleteToWishList();
      } else {
        addToWishList(posterPath, backdropPath);
      }
    },
    [isContained]
  );

  return { disabled, isContained, setWishListToStorage };
};

export default useWishList;
