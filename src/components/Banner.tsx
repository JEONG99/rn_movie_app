import styled from "styled-components/native";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { makeImagePath } from "../utils/makeImagePath";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { HomePageProps } from "../../App";

const Wrapper = styled.View`
  position: relative;
  height: 500px;
  justify-content: center;
`;
const ImageBG = styled.ImageBackground`
  height: 500px;
`;
const ItemWrapper = styled.View`
  position: absolute;
  bottom: -12px;
  align-self: center;
  align-items: center;
  gap: 10px;
  width: 100%;
`;
const TextBlock = styled.View`
  align-items: center;
  gap: 2px;
`;
const Title = styled.Text`
  color: white;
  font-size: 44px;
  font-weight: 700;
  text-align: center;
  line-height: 44px;
`;
const Genres = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 400;
  text-align: center;
`;
const IconsBlock = styled.View`
  width: 100%;
  padding: 0 30px;

  flex-direction: row;
  justify-content: space-between;
`;
const Icon = styled.View`
  align-items: center;
`;
const IconText = styled.Text`
  color: white;
  font-weight: 400;
`;

interface IBannerProps {
  id: number | undefined;
  path: string;
  backdropPath: string;
  title: string;
  genres: string[];
  isLoading: boolean;
}

const Banner = ({
  id,
  path,
  backdropPath,
  title,
  genres,
  isLoading,
}: IBannerProps) => {
  const navigation = useNavigation<HomePageProps["navigation"]>();
  const goDetailPage = () => {
    if (id === undefined) return;
    navigation.navigate("Detail", {
      id,
      title,
      imagePath: backdropPath,
    });
  };

  return (
    <Wrapper>
      {isLoading ? (
        <ActivityIndicator color="white" size="large" />
      ) : (
        <>
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
          <ItemWrapper>
            <TextBlock>
              <Title>{title}</Title>
              <Genres>{genres.join("•")}</Genres>
            </TextBlock>
            <IconsBlock>
              <TouchableOpacity>
                <Icon>
                  <Feather name="plus-circle" size={26} color="white" />
                  <IconText>Add Wish List</IconText>
                </Icon>
              </TouchableOpacity>
              <TouchableOpacity onPress={goDetailPage}>
                <Icon>
                  <Feather name="info" size={26} color="white" />
                  <IconText>Information</IconText>
                </Icon>
              </TouchableOpacity>
            </IconsBlock>
          </ItemWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default Banner;