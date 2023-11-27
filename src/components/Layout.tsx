import styled from "styled-components/native";
import { useRecoilValue } from "recoil";
import { MaterialIcons } from "@expo/vector-icons";
import { headerBackgroundShowAtom } from "../utils/atom";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;
const Header = styled(Animated.View)<{ $show: boolean }>`
  position: absolute;
  z-index: 1;
  flex-direction: row;
  align-items: center;
  gap: 6px;

  padding: 45px 20px;
  padding-bottom: 10px;
  width: 100%;
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

export type iconNames = "movie" | "live-tv";

const icons: {
  [key: string]: iconNames;
} = {
  Movie: "movie",
  "Tv Show": "live-tv",
};

interface ILayoutProps {
  children: any;
  title: string;
}

const Layout = ({ children, title }: ILayoutProps) => {
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
      <BannerShadow
        colors={["rgba(0,0,0,1)", "rgba(0,0,0,0)"]}
        style={{ opacity: fadeAnim }}
      />
      <Header
        $show={showBackground}
        style={{
          backgroundColor: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ["rgba(0,0,0,0.85)", "rgba(0,0,0,0)"],
          }),
        }}
      >
        <MaterialIcons name={icons[title]} size={36} color="white" />
        <HeaderText>{title}</HeaderText>
      </Header>
      {children}
    </Container>
  );
};

export default Layout;
