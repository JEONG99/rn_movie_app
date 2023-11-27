import styled from "styled-components/native";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { IGetTvShowsResult, getTvShows, tvShowCategories } from "../utils/api";
import { makeImagePath } from "../utils/makeImagePath";
import { useFocusEffect } from "@react-navigation/native";

const Container = styled.View<{ $last: boolean }>`
  margin-top: 20px;
  margin-bottom: ${(props) => (props.$last ? "50px" : "0px")};
`;
const Header = styled.View`
  margin-bottom: 10px;
`;
const HeaderText = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: white;
`;
const Thumbnail = styled.View`
  margin-right: 8px;
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
`;
const ThumbnailImage = styled.Image`
  width: 110px;
  height: 150px;
`;
const Loader = styled.View`
  justify-content: center;
  height: 150px;
`;

interface ISliderProps {
  category: {
    key: tvShowCategories;
    name: string;
  };
  last?: boolean;
}

const TvShowSlider = ({ category, last = false }: ISliderProps) => {
  const scrollRef = useRef<ScrollView | null>(null);
  const { data, isLoading } = useQuery<IGetTvShowsResult>({
    queryKey: ["tv", category.key],
    queryFn: () => getTvShows({ category: category.key }),
    refetchOnWindowFocus: false,
  });

  useFocusEffect(() => {
    return () => {
      scrollRef.current?.scrollTo({ y: 0 });
    };
  });

  return (
    <Container $last={last}>
      <Header>
        <HeaderText>{category.name}</HeaderText>
      </Header>
      {isLoading ? (
        <Loader>
          <ActivityIndicator size="small" />
        </Loader>
      ) : (
        <ScrollView
          ref={scrollRef}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {data?.results.map((tv) => (
            <TouchableOpacity key={tv.id} activeOpacity={0.6}>
              <Thumbnail>
                <ThumbnailImage
                  source={{ uri: makeImagePath(tv.poster_path, "w200") }}
                />
              </Thumbnail>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </Container>
  );
};

export default TvShowSlider;
