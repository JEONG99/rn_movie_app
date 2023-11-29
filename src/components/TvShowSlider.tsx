import styled from "styled-components/native";
import { useQuery } from "@tanstack/react-query";
import { useRef, useEffect } from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import { IGetTvShowsResult, getTvShows, tvShowCategories } from "../utils/api";
import Thumbnail from "./Thumbnail";
import { useNavigation } from "@react-navigation/native";
import { TvShowPageProps } from "../pages/TvShowPage";
import { useRecoilValue } from "recoil";
import { tabRouteNameAtom } from "../utils/atom";

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
  const tabRouteName = useRecoilValue(tabRouteNameAtom);
  const navigation = useNavigation<TvShowPageProps["navigation"]>();
  const scrollRef = useRef<ScrollView | null>(null);
  const { data, isLoading } = useQuery<IGetTvShowsResult>({
    queryKey: ["tv", category.key],
    queryFn: () => getTvShows({ category: category.key }),
    refetchOnWindowFocus: false,
  });

  const goDetailPage = (id: number, title: string, imagePath: string) => {
    navigation.navigate("Detail", {
      id,
      title,
      imagePath,
    });
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0 });
  }, [tabRouteName]);

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
            <Thumbnail
              key={tv.id}
              id={tv.id}
              title={tv.name}
              imagePath={tv.poster_path}
              backdropPath={tv.backdrop_path}
              goDetailPage={goDetailPage}
            />
          ))}
        </ScrollView>
      )}
    </Container>
  );
};

export default TvShowSlider;
