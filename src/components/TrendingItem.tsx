import {} from "react";
import {} from "react-native";
import styled from "styled-components/native";

const Wrapper = styled.View`
  flex-direction: row;
`;
const Ranking = styled.View`
  flex: 0.12;
  max-width: 45px;
`;
const RankingText = styled.Text`
  color: white;
  font-weight: 800;
  font-size: 26px;
`;
const MainBody = styled.View``;
const Test = styled.Text`
  color: white;
`;

//{id, title, imagePath, homePagePath, overview, genres}

const TrendingItem = () => {
  return (
    <Wrapper>
      <Ranking>
        <RankingText>01</RankingText>
      </Ranking>
      <MainBody>
        <Test>123</Test>
      </MainBody>
    </Wrapper>
  );
};

export default TrendingItem;
