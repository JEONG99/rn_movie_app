import {} from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Image } from "expo-image";
import { BLUR_HASH } from "../../const";
import { makeImagePath } from "../utils/makeImagePath";
import WishListIcon from "./WishListIcon";
import useWishList from "../hooks/useWishList";

const Wrapper = styled.View`
  padding: 0 4px;
  height: 375px;
  flex-direction: row;
`;
const Ranking = styled.View`
  flex: 0.15;
  max-width: 45px;
`;
const RankingText = styled.Text`
  color: white;
  font-weight: 800;
  font-size: 26px;
`;
const MainBody = styled.View`
  flex: 0.85;
`;
const ImageBox = styled.View`
  overflow: hidden;
  width: 100%;
  height: 180px;
  border-radius: 15px;
  background-color: white;
`;
const Icons = styled.View`
  align-items: flex-end;
  margin-top: 20px;
  margin-bottom: 10px;
  padding: 0 30px;
`;
const Title = styled.Text`
  color: white;
  font-weight: 800;
  font-size: 20px;
`;
const Overview = styled.Text`
  margin: 6px 0;
  padding-right: 50px;
  color: ${(props) => props.theme.gray.dark};
`;
const Genres = styled.Text`
  color: ${(props) => props.theme.gray.light};
`;

interface ITrendingItemProps {
  id: number;
  index: string;
  title: string;
  imagePath: string;
  overview: string;
  genres: string[];
}

const TrendingItem = ({
  id,
  index,
  title,
  imagePath,
  overview,
  genres,
}: ITrendingItemProps) => {
  const { disabled, isContained, setWishListToStorage } = useWishList(id);

  return (
    <Wrapper>
      <Ranking>
        <RankingText>{index.padStart(2, "0")}</RankingText>
      </Ranking>
      <MainBody>
        <ImageBox>
          <Image
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
            source={{
              uri: makeImagePath(imagePath, "w500"),
            }}
            placeholder={BLUR_HASH}
            transition={300}
          />
        </ImageBox>
        <Icons>
          <TouchableOpacity disabled={disabled} onPress={setWishListToStorage}>
            <WishListIcon isChecked={isContained} />
          </TouchableOpacity>
        </Icons>
        <Title>{title}</Title>
        <Overview numberOfLines={3}>{overview}</Overview>
        <Genres>{genres.join("•")}</Genres>
      </MainBody>
    </Wrapper>
  );
};

export default TrendingItem;
