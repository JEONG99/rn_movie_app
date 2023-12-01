import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { makeImagePath } from "../utils/makeImagePath";
import { ISelectSeason } from "../pages/TvShowDetailPage";

const Wrapper = styled.View`
  margin-right: 15px;
`;
const Title = styled.Text`
  width: 115px;
  font-size: 26px;
  font-weight: 600;
  color: white;
`;
const Thumbnail = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 2px;
  width: 100px;
  height: 150px;
  border-radius: 5px;
  overflow: hidden;
  background-color: ${(props) => props.theme.gray.dark};
`;
const ThumbnailImage = styled.Image`
  width: 100%;
  height: 100%;
`;
const SelectBar = styled.View<{ $select: boolean }>`
  margin-left: 2px;
  width: 40px;
  height: 4px;
  border-radius: 3px;
  background-color: ${(props) => (props.$select ? "#e21114" : "black")};
`;
const EmptyLogo = styled.Image`
  width: 42px;
  height: 42px;
`;

interface ITvShowSeasonProps {
  tvShowId: number;
  seasonNumber: number;
  imagePath: string;
  name: string;
  changeSeason: (newSeason: ISelectSeason) => void;
  select: boolean;
}

const TvShowSeason = ({
  tvShowId,
  seasonNumber,
  imagePath,
  name,
  changeSeason,
  select,
}: ITvShowSeasonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => changeSeason({ tvShowId, seasonNumber, name })}
    >
      <Wrapper>
        <SelectBar $select={select} />
        <Title numberOfLines={1}>{name}</Title>
        <Thumbnail>
          {imagePath ? (
            <ThumbnailImage
              source={{ uri: makeImagePath(imagePath, "w200") }}
            />
          ) : (
            <EmptyLogo source={require("../assets/images/netflix_logo.png")} />
          )}
        </Thumbnail>
      </Wrapper>
    </TouchableOpacity>
  );
};

export default TvShowSeason;
