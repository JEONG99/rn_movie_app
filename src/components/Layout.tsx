import styled from "styled-components/native";
import { useRecoilValue } from "recoil";
import { MaterialIcons } from "@expo/vector-icons";
import { headerBackgroundShowAtom } from "../utils/atom";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import { Animated, Pressable } from "react-native";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;
const Header = styled(Animated.View)<{ $show: boolean }>`
  position: absolute;
  z-index: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 45px 20px;
  padding-bottom: 10px;
  width: 100%;
`;
const HeaderIcon = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;
const HeaderText = styled.Text`
  font-size: 38px;
  font-weight: 600;
  color: white;
`;
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const BannerShadow = styled(AnimatedLinearGradient)`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 200px;
`;

export type iconNames = "movie" | "live-tv" | "video-collection";

const icons: {
  [key: string]: iconNames;
} = {
  Movie: "movie",
  "Tv Show": "live-tv",
  Hot: "video-collection",
};

interface ILayoutProps {
  children: any;
  title: string;
  goSearch: () => void;
}

const Layout = ({ children, title, goSearch }: ILayoutProps) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const showBackground = useRecoilValue(headerBackgroundShowAtom);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (showBackground) {
      fadeOut();
    } else {
      fadeIn();
    }
  }, [showBackground]);

  return (
    <Container>
      {title === "Movie" || title === "Tv Show" ? (
        <BannerShadow
          colors={["rgba(0,0,0,1)", "rgba(0,0,0,0)"]}
          style={{ opacity: fadeAnim }}
        />
      ) : null}
      <Header
        $show={showBackground}
        style={{
          backgroundColor: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ["rgba(0,0,0,0.85)", "rgba(0,0,0,0)"],
          }),
        }}
      >
        <HeaderIcon>
          <MaterialIcons name={icons[title]} size={36} color="white" />
          <HeaderText>{title}</HeaderText>
        </HeaderIcon>
        <HeaderIcon>
          <Pressable onPress={goSearch}>
            <MaterialIcons name="search" size={30} color="white" />
          </Pressable>
        </HeaderIcon>
      </Header>
      {children}
    </Container>
  );
};

export default Layout;
