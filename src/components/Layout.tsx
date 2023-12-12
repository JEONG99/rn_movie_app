import styled from "styled-components/native";
import { useRecoilValue } from "recoil";
import { MaterialIcons } from "@expo/vector-icons";
import { headerBackgroundShowAtom } from "../utils/atom";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import { Animated, TouchableNativeFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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

  padding: 55px 20px;
  padding-bottom: 10px;
  width: 100%;
`;
const HeaderLogo = styled.Image`
  width: 32px;
  height: 32px;
`;
const HeaderIcon = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
const HeaderText = styled.Text`
  line-height: 32px;
  font-size: 32px;
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

interface ILayoutProps {
  children: any;
  title: string;
  goSearch: () => void;
  goProfile: () => void;
}

const Layout = ({ children, title, goSearch, goProfile }: ILayoutProps) => {
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
        {title === "Hot" ? (
          <HeaderText>HOT</HeaderText>
        ) : (
          <HeaderLogo source={require("../assets/images/netflix_logo.png")} />
        )}
        <HeaderIcon>
          <TouchableNativeFeedback onPress={goSearch}>
            <MaterialIcons name="search" size={30} color="white" />
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={goProfile}>
            <Ionicons name="person-circle-outline" size={30} color="white" />
          </TouchableNativeFeedback>
        </HeaderIcon>
      </Header>
      {children}
    </Container>
  );
};

export default Layout;
