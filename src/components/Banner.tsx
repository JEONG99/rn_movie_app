import styled from "styled-components/native";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { makeImagePath } from "../utils/makeImagePath";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { BLUR_HASH } from "../../const";
import useWishList from "../hooks/useWishList";
import WishListIcon from "./WishListIcon";

const Wrapper = styled.View`
  position: relative;
  height: 500px;
  justify-content: center;
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
  font-size: 14px;
`;

interface IBannerProps {
  id: number;
  path: string;
  backdropPath: string;
  title: string;
  genres: string[];
  isLoading: boolean;
  goDetailPage: () => void;
  isMovie: boolean;
}

const Banner = ({
  id,
  path,
  backdropPath,
  title,
  genres,
  isLoading,
  goDetailPage,
  isMovie,
}: IBannerProps) => {
  const { disabled, isContained, setWishListToStorage } = useWishList(
    id,
    title,
    isMovie
  );

  return (
    <Wrapper>
      {isLoading ? (
        <ActivityIndicator color="white" size="large" />
      ) : (
        <>
          <Image
            style={{ height: 500 }}
            contentFit="cover"
            source={{
              uri: makeImagePath(path, "w500"),
            }}
            placeholder={BLUR_HASH}
            transition={300}
          >
            <LinearGradient
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
              style={{ flex: 1 }}
            />
          </Image>
          <ItemWrapper>
            <TextBlock>
              <Title>{title}</Title>
              <Genres>{genres.join("•")}</Genres>
            </TextBlock>
            <IconsBlock>
              <TouchableOpacity
                disabled={disabled}
                onPress={() => setWishListToStorage(path, backdropPath)}
              >
                <WishListIcon
                  fontSize={14}
                  fontColor="white"
                  isChecked={isContained}
                />
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
