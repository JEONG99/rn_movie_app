import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { makeImagePath } from "../utils/makeImagePath";

const Wrapper = styled.View`
  margin-right: 8px;
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
`;
const ThumbnailImage = styled.Image`
  width: 110px;
  height: 150px;
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
        <ThumbnailImage source={{ uri: makeImagePath(imagePath, "w200") }} />
      </Wrapper>
    </TouchableOpacity>
  );
};

export default Thumbnail;