import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";
import { makeImagePath } from "../utils/makeImagePath";
import { LinearGradient } from "expo-linear-gradient";

const Wrapper = styled.View`
  height: 500px;
  justify-content: center;
`;
const ImageBG = styled.ImageBackground`
  height: 500px;
`;

interface IBannerProps {
  path: string;
  title: string;
  genres: string[];
  isLoading: boolean;
}

const Banner = ({ path, title, genres, isLoading }: IBannerProps) => {
  return (
    <Wrapper>
      {isLoading ? (
        <ActivityIndicator color="white" size="large" />
      ) : (
        <ImageBG
          resizeMode="cover"
          source={{
            uri: makeImagePath(path, "w500"),
          }}
        >
          <LinearGradient
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
            style={{ flex: 1 }}
          />
        </ImageBG>
      )}
    </Wrapper>
  );
};

export default Banner;
