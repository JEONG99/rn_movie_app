import { Image } from "react-native";
import { makeImagePath } from "../utils/makeImagePath";
import styled from "styled-components/native";

const Wrapper = styled.View`
  padding: 5px;
`;
const ThumbnailBox = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.gray.dark};
  border-radius: 5px;
  overflow: hidden;
`;
const Thumbnail = styled.Image`
  width: 100%;
  height: 100%;
`;
const EmptyLogo = styled.Image`
  width: 42px;
  height: 42px;
`;

interface ISearchThumbnailProps {
  width: number;
  height: number;
  imagePath: string;
}

const SearchThumbnail = ({
  width,
  height,
  imagePath,
}: ISearchThumbnailProps) => {
  return (
    <Wrapper
      style={{
        width,
        height,
      }}
    >
      <ThumbnailBox>
        {imagePath ? (
          <Thumbnail source={{ uri: makeImagePath(imagePath, "w200") }} />
        ) : (
          <EmptyLogo source={require("../assets/images/netflix_logo.png")} />
        )}
      </ThumbnailBox>
    </Wrapper>
  );
};

export default SearchThumbnail;
