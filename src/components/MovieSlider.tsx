import styled from "styled-components/native";
import { useQuery } from "@tanstack/react-query";
import { useRef, useEffect } from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import { IGetMoviesResult, getMovies, movieCategories } from "../utils/api";
import Thumbnail from "./Thumbnail";
import { useNavigation } from "@react-navigation/native";
import { MoviePageProps } from "../pages/MoviePage";
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
    key: movieCategories;
    name: string;
  };
  last?: boolean;
}

const MovieSlider = ({ category, last = false }: ISliderProps) => {
  const tabRouteName = useRecoilValue(tabRouteNameAtom);
  const navigation = useNavigation<MoviePageProps["navigation"]>();
  const scrollRef = useRef<ScrollView | null>(null);
  const { data, isLoading } = useQuery<IGetMoviesResult>({
    queryKey: ["movie", category.key],
    queryFn: () => getMovies({ category: category.key }),
    refetchOnWindowFocus: false,
  });

  const goDetailPage = (id: number, title: string, imagePath: string) => {
    navigation.navigate("MovieDetail", {
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
          {data?.results.map((movie) => (
            <Thumbnail
              key={movie.id}
              id={movie.id}
              title={movie.title}
              imagePath={movie.poster_path}
              backdropPath={movie.backdrop_path}
              goDetailPage={goDetailPage}
            />
          ))}
        </ScrollView>
      )}
    </Container>
  );
};

export default MovieSlider;
