import { useRef } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from "react-native";
import { useSetRecoilState } from "recoil";
import { headerBackgroundShowAtom } from "../utils/atom";
import { useFocusEffect } from "@react-navigation/native";

const useScroll = () => {
  const scrollEventThrottle = 30;
  const scrollRef = useRef<ScrollView | null>(null);
  const setHeaderBackgroundShow = useSetRecoilState(headerBackgroundShowAtom);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scroll = event.nativeEvent.contentOffset.y;
    if (scroll > 80) {
      setHeaderBackgroundShow(true);
    } else {
      setHeaderBackgroundShow(false);
    }
  };

  useFocusEffect(() => {
    return () => {
      scrollRef.current?.scrollTo({ y: 0 });
    };
  });

  return { scrollEventThrottle, onScroll, scrollRef };
};

export default useScroll;
