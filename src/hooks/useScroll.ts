import { useRef, useEffect } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from "react-native";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { headerBackgroundShowAtom, tabRouteNameAtom } from "../utils/atom";

const useScroll = () => {
  const scrollEventThrottle = 30;
  const scrollRef = useRef<ScrollView | null>(null);
  const setHeaderBackgroundShow = useSetRecoilState(headerBackgroundShowAtom);
  const tabRouteName = useRecoilValue(tabRouteNameAtom);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scroll = event.nativeEvent.contentOffset.y;
    if (scroll > 80) {
      setHeaderBackgroundShow(true);
    } else {
      setHeaderBackgroundShow(false);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0 });
  }, [tabRouteName]);

  return { scrollEventThrottle, onScroll, scrollRef };
};

export default useScroll;
