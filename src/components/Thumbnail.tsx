import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { makeImagePath } from "../utils/makeImagePath";
import { Image } from "expo-image";
import { BLUR_HASH } from "../../const";

const Wrapper = styled.View`
  margin-right: 8px;
  background-color: ${(props) => props.theme.gray.dark};
  border-radius: 5px;
  overflow: hidden;
`;
const EmptyLogo = styled.Image`
  width: 42px;
  height: 42px;
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
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => goDetailPage(id, title, backdropPath)}
    >
      <Wrapper>
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
