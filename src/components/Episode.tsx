import styled from "styled-components/native";
import { makeImagePath } from "../utils/makeImagePath";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

const Wrapper = styled.View`
  margin: 18px 0;
  gap: 8px;
  padding: 0 5px;
`;
const ImageTitleBlock = styled.View`
  flex-direction: row;
`;
const Thumbnail = styled.View`
  width: 140px;
  height: 80px;
  border-radius: 10px;
  overflow: hidden;
  background-color: ${(props) => props.theme.gray.dark};
`;
const ThumbnailImage = styled.Image`
  width: 100%;
  height: 100%;
`;
const TitleBox = styled.View`
  flex: 1;
  justify-content: center;
  gap: 2px;
  padding-left: 7px;
`;
const Title = styled.Text`
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  color: ${(props) => props.theme.gray.light};
`;
const Runtime = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.gray.dark};
`;
const Overview = styled.Text`
  font-size: 15px;
  line-height: 15px;
  color: ${(props) => props.theme.gray.dark};
`;

interface IEpisodeProps {
  episodeNumber: number;
  title: string;
  runtime: number;
  overview: string;
  imagePath: string;
}

const Episode = ({
  episodeNumber,
  title,
  runtime,
  overview,
  imagePath,
}: IEpisodeProps) => {
  const [openOverview, setOpenOverview] = useState(false);

  return (
    <Wrapper>
      <ImageTitleBlock>
        <Thumbnail>
          <ThumbnailImage source={{ uri: makeImagePath(imagePath, "w200") }} />
        </Thumbnail>
        <TitleBox>
          <Title>
            {episodeNumber}. {title}
          </Title>
          <Runtime>{runtime}minutes</Runtime>
        </TitleBox>
      </ImageTitleBlock>
      <TouchableOpacity
        onPress={() => setOpenOverview((prev) => !prev)}
        activeOpacity={0.6}
      >
        <Overview numberOfLines={openOverview ? undefined : 3}>
          {overview}
        </Overview>
      </TouchableOpacity>
    </Wrapper>
  );
};

export default Episode;
