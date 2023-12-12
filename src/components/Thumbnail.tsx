import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { makeImagePath } from "../utils/makeImagePath";
import { Image } from "expo-image";
import { BLUR_HASH } from "../../const";
import { Entypo } from "@expo/vector-icons";
import { theme } from "../../theme";
import useWishList from "../hooks/useWishList";

const Wrapper = styled.View`
  position: relative;
  margin-right: 8px;
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

interface IThumbnailProps {
  id: number;
  title: string;
  imagePath: string;
  backdropPath: string;
  goDetailPage: (id: number, title: string, imagePath: string) => void;
}

const Thumbnail = ({
  id,
  title,
  imagePath,
  backdropPath,
  goDetailPage,
}: IThumbnailProps) => {
  const { isContained } = useWishList(id, title);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => goDetailPage(id, title, backdropPath)}
    >
      <Wrapper>
        {isContained ? (
          <Heart>
            <Entypo name="heart" size={22} color={theme.red} />
          </Heart>
        ) : null}
        {imagePath ? (
          <Image
            style={{ width: 110, height: 150 }}
            source={{ uri: makeImagePath(imagePath, "w200") }}
            placeholder={BLUR_HASH}
            transition={300}
          />
        ) : (
          <EmptyLogo source={require("../assets/images/netflix_logo.png")} />
        )}
      </Wrapper>
    </TouchableOpacity>
  );
};

export default Thumbnail;
