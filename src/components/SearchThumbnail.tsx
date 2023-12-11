import { TouchableOpacity } from "react-native";
import { makeImagePath } from "../utils/makeImagePath";
import styled from "styled-components/native";
import { Image } from "expo-image";
import { BLUR_HASH } from "../../const";
import useWishList from "../hooks/useWishList";
import { Entypo } from "@expo/vector-icons";
import { theme } from "../../theme";

const Wrapper = styled.View`
  padding: 5px;
`;
const ThumbnailBox = styled.View`
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.gray.dark};
  border-radius: 5px;
  overflow: hidden;
`;
const EmptyLogo = styled.Image`
  width: 42px;
  height: 42px;
`;
const Heart = styled.View`
  z-index: 1;
  position: absolute;
  top: 2px;
  right: 2px;
`;

interface ISearchThumbnailProps {
  width: number;
  height: number;
  id: number;
  title: string;
  imagePath: string;
  isMovie: boolean;
  goToDetail: (
    id: number,
    title: string,
    imagePath: string,
    isMovie: boolean
  ) => void;
  isLast: boolean;
}

const SearchThumbnail = ({
  width,
  height,
  id,
  title,
  imagePath,
  isMovie,
  goToDetail,
  isLast,
}: ISearchThumbnailProps) => {
  const { isContained } = useWishList(id);

  return (
    <Wrapper
      style={{
        width,
        height,
        marginBottom: isLast ? 50 : 0,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => goToDetail(id, title, imagePath, isMovie)}
      >
        <ThumbnailBox>
          {isContained ? (
            <Heart>
              <Entypo name="heart" size={22} color={theme.red} />
            </Heart>
          ) : null}
          {imagePath ? (
            <Image
              style={{ width: "100%", height: "100%" }}
              placeholder={BLUR_HASH}
              transition={300}
              source={{ uri: makeImagePath(imagePath, "w200") }}
            />
          ) : (
            <EmptyLogo source={require("../assets/images/netflix_logo.png")} />
          )}
        </ThumbnailBox>
      </TouchableOpacity>
    </Wrapper>
  );
};

export default SearchThumbnail;
